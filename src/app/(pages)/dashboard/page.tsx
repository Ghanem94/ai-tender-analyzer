import { DashboardHeader } from "@/components/shared/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentOperations } from "@/components/dashboard/recent-operations"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UploadCloud } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <DashboardHeader />
            <main className="flex-1 p-8 container mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">لوحة العمليات</h1>
                        <p className="text-muted-foreground">تتبع نشاطك وتحليلاتك القانونية السابقة</p>
                    </div>
                    <Button asChild className="gap-2 rounded-xl h-12 px-6">
                        <Link href="/analysis">
                            <UploadCloud className="w-5 h-5" />
                            تحليل جديد
                        </Link>
                    </Button>
                </div>

                <DashboardStats />
                <RecentOperations />
            </main>
            <div className="py-8">
                <p className="text-xs text-center text-muted-foreground dir-ltr">
                    © 2026 جميع الحقوق محفوظة - صنع بمناسبة الرؤية
                </p>
            </div>
        </div>
    )
}
