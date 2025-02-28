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

    const videos = data as VideoProps

    return <div className="mt-2">
        <div className="flex gap-x-3">
            <Video className="text-white"/>
            <p className="text-white">Videos</p>
        </div>
        <div className="flex mt-4">
            <VideoCard videoId="dasdasda" videoTitle="sahil" createdAt="2025-01-01" videoSource="/vixa-logo.png" creatorFirstName="sahil" creatorLastName="singh" creatorImage="/vixa-logo.png" />
        </div>
    </div>
}

export default Videos