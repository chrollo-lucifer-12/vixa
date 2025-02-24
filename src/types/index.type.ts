export type WorkspaceProps = {
    workspaceId: string,
    workspaceTitle: string,
    workspaceType: "personal" | "public" | null,
}[]

export type NotificationProps = {
    notificationId: string,
    notificationCreatedAt: string | null,
    notificationTitle: string | null
}[]