import { ReactNode } from "react"
import { File } from "lucide-react"

export interface InfoCardProps {
    title: string
    value?: ReactNode
    children?: ReactNode
    className?: string
    valueClassName?: string
}

/**
 * Generic Info Card for displaying a title and a value (or children).
 * Used across dashboard and results pages.
 */
export function InfoCard({ title, value, children, className = "", valueClassName = "font-bold text-xl text-[#1A1A1A] ltr break-all" }: InfoCardProps) {
    return (
        <div className={`bg-[#F8F9FA] rounded-[1.5rem] p-6 border border-[#E6E4DF]/50 ${className}`}>
            <p className="text-sm text-[#7D7D7D] font-bold uppercase tracking-widest mb-2">{title}</p>
            {value ? <p className={valueClassName}>{value}</p> : children}
        </div>
    )
}

interface FileItemProps {
    name: string
    size?: number // in bytes
    className?: string
    iconClassName?: string
    textClassName?: string
    subTextClassName?: string
    subText?: ReactNode
}

/**
 * Displays file information such as name and formatted size.
 */
export function FileDetailsCard({
    name,
    size,
    className = "",
    iconClassName = "bg-white/5 text-white/70",
    textClassName = "text-white/90 group-hover:text-white",
    subTextClassName = "text-white/40",
    subText
}: FileItemProps) {
    return (
        <div className={`group hover:bg-white/10 border hover:border-white/10 transition-all rounded-xl p-3 flex items-center gap-3 cursor-default ${className}`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 ${iconClassName}`}>
                <File className="w-4 h-4 currentColor" />
            </div>
            <div className="overflow-hidden flex-1">
                <p className={`text-xs font-medium truncate ltr transition-colors ${textClassName}`}>{name}</p>
                {subText ? (
                    <p className={`text-[10px] mt-0.5 tracking-wider ${subTextClassName}`}>{subText}</p>
                ) : size !== undefined ? (
                    <p className={`text-[10px] mt-0.5 font-mono tracking-wider ${subTextClassName}`}>
                        {(size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                ) : null}
            </div>
        </div>
    )
}
