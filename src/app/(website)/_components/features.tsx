import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {BarChart, MessageSquare, Share2, Shield, Video} from "lucide-react";

const Features = () => {
    return <section id="features" className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        Powerful features for better communication
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Create, share, and collaborate with easy screen recordings. Save time and communicate more
                        effectively.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                <Card className="border border-[#1c1b1e]">
                    <CardHeader>
                        <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4">
                            <Video className="h-8 w-8 text-primary"/>
                        </div>
                        <CardTitle>One-click Recording</CardTitle>
                        <CardDescription>
                            Start recording your screen, camera, or both with a single click. No complicated setup
                            required.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className="border border-[#1c1b1e]">
                    <CardHeader>
                        <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4">
                            <MessageSquare className="h-8 w-8 text-primary"/>
                        </div>
                        <CardTitle>Interactive Comments</CardTitle>
                        <CardDescription>
                            Add comments at specific timestamps to provide context and feedback directly in your videos.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className="border border-[#1c1b1e]">
                    <CardHeader>
                        <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4">
                            <Share2 className="h-8 w-8 text-primary"/>
                        </div>
                        <CardTitle>Instant Sharing</CardTitle>
                        <CardDescription>
                            Share your recordings instantly with a link. No downloads or attachments needed.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className="border border-[#1c1b1e]">
                    <CardHeader>
                        <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4">
                            <BarChart className="h-8 w-8 text-primary"/>
                        </div>
                        <CardTitle>Viewer Analytics</CardTitle>
                        <CardDescription>
                            See who watched your videos, for how long, and which parts they rewatched.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className="border border-[#1c1b1e]">
                    <CardHeader>
                        <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4">
                            <Shield className="h-8 w-8 text-primary"/>
                        </div>
                        <CardTitle>Enterprise Security</CardTitle>
                        <CardDescription>
                            Keep your content secure with SSO, password protection, and domain restrictions.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className="border border-[#1c1b1e]">
                    <CardHeader>
                        <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4">
                            <Video className="h-8 w-8 text-primary"/>
                        </div>
                        <CardTitle>Video Library</CardTitle>
                        <CardDescription>
                            Organize your recordings in folders and create a searchable library of content.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    </section>
}

export default Features