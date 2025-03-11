"use client"
import {useQueryData} from "@/hooks/useQueryData";
import {getPreviewVideo} from "@/actions/workspace";
import {VideoProps} from "@/types/index.type";
import {timeDifference} from "@/components/global/videos/video-card";
import CopyLink from "@/components/global/videos/copy-link";
import EditVideo from "@/components/global/edit-video";


interface VideoPreviewProps {
    videoId : string
    userId : string
    workspaceId : string
}

const VideoPreview = ({videoId, userId, workspaceId} : VideoPreviewProps) => {

    // wip : notification : video, complete this

    const { data} = useQueryData(["preview-video"], () => getPreviewVideo(videoId));

    const video = data as VideoProps

    return <div className="grid grid-cols-1 xl:grid-cols-2 p-10 lg:px-20 lg:py-10 overflow-y-auto gap-5">
        <div className="flex flex-col lg:col-span-2 gap-y-10">
            <div >
                <div className="flex gap-x-5 items-start justify-between">
                    <h2 className="text-white text-4xl font-bold">
                        {video[0].videos.title || "No Title"}
                    </h2>
                </div>
                <span className="flex gap-x-3 mt-2 items-center">
                    <p className="text-[#9d9d9d] capitalize">
                        {video[0].creatorFirstName} {video[0].creatorLastName}
                    </p>
                    <p className="text-[#9d9d9d]">
                        {timeDifference(new Date(), video[0].videos.createdAt!)}
                    </p>
                    {
                        video[0].videos.userId === userId &&  <EditVideo workspaceId={workspaceId} videoId={videoId} videoTitle={video[0].videos.title!} videoDesc={video[0].videos.description!} videoSummary={video[0].videos.summary!} />
                    }
                </span>

            </div>
            <video preload="metadata" className="w-full aspect-video opacity-50 rounded-xl" controls>
                <source src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video[0].videos.source}#1`} />
            </video>
            <div className="flex flex-col text-2xl gap-y-4">
                <div className="flex gap-x-5 items-center justify-between">
                    <p className="text-[#bdbdbd] font-semibold">Description</p>
                </div>
                <p className="text-[#9d9d9d] text-lg font-medium">
                    {video[0].videos.description || "No Description"}
                </p>
            </div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-y-16">
            <div className="flex justify-end gap-x-3">
                <CopyLink videoId={video[0].videos.id}/>
            </div>
        </div>
    </div>
}

export default VideoPreview