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

export type FolderProps = {
    id: string,
    name: string | null,
    createdAt: string | null,
    workspaceId: string | null
}

export type VideoProps = {
    videoId: string ,
    videoTitle: string | null ,
    videoCreatedAt: string | null  ,
    videoSource: string ,
    creatorFirstName: string | null ,
    creatorLastName: string | null  ,
    creatorImage: string | null
}[]

export type SingleVideoProps = {
    videos: {         id: string ,
        title: string | null ,
        description: string | null  ,
        source: string ,
        createdAt: string | null ,
        folderId: string | null ,
        userId: string | null   ,
        processing: boolean | null ,
        workspaceId: string | null   ,
        views: number | null ,
        summary: string | null,
    }  ,
    creatorFirstName: string | null
    ,creatorLastName: string | null   ,  creatorImage: string | null
}[]

export type VideoCommentProps =  {     commentTitle: string | null,
    commentCreatedAt: string | null,
    commentCreatorName: string | null,
    commentCreatorImage: string | null }[]

export type InviteProps =  {     workspace: {         id: string ,
        name: string ,
        type: "personal" | "public" | null    ,
        userId: string | null     } ,
    invite: {         id: string   ,
        senderId: string | null  ,
        receiverId: string | null ,
        content: string | null     ,
        workspaceId: string | null
        ,accepted: boolean | null     } }[]

export type FolderWithVideosProps = {     folder: {         id: string,
        name: string | null,
        createdAt: string | null,
        workspaceId: string | null,
    } ,    video: {   id: string   ,      title: string | null ,        creator: string | null ,        folderId: string | null     } }[]