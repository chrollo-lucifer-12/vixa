"use server"

import {currentUser} from "@clerk/nextjs/server";
import db from "../db/index";
import {
    folderTable,
    inviteTable,
    memberTable,
    notificationTable,
    usersTable,
    videoTable,
    workspaceTable
} from "@/db/schema";
import {eq, like, or} from "drizzle-orm";
import {v4} from "uuid"

export const onAuthenticateUser = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return {status : 403}
        }
        const userExists = await db
            .select()
            .from(usersTable)
            .innerJoin(workspaceTable, eq(usersTable.id, workspaceTable.userId))
            .where(eq(usersTable.clerkId, user.id));
        if (userExists.length > 0) {
            return {status: 200, user: userExists[0].users, workspace: userExists[0].workspace}
        }
        const newUser = await db.insert(usersTable).values({id: v4(), clerkId: user.id, email: user.emailAddresses[0].emailAddress, firstName: user.firstName, lastName: user.lastName, image: user.imageUrl}).returning()
        const newWorkspace = await db.insert(workspaceTable).values({id:v4(), userId: newUser[0].id, name: `${newUser[0].firstName}'s Workspace`, type: "personal"}).returning();
        if (newUser && newWorkspace) return {status: 201, user: newUser[0], workspace: newWorkspace[0]};
        return {status: 401, user: null, workspace: null}
    } catch (e) {
        console.log(e);
        return {status: 401, user: null, workspace: null}
    }
}

export const getUserFromClerkId = async (clerkId : string) => {
    const user =  db.query.usersTable.findFirst({where : eq(usersTable.clerkId, clerkId)});
    return user;
}

export const getUserVideos = async (folderId : string) => {
    try {

        const videos = await db.select({videos : videoTable, creatorFirstName : usersTable.firstName, creatorLastName : usersTable.lastName, creatorImage : usersTable.image}).from(videoTable).innerJoin(usersTable, eq(usersTable.id,videoTable.userId)).where(eq(videoTable.folderId,folderId));
        return videos
    } catch (e) {
        console.log(e);
        return []
    }
}

export const getUserWorkspaces = async () => {
    try {
        const user = await currentUser();
        const workspaces = await db.select({workspaceId: workspaceTable.id, workspaceTitle: workspaceTable.name, workspaceType: workspaceTable.type}).from(workspaceTable).innerJoin(usersTable, eq(usersTable.id, workspaceTable.userId)).where(eq(usersTable.clerkId, user!.id));
        if (!workspaces) return [];
        return workspaces
    } catch (e) {
        console.log(e);
        return []
    }
}

export const getUserNotifications = async () => {
    try {
        const user = await currentUser();
        if (!user) return

        const findUser = await db.query.usersTable.findFirst({
            where : eq(usersTable.clerkId,user.id)
        })

        if (!findUser) return;

        const notifications = await db.select({notificationId: notificationTable.id, notificationCreatedAt: notificationTable.createdAt, notificationTitle: notificationTable.title}).from(notificationTable).where(eq(notificationTable.userId, findUser.id));
        return notifications;
    } catch (e) {
        console.log(e);
        return []
    }
}

export const searchMembers = async (query : string) => {
    try {
        const searchResults = await db.select({id : usersTable.id, firstName : usersTable.firstName, lastName : usersTable.lastName, email : usersTable.email, image : usersTable.image}).from(usersTable).where(or(
            like(usersTable.firstName, `%${query}%`),
            like(usersTable.lastName, `%${query}%`),
            like(usersTable.email, `%${query}%`)
        ))
        if (searchResults.length > 0) return searchResults
        return [];
    } catch (e) {
        console.log(e);
        return []
    }
}

export const getFolderInfo  = async (folderId : string) => {
    try {
        const folderInfo = await db.select().from(folderTable).where(eq(folderTable.id, folderId));
        return folderInfo[0];
    } catch (e) {
        console.log(e);
    }
}

export const inviteMember = async (workspaceId : string, receiverId : string) => {
    try {
        const user = await currentUser();
        if (!user) return;
        const findSender = await db.query.usersTable.findFirst({
            where : eq(usersTable.clerkId, user.id)
        })
        if (findSender) {
            const workspace = await db.query.workspaceTable.findFirst({
                where: eq(workspaceTable.id, workspaceId)
            })
            if (workspace) {
                await db.insert(inviteTable).values({
                    id : v4(),
                    senderId : findSender.id,
                    receiverId,
                    workspaceId,
                    content: `You are invited to join ${workspace.name} by ${findSender.firstName}`,
                    accepted: false
                })
            }
        }
    } catch (e) {
        console.log(e);
    }
}