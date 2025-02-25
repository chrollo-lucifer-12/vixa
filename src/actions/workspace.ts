"use server"

import {currentUser} from "@clerk/nextjs/server";
import db from "@/db";
import {folderTable, memberTable, usersTable, workspaceTable} from "@/db/schema";
import {and, eq, or} from "drizzle-orm";
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
        const folders = await db.select().from(folderTable).where(eq(folderTable.workspaceId, workspaceId));
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