import FlowPreview from "@/components/global/flow-preview";

interface HomeProps {
    params : {workspaceId : string}
}

const Page = async ({params} : HomeProps) => {
    const {workspaceId} = await params



    return <FlowPreview workspaceId={workspaceId}/>
}

export default Page