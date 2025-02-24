import React, {useEffect, useState} from "react";
import {useQueryData} from "@/hooks/useQueryData";
import {searchMembers} from "@/actions/user";

export const useSearch = (key : string, type : "USERS") => {
    const [query,setQuery] = useState('')
    const [debounce, setDebounce] = useState('');
    const [onUsers, setOnUsers] = useState<{id : string, firstName : string | null, lastName: string | null, image: string | null, email : string | null
    }[] | undefined>(undefined);

    const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebounce(query);
        },1000)
        return () => {
            clearTimeout(delayInputTimeoutId)
        }
    },[query])

    const {refetch, isFetching} = useQueryData([key, debounce], async ({queryKey}) => {
        if (type === "USERS") {
            const members = await searchMembers(queryKey[1] as string);
            if (!members || members.length === 0) setOnUsers([]);
            else setOnUsers(members);
        }
    }, false)

    useEffect(() => {
        if (debounce) {
            refetch();
        }
        if (!debounce) setOnUsers([]);
        return () => {
            debounce
        }
    }, [debounce])

    return {onSearchQuery, query, isFetching, onUsers};
}