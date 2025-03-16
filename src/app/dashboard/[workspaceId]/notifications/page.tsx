"use client"
import {useQueryData} from "@/hooks/useQueryData";
import {getUserNotifications} from "@/actions/user";
import {NotificationProps} from "@/types/index.type";
import { ScrollArea } from "@/components/ui/scroll-area"

const Notifications  =  () => {

    const {data} = useQueryData(["user-notification"], getUserNotifications)

    //
    const notifications = data as NotificationProps

    return <div className="text-white m-4">
        <p className="text-5xl">Notifications</p>
        <ScrollArea className="w-full">
        <div className="flex flex-1 flex-col gap-4 p-4">
            {
                notifications.length ?  notifications.map((n, index) => (
                    <div
                        key={index}
                        className="aspect-video h-12 w-[60%] rounded-lg bg-[#272729] flex items-center"
                        style={{borderRadius: "1rem"}}
                    >
                        <span className="flex items-center justify-between w-full">
                        <p className="ml-5">{n.notificationTitle}</p>
                        <p className="mr-5">{n.notificationCreatedAt}</p>
                        </span>
                    </div>
                )) : (<p className="text-white">No notifications to show</p>)
            }
        </div>
        </ScrollArea>
    </div>
}

export default Notifications