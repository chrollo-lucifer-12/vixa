import React from "react"
import Navbar from "@/app/(website)/_components/navbar";
import {currentUser} from "@clerk/nextjs/server";

type Props = {
    children : React.ReactNode
}

const Layout = async ({children} : Props) => {

    const user = await currentUser();

    return <div className="flex flex-col xl:px-0">
        <Navbar isSignedIn={user ? true : false} />
        {children}
    </div>
}

export default Layout