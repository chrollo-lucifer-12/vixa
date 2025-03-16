import {NextRequest, NextResponse} from "next/server";
import db from "@/db";
import {folderTable, mediaTable, usersTable, videoTable, workspaceTable} from "@/db/schema";
import {and, eq} from "drizzle-orm";
import {v4} from "uuid"
import {currentUser} from "@clerk/nextjs/server";

export async function POST(req : NextRequest, {params } : {params : {id : string}}) {
    try {
        const body = await req.json();
        const {id} = await params

        const findMedia = await db.query.mediaTable.findFirst({where: eq(mediaTable.id,id)});

        const findUser = await db.query.usersTable.findFirst({where : eq(usersTable.id, findMedia!.userId!)});

        console.log("user", findUser);

        if (!findUser) {
            return NextResponse.json({status : 400});
        }

        const findWorkspace = await db.query.workspaceTable.findFirst({where : eq(workspaceTable.userId, findUser.id)});

        console.log( "workspace",findWorkspace);

        let findFolder = await db.select().from(folderTable).where(and(eq(folderTable.name, "Unedited Videos"), eq(folderTable.workspaceId, findWorkspace!.id)));

        if (!findFolder || !findFolder.length) {
            findFolder = await db.insert(folderTable).values({workspaceId: findWorkspace!.id, createdAt: new Date().toISOString(), id: v4(), name: "Unedited Videos"}).returning();
        }

        console.log(findFolder);

        const startProcessingVideo = await db.insert(videoTable).values({
            id: v4(),
            source: body.filename,
            processing: true,
            workspaceId: findWorkspace!.id,
            createdAt: new Date().toISOString(),
            userId: findUser.id,
            folderId: findFolder[0].id,
            views: 0,
            summary: "",
            title: "",
            description: "",
        }).returning();

        if (startProcessingVideo.length) {
            return NextResponse.json({
                status : 200,
                videoId : startProcessingVideo[0].id
            })
        }
        return NextResponse.json({status : 400})
    } catch (e) {
        console.log(e);
        return NextResponse.json({status : 400});
    }
}