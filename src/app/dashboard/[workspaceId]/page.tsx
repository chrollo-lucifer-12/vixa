import SectionHeader from "@/components/global/section-header";
import CreateWorkspace from "@/components/global/create-workspace";

const Page = async ({params} : {params : {workspaceId : string}}) => {

    const {workspaceId} = await params

    return <div className="text-white mt-8 ml-5">
        <SectionHeader title="My Library" subtitle="See all your videos here"  />
        <CreateWorkspace/>
    </div>
}

export default Page