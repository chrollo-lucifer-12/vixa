import React from "react";
import {
    getUserInvites,
    getUserNotifications,
    getUserVideos,
    getUserWorkspaces,
    onAuthenticateUser
} from "@/actions/user";
import {redirect} from "next/navigation";
import {getFolderWithVideos, getWorkspaceFolders, verifyAccessToWorkspace} from "@/actions/workspace";
import UnauthorizedPage from "@/components/global/no-access/page";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider, HydrationBoundary, dehydrate,
} from '@tanstack/react-query'
import Sidebar from "@/components/global/sidebar";

type Props = {
    params: {workspaceId : string}
    children: React.ReactNode
}

const Layout = async ({params, children} : Props) => {

    const {workspaceId} = await params
    const auth = await onAuthenticateUser();

    if (!auth.workspace) {
        redirect(`/auth/sign-in`)
    }

    const hasAccess = await verifyAccessToWorkspace(workspaceId);

    if (hasAccess && hasAccess.status!==200) {
        return <UnauthorizedPage/>
    }

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey: ["workspace-folders"],
        queryFn: () => getWorkspaceFolders(workspaceId),
    })

    await query.prefetchQuery({
        queryKey: ["user-workspaces"],
        queryFn: () => getUserWorkspaces(),
    })

    await query.prefetchQuery({
        queryKey: ["user-notification"],
        queryFn: () => getUserNotifications(),
    })

    await query.prefetchQuery({
        queryKey : ["folder-videos"],
        queryFn : () => getFolderWithVideos(workspaceId)
    })

    await query.prefetchQuery({
        queryKey : ["user-invites"],
        queryFn : () => getUserInvites()
    })

    return <HydrationBoundary state={dehydrate(query)}>
        <div className="flex h-screen w-screen">
            <Sidebar activeWorkspaceId = {workspaceId} children={children} />
        </div>
    </HydrationBoundary>
}

export default Layout