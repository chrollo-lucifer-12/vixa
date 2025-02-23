import React from "react";
import {getUserNotifications, getUserVideos, getUserWorkspaces, onAuthenticateUser} from "@/actions/user";
import {redirect} from "next/navigation";
import {getWorkspaceFolders, verifyAccessToWorkspace} from "@/actions/workspace";
import UnauthorizedPage from "@/components/global/no-access/page";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

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
        queryKey: ["user-videos"],
        queryFn: () => getUserVideos(workspaceId),
    })

    await query.prefetchQuery({
        queryKey: ["user-workspaces"],
        queryFn: () => getUserWorkspaces(),
    })

    await query.prefetchQuery({
        queryKey: ["user-notification"],
        queryFn: () => getUserNotifications(),
    })

    return <div>{children}</div>
}

export default Layout