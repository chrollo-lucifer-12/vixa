import {Button} from "@/components/ui/button";
import {Link2} from "lucide-react";
import { toast } from "sonner"
interface CopyLinkProps {
    videoId : string
}

const CopyLink = ({videoId} : CopyLinkProps) => {
    return <Button className="w-10" variant="link" onClick={() => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_URL}/preview/${videoId}`)
        toast("Link Copied")
    }}>
        <Link2 size={20} />
    </Button>
}

export default CopyLink