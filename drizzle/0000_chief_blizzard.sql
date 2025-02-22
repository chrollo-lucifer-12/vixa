CREATE TYPE "public"."preset" AS ENUM('hd', 'sd');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('personal', 'public');--> statement-breakpoint
CREATE TABLE "folder" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text DEFAULT 'Untitled Folder',
	"createdAt" date,
	"workspace_id" integer
);
--> statement-breakpoint
CREATE TABLE "invite" (
	"id" integer PRIMARY KEY NOT NULL,
	"sender_id" integer,
	"receiver_id" integer,
	"content" text,
	"workspace_id" integer,
	"accepted" boolean
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" integer,
	"screen" text,
	"mic" text,
	"camera" text,
	"preset" "preset" DEFAULT 'sd'
);
--> statement-breakpoint
CREATE TABLE "member" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" integer,
	"createdAt" date,
	"workspace_id" integer
);
--> statement-breakpoint
CREATE TABLE "notification" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" integer,
	"createdAt" date,
	"title" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"created_at" date DEFAULT now(),
	"clerk_id" text NOT NULL,
	"image" text,
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id")
);
--> statement-breakpoint
CREATE TABLE "video" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"source" text NOT NULL,
	"createdAt" date,
	"folder_id" integer,
	"user_id" integer,
	"processing" boolean,
	"workspace_id" integer,
	"views" integer,
	"summary" text
);
--> statement-breakpoint
CREATE TABLE "workspace" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" "type",
	"user_id" integer
);
--> statement-breakpoint
ALTER TABLE "folder" ADD CONSTRAINT "folder_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invite" ADD CONSTRAINT "invite_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invite" ADD CONSTRAINT "invite_receiver_id_users_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invite" ADD CONSTRAINT "invite_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_folder_id_folder_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."folder"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;