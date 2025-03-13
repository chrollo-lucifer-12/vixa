"use client"
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useMutationData} from "@/hooks/useMutationData";
import {useQueryData} from "@/hooks/useQueryData";
import { editVideo, getWorkspaceFolders} from "@/actions/workspace";
import {FolderProps} from "@/components/global/folders";
import {useState} from "react";

interface EditVideoProps {
    workspaceId : string
    videoId : string
    videoTitle : string
    videoDesc : string
    videoSummary : string
}

const EditVideo = ({workspaceId, videoId, videoDesc, videoSummary, videoTitle} : EditVideoProps) => {

    const [title, setTitle] = useState(videoTitle || "");
    const [desc, setDesc] = useState(videoDesc || "");
    const [summary, setSummary] = useState(videoSummary || "");
    const [folderId, setFolderId] = useState<string>();

    const {data, isFetched} = useQueryData(["workspace-folders"], () => getWorkspaceFolders(workspaceId));
    const folders = data as FolderProps
    const {mutate, isPending} = useMutationData(["edit-video"], async (data) => {await editVideo(videoId, data.folderId, data.title, data.desc,data.summary)} , "preview-video")

    return <div>
        <Dialog>
            <DialogTrigger><p className="bg-white hover:bg-white"
                                   style={{borderRadius: "0.4rem"}}>Edit</p></DialogTrigger>
            <DialogContent className="bg-[#09090b] border-[#222224]" style={{borderRadius: "0.2rem"}}>
                <DialogHeader>
                    <DialogTitle className={"text-white"}>Edit Video</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4 text-white">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3 border-[#232325]"
                            style={{borderRadius: "0.3rem"}}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 text-white">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="description"
                            value={desc}
                            onChange={(e) => {setDesc(e.target.value)}}
                            className="col-span-3 border-[#232325]"
                            style={{borderRadius: "0.3rem"}}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 text-white">
                        <Label htmlFor="summary" className="text-right">
                            Summary
                        </Label>
                        <Input
                            id="summary"
                            value={summary}
                            onChange={(e) => {setSummary(e.target.value)}}
                            className="col-span-3 border-[#232325]"
                            style={{borderRadius: "0.3rem"}}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 text-white">
                        <Label htmlFor="summary" className="text-right">
                            Summary
                        </Label>
                        <Select>
                            <SelectTrigger className="w-full" style={{borderRadius: "0.3rem"}}>
                                <SelectValue placeholder="Folder" />
                            </SelectTrigger>
                            <SelectContent className="w-full text-white" style={{borderRadius: "0.3rem"}}>
                                {
                                    folders.map((folder,i) => (
                                        <SelectItem key={i} value={folder.folder.name!} className="cursor-pointer" onClick={() => {
                                            setFolderId(folder.folder.id)
                                        }}>
                                            {folder.folder.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>

                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => mutate({desc, title, summary, folderId})} disabled={isPending} className="bg-white hover:bg-white" type="submit" style={{borderRadius: "0.3rem"}}>
                        {
                            isPending ? "Saving" : "Save Changes"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
}

export default EditVideo