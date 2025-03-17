"use client"
import {useQueryData} from "@/hooks/useQueryData";
import {getUserVideos} from "@/actions/user";
import {VideoProps} from "@/types/index.type";
import {Video} from "lucide-react";
import VideoCard from "@/components/global/videos/video-card";
import {Skeleton} from "@/components/ui/skeleton";

interface VideosProps {
    workspaceId : string
    folderId : string
    videosKey : string
}

const Videos = ({folderId, videosKey, workspaceId} : VideosProps) => {

    const {data, isPending} = useQueryData(["folder-videos"], () => getUserVideos(folderId))

    const allVideos = data as VideoProps
    //console.log( "all videos", allVideos);

    return <div className="mt-2">
        <div className="flex gap-x-3">
            <Video className="text-white"/>
            <p className="text-white">Videos</p>
        </div>
        <div className="flex mt-4 space-x-4">
            {
                allVideos.length ? allVideos.map((video, i) => (
                    isPending ? <Skeleton key={i} className={"w-[250px] h-[250px]"} /> :
                    <VideoCard key={i} videoId={video.videoId} videoTitle={video.videoTitle || "No Title"} createdAt={video.videoCreatedAt!} videoSource={video.videoSource} creatorFirstName={video.creatorFirstName}
                               creatorLastName={video.creatorLastName} creatorImage={video.creatorImage}/>
                )) : (<p>No Videos in this folder.</p>)
            }
        </div>
    </div>
}

export default Videos