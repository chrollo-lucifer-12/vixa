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
import {and, eq, like, or} from "drizzle-orm";
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
        const user = await currentUser();
        if (!user) return [];
        const videos = await db.select({videoId : videoTable.id, videoTitle : videoTable.title, videoCreatedAt : videoTable.createdAt, videoSource  : videoTable.source, creatorFirstName : usersTable.firstName, creatorLastName : usersTable.lastName, creatorImage : usersTable.image}).from(videoTable).innerJoin(usersTable,eq(videoTable.userId,usersTable.id)).where(eq(videoTable.folderId,folderId))
        return videos;
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

export const videoNotification = async (videoId : string, title : string) => {
    try {



        const video = await db.query.videoTable.findFirst({where : eq(videoTable.id, videoId)});
        const creator = await db.query.usersTable.findFirst({where : eq(usersTable.id, video!.userId!)});

        const notif = await db.query.notificationTable.findFirst({where : eq(notificationTable.userId, creator!.id)});
        if (notif) return;

        await db.insert(notificationTable).values({
            id : v4(),
            userId : creator!.id,
            title,
            createdAt: new Date().toISOString()
        })
    } catch (e) {
        console.log(e);
    }
}

export const getUserInvites = async () => {
    try {
        const user = await currentUser();
        if (!user) return [];
        const findUser = await db.query.usersTable.findFirst({where : eq(usersTable.clerkId,user.id)})
        if (!findUser) return [];

        const invites = await db.select().from(inviteTable).innerJoin(workspaceTable, eq(inviteTable.workspaceId, workspaceTable.id)).where(and(eq(inviteTable.receiverId, findUser.id), eq(inviteTable.accepted, false)));
        return invites;
    } catch (e) {
        console.log(e);
        return []
    }
}

export const updateInvite = async (inviteId : string) => {
    try {
        const invite = await db.query.inviteTable.findFirst({where : eq(inviteTable.id, inviteId)});
        if (!invite) return;
        await db.update(inviteTable).set({accepted : true}).where(eq(inviteTable.id, inviteId))
        await db.insert(memberTable).values({
            id: v4(),
            createdAt: new Date().toISOString(),
            userId: invite.receiverId,
            workspaceId: invite.workspaceId,
        })
    } catch (e) {
        console.log(e);
    }
}