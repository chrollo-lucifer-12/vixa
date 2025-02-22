import React from "react"
import Navbar from "@/app/(website)/_components/navbar";

type Props = {
    children : React.ReactNode
}

const Layout = ({children} : Props) => {
    return <div className="flex flex-col xl:px-0 container">
        <Navbar/>
        {children}
    </div>
}

export default Layout