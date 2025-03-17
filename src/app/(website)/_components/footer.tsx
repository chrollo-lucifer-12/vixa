import Link from "next/link";
import {Video} from "lucide-react";

const Footer = () => {
    return <footer className="w-full border-t border-[#1c1b1e] bg-[#18181a]">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:flex-row lg:gap-12">
            <div className="flex flex-col gap-4 lg:w-1/3">
                <div className="flex items-center gap-2">
                    <Video className="h-6 w-6 text-primary"/>
                    <span className="text-xl font-bold">VIXA</span>
                </div>
                <p className="text-sm text-muted-foreground">
                    Record your screen, share your thoughts, and get things done faster with ScreenCast.
                </p>
                <div className="flex gap-4">
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                        <span className="sr-only">Facebook</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path
                                d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                        <span className="sr-only">Twitter</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path
                                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect width="4" height="12" x="2" y="9"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                </div>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
                <div className="space-y-3">
                    <h3 className="text-sm font-medium">Product</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Integrations
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Changelog
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-3">
                    <h3 className="text-sm font-medium">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-3">
                    <h3 className="text-sm font-medium">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Documentation
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Guides
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Support
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                API
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-3">
                    <h3 className="text-sm font-medium">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Terms
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Privacy
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Cookies
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Licenses
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="border-t py-6 border-[#1c1b1e]">
            <div className="container flex flex-col items-center justify-between gap-4 px-4 md:px-6 lg:flex-row">
                <p className="text-center text-sm text-muted-foreground lg:text-left">
                    &copy; {new Date().getFullYear()} VIXA. All rights reserved.
                </p>
                <p className="text-center text-sm text-muted-foreground lg:text-left">Made with ❤️ by Chrollo</p>
            </div>
        </div>
    </footer>
}

export default Footer