import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getPreviewVideo} from "@/actions/workspace";
import VideoPreview from "@/components/global/videos/video-preview";

interface VideoPageProps {
    params : {videoId : string}
}

const VideoPage = async ({params} : VideoPageProps) => {
    const {videoId} = await params;

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey: ["preview-video"],
        queryFn: () => getPreviewVideo(videoId)
    })

    return <HydrationBoundary state={dehydrate(query)}>
        <VideoPreview videoId={videoId} />
    </HydrationBoundary>
}

export default VideoPage