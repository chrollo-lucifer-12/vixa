// tables

import { integer, pgTable, text, date, boolean, pgEnum, uuid } from "drizzle-orm/pg-core";
import { relations} from "drizzle-orm";



export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    email: text("email").notNull(),
    firstName: text("first_name"),
    lastName : text("last_name"),
    createdAt : date("created_at").defaultNow(),
    clerkId: text("clerk_id").notNull().unique(),
    image: text("image"),
});

export const mediaEnum = pgEnum("preset", ["hd", "sd"])

export const mediaTable = pgTable("media", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: uuid("user_id").references(() => usersTable.id),
    screen: text("screen"),
    mic: text("mic"),
    camera: text("camera"),
    preset: mediaEnum("preset").default("sd")
})

export const workspaceEnum = pgEnum("type", ["personal", "public"])

export const workspaceTable = pgTable("workspace", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    name: text("name").notNull(),
    type: workspaceEnum("type"),
    userId: uuid("user_id").references(() => usersTable.id, {onDelete: "cascade"})
})

export const folderTable = pgTable("folder", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    name: text("name").default("Untitled Folder"),
    createdAt: date("created_at"),
    workspaceId: uuid("workspace_id").references(() => workspaceTable.id, {onDelete: "cascade"}),
})

export const videoTable = pgTable("video", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    title: text("title"),
    description: text("description"),
    source: text("source").notNull(),
    createdAt: date("created_at"),
    folderId: uuid("folder_id").references(() => folderTable.id, {onDelete : "cascade"}),
    userId: uuid("user_id").references(() => usersTable.id),
    processing: boolean("processing"),
    workspaceId: uuid("workspace_id").references(() => workspaceTable.id, {onDelete: "cascade"}),
    views: integer("views"),
    summary: text("summary")
})

export const commentTable = pgTable("comment", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    title: text("title"),
    userId: uuid("user_id").references(() => usersTable.id),
    videoId : uuid("video_id").references(() => videoTable.id),
    createdAt: date("created_at"),
})

export const memberTable = pgTable("member", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: uuid("user_id").references(() => usersTable.id),
    createdAt: date("created_at").defaultNow(),
    workspaceId: uuid("workspace_id").references(() => workspaceTable.id, {onDelete: "cascade"})
})

export const notificationTable = pgTable("notification", {
    id: uuid("id").primaryKey().notNull(),
    userId: uuid("user_id").references(() => usersTable.id),
    createdAt: date("created_at").defaultNow(),
    title: text()
})

export const inviteTable = pgTable("invite", {
    id: uuid("id").primaryKey().notNull(),
    senderId : uuid("sender_id").references(() => usersTable.id),
    receiverId: uuid("receiver_id").references(() => usersTable.id),
    content: text("content"),
    workspaceId: uuid("workspace_id").references(() => workspaceTable.id, {onDelete: "cascade"}),
    accepted: boolean("accepted")
})

export const userRelations = relations(usersTable, ({one,many}) => ({
    media: one(mediaTable, {fields: [usersTable.id], references: [mediaTable.userId]}),
    workspaces: many(workspaceTable),
    videos: many(videoTable),
    comments : many(commentTable),
    members: many(memberTable),
    notifications: many(notificationTable),
    inviteSent: one(inviteTable, {fields: [usersTable.id], references: [inviteTable.senderId]}),
    inviteReceived: one(inviteTable, {fields: [usersTable.id], references: [inviteTable.receiverId]})
}))

export const mediaRelations = relations(mediaTable, ({one}) => ({
    user: one(usersTable, {fields: [mediaTable.userId], references: [usersTable.id]})
}))

export const workspaceRelations = relations(workspaceTable, ({one, many}) => ({
    user: one(usersTable, {fields: [workspaceTable.userId], references: [usersTable.id]}),
    folders: many(folderTable),
    videos: many(videoTable),
    invites: many(inviteTable),
    members: many(memberTable)
}))

export const folderRelations = relations(folderTable, ({one,many}) => ({
    workspace: one(workspaceTable, {fields: [folderTable.workspaceId], references: [workspaceTable.id]}),
    videos: many(videoTable)
}))

export const videoRelations = relations(videoTable, ({one, many}) => ({
    user: one(usersTable, {fields: [videoTable.userId], references: [usersTable.id]}),
    workspace: one(workspaceTable, {fields: [videoTable.workspaceId], references: [workspaceTable.id]}),
    folder: one(folderTable, {fields: [videoTable.folderId], references: [folderTable.id]}),
    videos : many(commentTable)
}))

export const commentRelations = relations(commentTable, ({one}) => ({
    user : one(usersTable, {fields : [commentTable.userId], references : [usersTable.id]}),
    video : one(videoTable, {fields : [commentTable.videoId], references : [videoTable.id]})
}))

export const memberRelations = relations(memberTable, ({many, one}) => ({
    user: one(usersTable, {fields: [memberTable.userId], references: [usersTable.id]}),
    workspace: one(workspaceTable, {fields: [memberTable.workspaceId], references: [workspaceTable.id]})
}))

export const notificationRelations = relations(notificationTable, ({one}) => ({
    user: one(usersTable, {fields: [notificationTable.userId], references: [usersTable.id]})
}))

export const inviteRelations = relations(inviteTable, ({one}) => ({
    sender: one(usersTable, {fields: [inviteTable.senderId], references: [usersTable.id]}),
    receiver: one(usersTable , {fields: [inviteTable.receiverId], references: [usersTable.id]}),
    workspace: one(workspaceTable, {fields: [inviteTable.workspaceId], references: [workspaceTable.id]})
}))
