// tables

import { integer, pgTable, text, date, boolean, pgEnum } from "drizzle-orm/pg-core";
import { relations} from "drizzle-orm";



export const usersTable = pgTable("users", {
    id: integer("id").primaryKey().notNull(),
    email: text("email").notNull(),
    firstName: text("first_name"),
    lastName : text("last_name"),
    createdAt : date("created_at").defaultNow(),
    clerkId: text("clerk_id").notNull().unique(),
    image: text("image"),
});

export const mediaEnum = pgEnum("preset", ["hd", "sd"])

export const mediaTable = pgTable("media", {
    id: integer("id").primaryKey().notNull(),
    userId: integer("user_id").references(() => usersTable.id),
    screen: text(),
    mic: text("mic"),
    camera: text("camera"),
    preset: mediaEnum("preset").default("sd")
})

export const workspaceEnum = pgEnum("type", ["personal", "public"])

export const workspaceTable = pgTable("workspace", {
    id: integer("id").primaryKey().notNull(),
    name: text("name").notNull(),
    type: workspaceEnum("type"),
    userId: integer("user_id").references(() => usersTable.id, {onDelete: "cascade"})
})

export const folderTable = pgTable("folder", {
    id: integer().primaryKey().notNull(),
    name: text().default("Untitled Folder"),
    createdAt: date(),
    workspaceId: integer("workspace_id").references(() => workspaceTable.id, {onDelete: "cascade"}),
})

export const videoTable = pgTable("video", {
    id: integer("id").primaryKey().notNull(),
    title: text(),
    description: text(),
    source: text().notNull(),
    createdAt: date(),
    folderId: integer("folder_id").references(() => folderTable.id, {onDelete : "cascade"}),
    userId: integer("user_id").references(() => usersTable.id),
    processing: boolean("processing"),
    workspaceId: integer("workspace_id").references(() => workspaceTable.id, {onDelete: "cascade"}),
    views: integer("views"),
    summary: text()
})

export const memberTable = pgTable("member", {
    id: integer("id").primaryKey().notNull(),
    userId: integer("user_id").references(() => usersTable.id),
    createdAt: date(),
    workspaceId: integer("workspace_id").references(() => workspaceTable.id, {onDelete: "cascade"})
})

export const notificationTable = pgTable("notification", {
    id: integer("id").primaryKey().notNull(),
    userId: integer("user_id").references(() => usersTable.id),
    createdAt: date(),
    title: text()
})

export const inviteTable = pgTable("invite", {
    id: integer("id").primaryKey().notNull(),
    senderId : integer("sender_id").references(() => usersTable.id),
    receiverId: integer("receiver_id").references(() => usersTable.id),
    content: text(),
    workspaceId: integer("workspace_id").references(() => workspaceTable.id, {onDelete: "cascade"}),
    accepted: boolean()
})

export const userRelations = relations(usersTable, ({one,many}) => ({
    media: one(mediaTable, {fields: [usersTable.id], references: [mediaTable.userId]}),
    workspaces: many(workspaceTable),
    videos: many(videoTable),
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
    folder: one(folderTable, {fields: [videoTable.folderId], references: [folderTable.id]})
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
