import { DashboardHeader } from "@/components/shared/dashboard-header"
import { FileUpload } from "@/components/analysis/file-upload"

export default function AnalysisPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <DashboardHeader />
            <main className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-4xl mx-auto text-center space-y-2 mb-12">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4">
                        تحليل جديد
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-foreground">
                        ابدأ فحص المناقصة الآن
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        ارفع ملف كراسة الشروط وسنقوم بالباقي. نحن ندعم ملفات PDF و DOCX حتى 20 ميجابايت.
                    </p>
                </div>

                <FileUpload />

                <div className="mt-auto pt-8">
                    <p className="text-xs text-center text-muted-foreground dir-ltr">
                        © 2024 جميع الحقوق محفوظة - صنع بمناسبة الرؤية
                    </p>
                </div>
            </main>
        </div>
    )
}
