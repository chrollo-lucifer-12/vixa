"use client";

import { useQueryData } from "@/hooks/useQueryData";
import {addComment, getVideoComments} from "@/actions/video";
import { useState } from "react";
import {Input} from "@/components/ui/input";
import {VideoCommentProps} from "@/types/index.type";
import {useMutationData, useMutationDataState} from "@/hooks/useMutationData";
import { Skeleton } from "@/components/ui/skeleton"
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import CommentCard from "@/components/global/comments/comment-card";
import {Separator} from "@/components/ui/separator";


interface CommentsProps {
    videoId: string;
}

const Comments = ({ videoId }: CommentsProps) => {

    const { data, isFetching } = useQueryData(["video-comments"], () => getVideoComments(videoId));
    const {mutate, isPending} = useMutationData(["update-comments"], async (data: {comment : string}) => {await addComment(videoId, data.comment)}, "video-comments")
    const {latestVariables} = useMutationDataState(["update-comments"])
    const comments = data as VideoCommentProps
    const [commentInput, setCommentInput] = useState("")

    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!dragging) return;
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleAddComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && commentInput.trim()) {
            mutate({comment : commentInput});
            setCommentInput("");
        }
    }


    return (
        <div
            className="w-[450px] h-[300px] bg-[#272729] absolute flex flex-col"
            style={{ left: `${position.x}px`, top: `${position.y}px`, borderRadius : "0.3rem" }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseDown={handleMouseDown}
        >
            <div className="h-[80%] text-white p-3" style={{borderRadius : "0.3rem"}}>
                {
                    !comments.length ? (<p>Be the first to comment</p>) : (
                        <ScrollArea className="h-full w-full">
                            {
                                comments.map((comment,i) => (
                                    <>
                                    <CommentCard key={i} name={comment.commentCreatorName!} title={comment.commentTitle!} image={comment.commentCreatorImage!} createdAt={comment.commentCreatedAt!}/>
                                        <Separator className="my-2 text-white" />
                                    </>
                                ))
                            }
                        </ScrollArea>
                    )
                }
            </div>
            <Input disabled={isPending} value={commentInput} onChange={(e) => {
                setCommentInput(e.target.value)
            }} className="text-white bg-transparent border-[#1c1b1e] h-[20%]" onKeyDown={handleAddComment}/>
        </div>
    );
};

export default Comments;
