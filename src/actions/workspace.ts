"use server"

import {currentUser} from "@clerk/nextjs/server";
import db from "@/db";
import {folderTable, memberTable, usersTable, videoTable, workspaceTable} from "@/db/schema";
import {and, eq, or, sql} from "drizzle-orm";
import {v4} from "uuid"

export const verifyAccessToWorkspace = async (workspaceId : string) => {
    try {
        const user = await currentUser();
        if (!user) {
            return {status: 403, data: null}
        }
        const isUserInWorkspace = await db.select({id: workspaceTable.id, workspaceName: workspaceTable.name, workspaceType : workspaceTable.type}).from(usersTable).leftJoin(workspaceTable, eq(usersTable.id, workspaceTable.userId)).leftJoin(memberTable, eq(usersTable.id, memberTable.userId)).where(and(eq(usersTable.clerkId, user.id), or(eq(workspaceTable.id, workspaceId), eq(memberTable.workspaceId, workspaceId))));
        if (isUserInWorkspace.length && isUserInWorkspace[0].id) {
            return {status: 200, data: {workspace: isUserInWorkspace}};
        }
    } catch (e) {
        console.log(e);
        return {status: 400, data: null};
    }
}

export const getWorkspaceFolders = async (workspaceId : string) => {
    try {
        const folders = await db
            .select({
                folder: folderTable,
                videoCount: sql<number>`(
      SELECT COUNT(*) FROM ${videoTable} 
      WHERE ${videoTable.folderId} = ${folderTable.id}
    )`.as("videoCount"),
            })
            .from(folderTable)
            .where(eq(folderTable.workspaceId, workspaceId));

        return folders;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export const CreateWorkspace = async (name : string) => {
    try {
        const user = await currentUser();
        if (!user) {
            return {status : 404};
        }
        const authorizedUser = await db.select().from(usersTable).where(eq(usersTable.clerkId, user.id));
        const workspace = await db.insert(workspaceTable).values({
            userId: authorizedUser[0].id,
            type: "personal",
            name,
            id: v4()
        }).returning();
        if (workspace && workspace.length) return {status: 201}
    } catch (e) {
        console.log(e);
        return {status: 400}
    }
}

export const renameFolders = async (folderId : string, name :string) => {
    try {
        const updatedFolder = await db.update(folderTable).set({name: name}).where(eq(folderTable.id, folderId));
        return {status : 200}
    } catch (e) {
        console.log(e);
        return {status : 401}
    }
}

export const createFolder = async (workspaceId : string) => {
    try {
          await db.insert(folderTable).values({
             id: v4(),
             name:  "Untitled",
             workspaceId: workspaceId,
             createdAt: new Date().toISOString()
         })
         return {status : 200}
    } catch (e) {
        console.log(e);
        return {status : 20}
    }
}

export const getPreviewVideo = async (videoId : string) => {
    try {
        const user = await currentUser();
        if (!user) return;
        const video = await db.select({videos : videoTable, creatorFirstName : usersTable.firstName, creatorLastName : usersTable.lastName, creatorImage : usersTable.image}).from(videoTable).innerJoin(usersTable,eq(usersTable.id, videoTable.userId)).where(eq(videoTable.id,videoId));
        return video
    } catch (e) {
        console.log(e);
    }
}

export const editVideo = async (videoId : string, folderId ?: string, title ?: string, description ?: string, summary ?: string) => {
    try {
        const updateFields: Record<string, string> = {};

        if (folderId) updateFields.folderId = folderId;
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (summary) updateFields.summary = summary;

        // If there are no fields to update, exit early
        if (Object.keys(updateFields).length === 0) {
            console.log("No fields provided for update.");
            return;
        }

        // Perform the update
        await db.update(videoTable).set(updateFields).where(eq(videoTable.id, videoId));
    } catch (e) {
        console.log(e);
    }
}