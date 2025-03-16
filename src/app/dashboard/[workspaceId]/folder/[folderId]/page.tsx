import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getFolderInfo, getUserVideos} from "@/actions/user";
import SectionHeader from "@/components/global/section-header";
import FolderInfo from "@/components/global/folders/folder-info";
import Videos from "@/components/global/videos";

interface Props {
    params : {
        workspaceId : string
        folderId : string
    }
}

const Page = async ({params} : Props) => {

    const {folderId, workspaceId} = await params

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey: ["folder-videos"],
        queryFn: () => getUserVideos(folderId)
    })

    await query.prefetchQuery({
        queryKey: ["folder-info"],
        queryFn: () => getFolderInfo(folderId)
    })

    return <HydrationBoundary state={dehydrate(query)}>
        <div className="text-white mt-8 ml-5">
            <FolderInfo folderId={folderId}/>
            <Videos workspaceId={workspaceId} folderId={folderId} videosKey="folder-videos"/>
        </div>
    </HydrationBoundary>
}

export default Page