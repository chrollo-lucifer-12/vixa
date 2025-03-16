import {MenuIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {UserButton} from "@clerk/nextjs";


interface LandingPageNavbarProps {
    isSignedIn : boolean
}

const LandingPageNavbar = ( {isSignedIn} : LandingPageNavbarProps) => {
    return <div className="flex justify-between items-center border-b border-[#1c1b1e] p-3 m-3">
        <div className="font-semibold flex items-center gap-x-3 ml-2">
            <MenuIcon className="w-6 h-6" />
            <Image alt="logo" src="/vixa-logo.png" width={32} height={32} />
            <p className={"text-white"}>VIXA</p>
        </div>
        <div className="hidden gap-x-10 items-center lg:flex text-white">
            <Link href="/">Features</Link>
            <Link href="/">Testimonials</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Blog</Link>
        </div>
        {
            isSignedIn ? (<UserButton/>) : (<Link href="/auth/sign-in" className={"text-white"}>
                Signin
            </Link>)
        }

    </div>
}

export default LandingPageNavbar