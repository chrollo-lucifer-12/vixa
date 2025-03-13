"use client"
import Image from "next/image";
import CopyLink from "@/components/global/videos/copy-link";
import {useRef} from "react";
import {useRouter} from "next/navigation";

interface VideoCardProps {
    videoId : string
    videoTitle : string
    createdAt : string
    videoSource :  string
    creatorFirstName: string | null
    creatorLastName: string | null
    creatorImage: string | null
}

export function timeDifference(date1: string | Date, date2: string | Date): string {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        throw new Error("Invalid date format");
    }

    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays >= 1) {
        return `${Math.floor(diffDays)} day(s) ago`;
    } else {
        const diffHours = diffTime / (1000 * 60 * 60);
        return `${Math.floor(diffHours)} hour(s) ago`;
    }
}


const VideoCard = ({createdAt, videoId, videoSource, videoTitle, creatorFirstName, creatorLastName, creatorImage} : VideoCardProps) => {

    const router=  useRouter();

    return <div className="w-[250px] flex flex-col bg-[#272729]" style={{borderRadius: "0.5rem"}} onClick={() => {
        router.push(`/preview/${videoId}`);
    }}>
        <video controls={false} preload="metadata" style={{borderRadius: "0.5rem"}}>
            <source src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${videoSource}#t=1`}/>
        </video>
        <div className="flex flex-col gap-y-2 p-3">
            <div className="flex justify-between items-center">
                <span>{videoTitle}</span>
                <CopyLink videoId={videoId}/>
            </div>
            <div className="flex items-center gap-x-3">
                <Image src={creatorImage!} alt="" width={30} height={30} className="rounded-full"/>
                <span className="text-muted-foreground">{creatorFirstName} {creatorLastName}</span>
            </div>
            {/*<span className="text-xs">{timeDifference(createdAt, new Date().toISOString())}</span>*/}
        </div>
    </div>
}

export default VideoCard