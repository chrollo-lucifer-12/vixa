"use client"
import {useQueryData} from "@/hooks/useQueryData";
import {getFolderWithVideos} from "@/actions/workspace";
import {FolderWithVideosProps} from "@/types/index.type";
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {useEffect, useState} from "react";

interface FlowPreviewProps {
    workspaceId : string
}

const initialNodes = [
    { id: '1', position: { x: -100, y: -200 }, data: { label: 'A' } },
    { id: '2', position: { x: 100, y: 200 }, data: { label: 'B' } },
];

const initialEdges = [{ id: '1-2', source: '1', target: '2' }];

const FlowPreview = ({workspaceId}  :FlowPreviewProps) => {

    const [folderNodes, setFolderNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);


    const {data} = useQueryData(["folder-videos"], () => getFolderWithVideos(workspaceId))

    const folderWithVideos = data as FolderWithVideosProps

    useEffect(() => {
        setFolderNodes([]);
        const newNodes = folderWithVideos.map((d, i) => ({
            id: d.folder.id,
            position: { x: 100 * i, y: 100 },
            data: { label: d.folder.name }
        }));
        const newVideoNodes = folderWithVideos.map((d,i) => ({
            id: d.video.id,
            position: { x: -100 , y: 100  },
            data: { label: d.video.title }
        }))
        const newEdges = folderWithVideos.map((d) => ({
            id : `${d.folder.id}-${d.video.id}`,
            source : d.folder.id,
            target : d.video.id
        }))
        setFolderNodes([...newNodes, ...newVideoNodes]);
        setEdges(newEdges)
    },[folderWithVideos])

    return <div style={{height: '100%'}}>
        <ReactFlow nodes={folderNodes} edges={edges}>
            <Background/>
            <Controls/>
        </ReactFlow>
    </div>
}

export default FlowPreview