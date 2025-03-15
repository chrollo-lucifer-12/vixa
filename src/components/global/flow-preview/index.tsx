"use client"
import {useQueryData} from "@/hooks/useQueryData";
import {getFolderWithVideos} from "@/actions/workspace";
import {FolderWithVideosProps} from "@/types/index.type";
import {ReactFlow, Controls, Background, NodeTypes, Handle, Position} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {useEffect, useState, memo} from "react";
import {FolderIcon, VideoIcon} from "lucide-react";

// Custom node components
const FolderNode = memo(({ data }) => {
    return (
        <div className="text-white ring-1 ring-red-500" style={{
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: 'black',
            width: '150px'
        }}>
            <div className="flex items-center gap-x-5" style={{ fontWeight: 'bold' }}><FolderIcon className="text-yellow-300" /> Folder</div>
            <div>{data.title}</div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
});

const VideoNode = memo(({ data }) => {
    return (
        <div className="text-white ring-1 ring-blue-500" style={{
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: 'black',
            width: '150px'
        }}>
            <div className="flex items-center gap-x-5" style={{fontWeight: 'bold'}}><VideoIcon className="text-blue-300" /> Video</div>
            <div>{data.title}</div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
});

const MemberNode = memo(({ data }) => {
    return (
        <div className="text-white ring-1 ring-blue-500" style={{
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: 'black',
            width: '150px'
        }}>
            <div className="flex items-center gap-x-5" style={{fontWeight: 'bold'}}><VideoIcon className="text-blue-300" /> Video</div>
            <div>{data.title}</div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
});

interface FlowPreviewProps {
    workspaceId: string
}

const initialNodes = [
    {id: '1', position: {x: -100, y: 200}, data: {}, type: 'members'}
];

const initialEdges = [{id: '1-2', source: '1', target: '2' }];

const FlowPreview = ({workspaceId}  :FlowPreviewProps) => {
    const [folderNodes, setFolderNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    // Define the node types
    const nodeTypes: NodeTypes = {
        folder: FolderNode,
        video: VideoNode,
        members : MemberNode
    };

    const {data} = useQueryData(["folder-videos"], () => getFolderWithVideos(workspaceId))
    const folderWithVideos = data as FolderWithVideosProps

    useEffect(() => {
        if (!folderWithVideos) return;

        const newNodes = folderWithVideos.map((d, i) => ({
            id: d.folder.id,
            position: { x: 200 * i, y: 100 },
            data: { type: "folder", title: d.folder.name },
            type: 'folder' // Important: this connects to the nodeTypes object
        }));

        const newVideoNodes = folderWithVideos.map((d, i) => ({
            id: d.video.id,
            position: { x: 200 * i, y: 250 },
            data: { type: "video", title: d.video.title },
            type: 'video' // Important: this connects to the nodeTypes object
        }));

        const newEdges = folderWithVideos.map((d) => ({
            id: `${d.folder.id}-${d.video.id}`,
            source: d.folder.id,
            target: d.video.id
        }));

        setFolderNodes([...newNodes, ...newVideoNodes]);
        setEdges(newEdges);
    }, [folderWithVideos]);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <ReactFlow
                nodes={folderNodes}
                edges={edges}
                nodeTypes={nodeTypes}

            >
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    );
}

export default FlowPreview;