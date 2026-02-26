"use client"

import { useEffect, useState } from "react"
import { History, FileX, FileText, Loader2, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"
import { DataTable } from "@/components/shared/data-table"
import { StatusBadge, RiskBadge } from "@/components/shared/status-badge"
import { FileDetailsCard } from "@/components/shared/file-details-card"

interface Analysis {
    id: string
    fileName: string
    status: string
    riskScore: number | null
    summary: string | null
    createdAt: string
    documents: { id: string; name: string; type: string; size: number }[]
}

export function RecentOperations() {
    const [analyses, setAnalyses] = useState<Analysis[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        async function fetchAnalyses() {
            try {
                const response = await fetch("/api/analysis")
                if (response.ok) {
                    const data = await response.json()
                    setAnalyses(data)
                }
            } catch (error) {
                console.error("Failed to fetch analyses", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchAnalyses()
    }, [])



    const handleDelete = async () => {
        if (!deletingId) return

        setIsDeleting(true)
        try {
            const response = await fetch(`/api/analysis/${deletingId}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                setAnalyses(prev => prev.filter(item => item.id !== deletingId))
            }
        } catch (error) {
            console.error("Failed to delete analysis", error)
        } finally {
            setIsDeleting(false)
            setDeletingId(null)
        }
    }

    return (
        <div className="w-full bg-card rounded-[40px] border border-border overflow-hidden min-h-[400px] flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    سجل العمليات الأخير
                </h2>
                <span className="text-sm text-muted-foreground">{analyses.length} وثيقة محللة</span>
            </div>

            {isLoading ? (
                <div className="flex-1 flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : analyses.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
                        <FileX className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">لا توجد سجلات بعد..</h3>
                    <Button variant="link" asChild className="text-primary font-bold">
                        <Link href="/analysis">ابدأ الآن</Link>
                    </Button>
                </div>
            ) : (
                <div className="p-0">
                    <DataTable
                        data={analyses}
                        columns={[
                            {
                                header: "الملف",
                                cell: (item: Analysis) => (
                                    <FileDetailsCard
                                        name={item.fileName}
                                        subText={new Date(item.createdAt).toLocaleDateString("ar-SA", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                        className="border-none hover:bg-transparent hover:border-transparent p-0 justify-start"
                                        iconClassName="bg-primary/10 text-primary"
                                        textClassName="text-foreground text-sm"
                                        subTextClassName="text-muted-foreground"
                                    />
                                )
                            },
                            {
                                header: "الحالة",
                                cell: (item: Analysis) => <StatusBadge status={item.status} />
                            },
                            {
                                header: "مستوى المخاطرة",
                                cell: (item: Analysis) => <RiskBadge score={item.riskScore} />
                            },
                            {
                                header: "إجراءات",
                                cell: (item: Analysis) => (
                                    <div className="flex items-center gap-2">
                                        <Link href={`/results/${item.id}`}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 px-3 text-primary hover:text-primary hover:bg-primary/10 rounded-lg gap-1.5 transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span className="text-xs font-bold">عرض</span>
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setDeletingId(item.id)}
                                            className="h-8 px-3 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg gap-1.5 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span className="text-xs font-bold w-full text-right">حذف</span>
                                        </Button>
                                    </div>
                                )
                            }
                        ]}
                        searchKey="fileName"
                        searchPlaceholder="ابحث باسم الملف..."
                        filters={[
                            {
                                column: "status",
                                label: "الحالة",
                                options: [
                                    { label: "مكتمل", value: "COMPLETED" },
                                    { label: "قيد التحليل", value: "PROCESSING" },
                                    { label: "فشل", value: "FAILED" }
                                ]
                            }
                        ]}
                    />
                </div>
            )}

            <Dialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
                <DialogContent dir="rtl" className="sm:max-w-[400px] overflow-hidden p-0 rounded-2xl border-none shadow-2xl bg-background">
                    <div className="bg-red-500/10 py-8 px-6 flex flex-col items-center justify-center border-b border-red-500/20">
                        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-4 shadow-sm border border-red-500/30">
                            <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-500" strokeWidth={2.5} />
                        </div>
                        <DialogTitle className="text-center text-xl font-bold text-red-600 dark:text-red-500">تأكيد الحذف</DialogTitle>
                    </div>
                    <div className="p-8 pt-6">
                        <DialogHeader>
                            <DialogDescription className="text-center text-foreground/80 text-base leading-relaxed font-medium">
                                هل أنت متأكد من رغبتك في حذف سجل التحليل هذا؟
                                <br />
                                <span className="text-destructive font-medium block mt-2">لا يمكن التراجع عن هذا الإجراء وسيتم مسح البيانات نهائياً.</span>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-center">
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto h-12 rounded-xl border-border/60 hover:bg-muted/50 font-semibold bg-background"
                                onClick={() => setDeletingId(null)}
                                disabled={isDeleting}
                            >
                                تراجع
                            </Button>
                            <Button
                                variant="destructive"
                                className="w-full sm:w-auto h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transition-shadow"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "جاري الحذف..." : "نعم، تأكيد الحذف"}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
