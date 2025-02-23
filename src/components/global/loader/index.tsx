import React from "react";
import Spinner from "@/components/global/loader/spinner";
import {cn} from "@/lib/utils";

type Props = {
    state?: boolean
    className?: string
    color?: string
    chidlren?: React.ReactNode
}

const Loader  = ({state, className, color, chidlren} : Props) => {
    return state ? (<div className={cn(className)}>
        <Spinner color={color}/>
    </div>) : (chidlren)
}

export default Loader