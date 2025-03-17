import {NextRequest, NextResponse} from "next/server";
import db from "@/db";
import {mediaTable, usersTable} from "@/db/schema";
import {eq} from "drizzle-orm";
import {v4} from "uuid";

export async function GET(req : NextRequest , {params} : {params : {id : string}}) {

    const {id} = await params
    try {
    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.clerkId, id)
    })
    const media = await db.query.mediaTable.findFirst({
        where: eq(mediaTable.userId, user!.id)
    })
    if (media) {

        return NextResponse.json({status : 200, media})
    }
    const createMedia = await db.insert(mediaTable).values({
        userId: user!.id,
        id: v4(),
        camera: "",
        mic: "",
        preset: "sd",
        screen: ""
    }).returning()

    return NextResponse.json({status : 201, media : createMedia})
    } catch (e) {
        console.log(e);
        return NextResponse.json({status : 400})
    }

}