"use client"


import {useQueryData} from "@/hooks/useQueryData";
import {getUserInvites, updateInvite} from "@/actions/user";
import {ScrollArea} from "@/components/ui/scroll-area";
import {InviteProps} from "@/types/index.type";
import {Button} from "@/components/ui/button";
import {Check, LoaderCircle} from "lucide-react";
import {useMutationData} from "@/hooks/useMutationData";

const Settings = () => {

    const {data} = useQueryData(["user-invites"], getUserInvites)
    const {mutate, isPending} = useMutationData(["update-invite"], async (data: { id: string }) => {
        await updateInvite(data.id)
    }, "user-invites")

    const invites = data as InviteProps

    return <div className="text-white m-4">
        <p className="text-5xl">Invites</p>
        <ScrollArea className="w-full">
            <div className="flex flex-1 flex-col gap-4 p-4">
                {
                    invites.map((n, index) => (
                        <div
                            key={index}
                            className="aspect-video h-12 w-[60%] rounded-lg bg-[#272729] flex items-center"
                            style={{borderRadius: "1rem"}}
                        >
                        <span className="flex items-center justify-between w-full">
                        <p className="ml-5">{n.invite.content}</p>
                        </span>
                            <Button className={"text-green-500"} onClick={() => {
                                mutate({id: n.invite.id})
                            }}>
                                {
                                    isPending ? (<LoaderCircle/>) : (<Check/>)
                                }

                            </Button>
                        </div>
                    ))
                }
            </div>
        </ScrollArea>
    </div>
}

export default Settings