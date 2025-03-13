"use client"
import {FolderIcon, FolderOpen} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import React, {useRef, useState} from "react";
import {useMutationData} from "@/hooks/useMutationData";
import {renameFolders} from "@/actions/workspace";
import {Input} from "@/components/ui/input";

interface FolderProps {
    title : string
    count : number
    id : string
}

const Folder = ({title, count, id} : FolderProps) => {

    const inputRef = useRef<HTMLInputElement | null>(null)
    const folderCardRef = useRef<HTMLDivElement | null>(null)
    const [onRename, setOnRename] = useState(false);

    const router = useRouter();
    const pathName = usePathname();

    const {mutate, isPending} = useMutationData(["rename-folders"], (data) => renameFolders(id, data.name), "workspace-folders", () => {
        setOnRename(false);
    });

    function handleFolderClick () {
        if (!onRename) router.push(`${pathName}/folder/${id}`);
    }

    function handleNameDoubleClick (e : React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation();
        setOnRename(true);
    }

    const updateFolderName = (e : React.FocusEvent<HTMLInputElement> ) => {
        if (!inputRef.current?.value.trim()) {
            setOnRename(false);
            return;
        }
        mutate({ name: inputRef.current.value });
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (inputRef.current?.value.trim()) {
                mutate({ name: inputRef.current.value });
            }
            setOnRename(false);
        }
    };

    return <div ref={folderCardRef} className="flex group justify-between w-[150px] items-center text-[#95969d] cursor-pointer p-3 hover:bg-gray-200 transition duration-300" style={{borderRadius: "0.6rem"}} onClick={handleFolderClick}>
        <div className="flex flex-col">
            {
                onRename ? (<Input onKeyDown={handleKeyDown}  onBlur={(e) => updateFolderName(e)} ref={inputRef} className="border-none text-white" />) : (
                    <span onClick={(e) => e.stopPropagation()} onDoubleClick={handleNameDoubleClick}>{
                        isPending ? ("changing name") : title
                    }</span>)
            }
            <span>{count} videos</span>
        </div>
        <FolderIcon className="group-hover:hidden transition duration-300" />
        <FolderOpen className="hidden group-hover:block transition duration-300" />
    </div>
}

export default Folder