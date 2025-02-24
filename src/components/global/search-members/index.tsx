import {useSearch} from "@/hooks/useSearch";
import {useMutationData} from "@/hooks/useMutationData";

interface SearchMembersProps {
    workspaceId : string
}

const SearchMembers = ({workspaceId} : SearchMembersProps) => {

    const {query, onSearchQuery, isFetching, onUsers} = useSearch("get-users", "USERS");

    const {mutate, isPending} = useMutationData(['invite-member'], (data:{receiverId : string, email : string}) => {

    });

    return <div>

    </div>
}

export default SearchMembers