import {MenuIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const LandingPageNavbar = () => {
    return <div className="flex justify-between items-center m-6">
        <div className="text-3xl font-semibold flex items-center gap-x-3 ml-5">
            <MenuIcon className="w-6 h-6" />
            <Image alt="logo" src="/vixa-logo.png" width={32} height={32} />
            VIXA
        </div>
        <div className="hidden gap-x-10 items-center lg:flex">
            <Link href="/" className="bg-[#7320dd] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320dd]/80">Home</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Contact</Link>
        </div>
        <Link href="/auth/sign-in">
            <Button className="text-base flex gap-x-2 bg-white text-black hover:bg-white hover:text-black">Login</Button>
        </Link>
    </div>
}

export default LandingPageNavbar