"use client"

interface SectionHeaderProps {
    title : string
    subtitle?: string
}

const SectionHeader = ({title,subtitle} : SectionHeaderProps) => {

    return <div className="flex flex-col gap-y-2">
        <span>{title}</span>
        <span className="text-5xl">{subtitle}</span>
    </div>
}

export default SectionHeader