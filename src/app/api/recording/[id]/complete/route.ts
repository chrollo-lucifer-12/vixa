import {NextRequest, NextResponse} from "next/server";
import {currentUser} from "@clerk/nextjs/server";
import db from "@/db";
import {usersTable, videoTable} from "@/db/schema";
import {eq} from "drizzle-orm";

export async function POST(req : NextRequest, {params} : {params : {id : string}}) {
    try {
        const body = await req.json();
        const {id} = await params

        const completeProcessing = await db.update(videoTable).set({processing: false,}).where(eq(videoTable.id,id)).returning();

        return NextResponse.json({status: 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({status: 400});
    }
}