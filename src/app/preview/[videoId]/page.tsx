import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getPreviewVideo, getVideoWorkspace, getWorkspaceFolders} from "@/actions/workspace";
import VideoPreview from "@/components/global/videos/video-preview";
import {currentUser} from "@clerk/nextjs/server";
import {getUserFromClerkId, getUserWorkspaces, hasPermissionToEdit, videoNotification} from "@/actions/user";
import {getVideoComments} from "@/actions/video";

interface VideoPageProps {
    params : {videoId : string}
}

const VideoPage = async ({params} : VideoPageProps) => {
    const {videoId} = await params;

    await videoNotification(videoId, "Someone watched your video")

    const query = new QueryClient();

    const user = await currentUser();

    const getUser = await getUserFromClerkId(user?.id!);

    const workspace = await getVideoWorkspace(videoId);

    const permission = await hasPermissionToEdit(videoId);

    await query.prefetchQuery({
        queryKey: ["preview-video"],
        queryFn: () => getPreviewVideo(videoId)
    })

    await query.prefetchQuery({
        queryKey: ["workspace-folders"],
        queryFn: () => getWorkspaceFolders(workspace!.id)
    })

    await query.prefetchQuery({
        queryKey : ["video-comments"],
        queryFn : () => getVideoComments(videoId)
    })

    return <HydrationBoundary state={dehydrate(query)}>
        <VideoPreview videoId={videoId} userId = {getUser!.id} workspaceId = {workspace!.id} permission={permission} />
    </HydrationBoundary>
}

export default VideoPage