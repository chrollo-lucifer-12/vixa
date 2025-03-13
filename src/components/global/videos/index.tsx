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

    const {data} = useQueryData(["folder-videos"], () => getUserVideos(folderId))
    console.log(data);
    const allVideos = data as VideoProps
    //console.log( "all videos", allVideos);

    return <div className="mt-2">
        <div className="flex gap-x-3">
            <Video className="text-white"/>
            <p className="text-white">Videos</p>
        </div>
        <div className="flex mt-4">
            {
                allVideos.map((video, i) => (
                    <VideoCard key={i} videoId={video.videoId} videoTitle={video.videoTitle || "No Title"} createdAt={video.videoCreatedAt!} videoSource={video.videoSource} creatorFirstName={video.creatorFirstName}
                               creatorLastName={video.creatorLastName} creatorImage={video.creatorImage}/>
                ))
            }
        </div>
    </div>
}

export default Videos