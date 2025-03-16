import {Button} from "@/components/ui/button";
import {MoveRight, Play} from "lucide-react";

const RecordScreen = () => {
    return <div className="mt-20 flex flex-col ml-5">
        <p className={"text-white text-5xl font-semibold"}>Record your screen in seconds</p>
        <p className={"text-gray-300"}>Create, share, and collaborate with easy screen recordings. Communicate more
            effectively with video messages that save time.</p>
        <div className={"mt-4 space-x-2"}>
            <Button className={"bg-white text-black"} style={{borderRadius: "0.3rem"}}>Get Started
                Free <MoveRight/></Button>
            <Button className={"border border-[#1c1b1e]"} style={{borderRadius: "0.3rem"}}><Play/> See how it
                works</Button>
        </div>
        <p className={"mt-1 text-muted text-xs"}>No credit card required. Free plan includes 25 videos.</p>
        <div className="flex items-center justify-center mt-10">
            <div
                className="relative w-full max-w-[500px] overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                <div className="flex items-center justify-between border-b bg-secondary px-4 py-2">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"/>
                        <div className="h-2 w-2 rounded-full bg-yellow-500"/>
                        <div className="h-2 w-2 rounded-full bg-green-500"/>
                    </div>
                    <div className="text-xs font-medium">screencast.com</div>
                    <div className="w-12"/>
                </div>
                <div className="relative aspect-video overflow-hidden bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="icon" className="h-16 w-16 rounded-full">
                            <Play className="h-8 w-8"/>
                            <span className="sr-only">Play video</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default RecordScreen