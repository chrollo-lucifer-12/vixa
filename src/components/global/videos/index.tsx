"use client"
import {useQueryData} from "@/hooks/useQueryData";
import {getUserVideos} from "@/actions/user";
import {VideoProps} from "@/types/index.type";
import {Video} from "lucide-react";
import VideoCard from "@/components/global/videos/video-card";

interface VideosProps {
    workspaceId : string
    folderId : string
    videosKey : string
}

const Videos = ({folderId, videosKey, workspaceId} : VideosProps) => {

    const {data} = useQueryData([videosKey], () => getUserVideos(folderId))

    const allVideos = data as VideoProps


    return <div className="mt-2">
        <div className="flex gap-x-3">
            <Video className="text-white"/>
            <p className="text-white">Videos</p>
        </div>
        <div className="flex mt-4">
            {
                allVideos.map((video, i) => (
                    <VideoCard key={i} videoId={video.videos.id} videoTitle={video.videos.title || "No Title"} createdAt={video.videos.createdAt!} videoSource={video.videos.source} creatorFirstName={video.creatorFirstName}
                               creatorLastName={video.creatorLastName} creatorImage={video.creatorImage}/>
                ))
            }
        </div>
    </div>
}

export default Videos