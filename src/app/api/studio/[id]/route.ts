import {NextRequest, NextResponse} from "next/server";
import db from "@/db";
import {mediaTable} from "@/db/schema";
import {eq} from "drizzle-orm";

export async function POST (req: NextRequest, {params} : {params : {id : string}}) {
    console.log("called")
    const {id} = await params;

    const body = await req.json();

    const studio = await db.update(mediaTable).set({screen: body.screen, preset: "sd", mic : body.mic}).where(eq(mediaTable.id, id));

    if (studio) {
        return NextResponse.json({status : 200, message : "Studio updated"})
    }

    return NextResponse.json({
        status : 400,
        message : "Oops something went wrong"
    })
}