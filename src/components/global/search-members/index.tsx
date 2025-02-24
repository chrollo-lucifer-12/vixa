import {useSearch} from "@/hooks/useSearch";
import {useMutationData} from "@/hooks/useMutationData";
import {Input} from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

interface SearchMembersProps {
    workspaceId : string
}

const SearchMembers = ({workspaceId} : SearchMembersProps) => {

    const {query, onSearchQuery, isFetching, onUsers} = useSearch("get-users", "USERS");

    // const {mutate, isPending} = useMutationData(['invite-member'], (data:{receiverId : string; email : string}) => {
    //   //wip : send invites
    // });

    return <div>
        <Input onChange={onSearchQuery} value={query} placeholder="Search for members" className="text-white bg-[#272729] border-none" style={{borderRadius: "0.5rem"}} />
        {isFetching ? (<div className="flex flex-col gap-y-2">
            <Skeleton className="h-8 w-full bg-[#171719] mt-4" style={{borderRadius: "0.5rem"}} />
        </div>) : !onUsers || !onUsers.length? (
                <p className="mt-4 text-center text-[#797a7f]">No Users found</p>
            ) : (
            <div className="mt-4">
                {onUsers.map((user) => (
                    <div className="flex items-center justify-between space-x-4 hover:bg-[#272729] p-1 transition duration-300" key={user.id} style={{borderRadius: "0.4rem"}}>
                        <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={user.image!} />
                        </Avatar>
                            <p className="text-white">{user.email}</p>
                        </div>
                        <Button className="text-black bg-white">Invite</Button>
                    </div>
                ))}
            </div>
        )}
    </div>
}

export default SearchMembers