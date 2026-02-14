import { History, FileX } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function RecentOperations() {
    // This would fetch data in a real app. For now, we show the empty state as per design.
    const hasOperations = false

    return (
        <div className="w-full bg-card rounded-[40px] border border-border overflow-hidden min-h-[400px] flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    سجل العمليات الأخير
                </h2>
                <span className="text-sm text-muted-foreground">0 وثيقة محللة</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
                    <FileX className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">لا توجد سجلات بعد..</h3>
                <Button variant="link" asChild className="text-primary font-bold">
                    <Link href="/analysis">
                        ابدأ الآن
                    </Link>
                </Button>
            </div>
        </div>
    )
}
