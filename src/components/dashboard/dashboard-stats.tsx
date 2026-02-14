import { AlertCircle, BarChart3, FileCheck, FileText } from "lucide-react"

interface StatCardProps {
    title: string
    value: string
    icon: React.ReactNode
    iconBgClass: string
}

function StatCard({ title, value, icon, iconBgClass }: StatCardProps) {
    return (
        <div className="bg-card rounded-[32px] p-6 flex items-center justify-between shadow-sm border border-border h-[120px]">
            <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">{title}</span>
                <span className="text-3xl font-bold text-foreground">{value}</span>
            </div>
            <div className={`p-3 rounded-full ${iconBgClass} text-white`}>
                {icon}
            </div>
        </div>
    )
}

export function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <StatCard
                title="مخاطرة عالية"
                value="0"
                icon={<AlertCircle className="w-6 h-6" />}
                iconBgClass="bg-red-500"
            />
            <StatCard
                title="مخاطرة متوسطة"
                value="0"
                icon={<BarChart3 className="w-6 h-6" />}
                iconBgClass="bg-yellow-500"
            />
            <StatCard
                title="مخاطرة منخفضة"
                value="0"
                icon={<FileCheck className="w-6 h-6" />}
                iconBgClass="bg-emerald-500"
            />
            <StatCard
                title="إجمالي العمليات"
                value="0"
                icon={<FileText className="w-6 h-6" />}
                iconBgClass="bg-blue-600"
            />
        </div>
    )
}
