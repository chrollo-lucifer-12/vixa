"use client"

import {SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton} from "@/components/ui/sidebar";
import {MENU_ITEMS} from "@/constants/index";
import {usePathname, useRouter} from "next/navigation";

interface NavMainProps {
    activeWorkspaceId : string
}

const NavMain = ({activeWorkspaceId} : NavMainProps) => {

    const pathName = usePathname();
    const router = useRouter();

    return <SidebarGroup>
        <SidebarGroupLabel className="text-[#9f9fa1] font-bold">Menu</SidebarGroupLabel>
        <SidebarMenu>
            {
                MENU_ITEMS(activeWorkspaceId).map((item,i) => (
                    <SidebarMenuButton className={`hover:bg-[#272729] transition duration-300 ${pathName === item.href && "bg-[#272729]"} `} key={i} tooltip={item.title} onClick={() => {

                        router.push(item.href)}
                    }  style={{borderRadius: "0.4rem"}}>
                        {item.icon}
                        <span className="text-white">{item.title}</span>
                    </SidebarMenuButton>
                ))
            }
        </SidebarMenu>
    </SidebarGroup>
}

export default NavMain