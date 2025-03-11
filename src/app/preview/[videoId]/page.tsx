import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getPreviewVideo, getWorkspaceFolders} from "@/actions/workspace";
import VideoPreview from "@/components/global/videos/video-preview";
import {currentUser} from "@clerk/nextjs/server";
import {getUserFromClerkId, getUserWorkspaces, videoNotification} from "@/actions/user";

interface VideoPageProps {
    params : {videoId : string}
}

const VideoPage = async ({params} : VideoPageProps) => {
    const {videoId} = await params;

    await videoNotification(videoId, "Someone watched your video")

    const query = new QueryClient();

    const user = await currentUser();

    const getUser = await getUserFromClerkId(user?.id!);

    const workspaces = await getUserWorkspaces();

    await query.prefetchQuery({
        queryKey: ["preview-video"],
        queryFn: () => getPreviewVideo(videoId)
    })

    await query.prefetchQuery({
        queryKey: ["workspace-folders"],
        queryFn: () => getWorkspaceFolders(workspaces[0].workspaceId)
    })

    return <HydrationBoundary state={dehydrate(query)}>
        <VideoPreview videoId={videoId} userId = {getUser!.id} workspaceId = {workspaces[0].workspaceId} />
    </HydrationBoundary>
}

export default VideoPage