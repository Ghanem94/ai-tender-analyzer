import { DashboardHeader } from "@/components/shared/dashboard-header"
import { FileUpload } from "./components/file-upload"
import { Brain } from "lucide-react"

export default function AnalysisPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <DashboardHeader />
            <main className="flex-1 flex flex-col items-center justify-center p-3">
                <div className="w-full max-w-4xl mx-auto text-center space-y-2 mb-8">
                    <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium text-primary mb-4">
                        <Brain className="w-5 h-5 m-2" />
                        <span>تحليل جديد</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-foreground">
                        ابدأ فحص المناقصة الآن
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-5">
                        ارفع ملف كراسة الشروط وسنقوم بالباقي , نوع الملفات المسموح به هو PDF وان لايتجاوز حجم الملف 100 صفحة
                    </p>
                </div>

                <FileUpload />


            </main>
        </div>
    )
}
