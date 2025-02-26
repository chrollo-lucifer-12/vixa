import Image from "next/image";

interface VideoCardProps {
    videoId : string
    videoTitle : string
    createdAt : string
    videoSource :  string
}

function timeDifference(date1: string | Date, date2: string | Date): string {
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

const VideoCard = ({createdAt, videoId, videoSource, videoTitle} : VideoCardProps) => {
    return <figure className="shrink-0 hover:bg-gray-800 p-3 transition duration-300 border-[#141416]" style={{borderRadius: "0.5rem"}}>
        <div className="overflow-hidden" style={{borderRadius: "0.4rem"}}>
            <Image
                src={videoSource}
                alt={`Photo by ${videoTitle}`}
                className="object-cover"
                width={200}
                height={100}
            />
        </div>
        <figcaption className="pt-2 text-xs text-muted-foreground text-[#6f6f75]">
            <p>{videoTitle}</p>
            <p>{timeDifference(createdAt, new Date().toISOString())}</p>
        </figcaption>
    </figure>
}

export default VideoCard