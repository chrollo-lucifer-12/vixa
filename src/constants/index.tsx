import React from "react";
import {BellDot, Home, Library, Settings} from "lucide-react";

export const MENU_ITEMS = (workspaceId : string) : {title : string; href: string; icon:React.ReactNode}[] => [
    {title: "Home", href: `./dashboard/${workspaceId}/home`, icon: <Home className="text-white" />},
    {title: "My Library", href: `/dashboard/${workspaceId}`, icon: <Library className="text-white" />},
    {title: "Notifications", href: `/dashboard/${workspaceId}/notifications`, icon: <BellDot className="text-white" />},
    {title: "Settings", href: `/dashboard/${workspaceId}/settings`, icon: <Settings className="text-white" />}
]