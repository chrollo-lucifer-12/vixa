"use server"


import db from "@/db";
import {eq} from "drizzle-orm";
import {commentTable, usersTable} from "@/db/schema";
import {v4} from "uuid";
import {currentUser} from "@clerk/nextjs/server";

export const getVideoComments = async (videoId : string) => {
    try {
        const commnets = await db.select({commentTitle : commentTable.title, commentCreatedAt : commentTable.createdAt, commentCreatorName : usersTable.firstName, commentCreatorImage : usersTable.image}).from(commentTable).innerJoin(usersTable, eq(commentTable.userId, usersTable.id));
        return commnets;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export const addComment = async (videoId : string, comment : string) => {
    try {

        const user = await currentUser();
        if (!user) return;
        const findUser = await db.query.usersTable.findFirst({where : eq(usersTable.clerkId, user.id)});

        await db.insert(commentTable).values({
            id : v4(),
            createdAt: new Date().toISOString(),
            title: comment,
            userId: findUser!.id,
            videoId
        })
    } catch (e) {
        console.log(e.errors);
    }
}