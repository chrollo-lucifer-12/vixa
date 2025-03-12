import Image from "next/image";

interface CommentCardProps {
    title : string
    image : string
    createdAt : string
    name : string
}

const CommentCard = ({ createdAt, image, name, title} : CommentCardProps) => {
    return <div className="flex items-center space-x-4">
        <Image src={image} alt={"user image"} className="h-12 w-12 rounded-full" width={12} height={12}/>
        <div className="space-y-2">
            <p className="h-4 w-[250px]"> {name} </p>
            <p className="h-4 w-[200px]">{title}</p>
        </div>
    </div>
}

export default CommentCard