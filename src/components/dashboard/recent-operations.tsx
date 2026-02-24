"use client"

import { useEffect, useState } from "react"
import { History, FileX, FileText, Loader2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

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

    function getRiskBadge(score: number | null) {
        if (score === null) return <Badge variant="secondary">غير محدد</Badge>
        if (score >= 70) return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">منخفض</Badge>
        if (score >= 40) return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-none">متوسط</Badge>
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">مرتفع</Badge>
    }

    function getStatusBadge(status: string) {
        switch (status) {
            case "COMPLETED": return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">مكتمل</Badge>
            case "PROCESSING": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">قيد التحليل</Badge>
            case "FAILED": return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">فشل</Badge>
            default: return <Badge variant="secondary">قيد الانتظار</Badge>
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
                <div className="divide-y divide-border">
                    {analyses.map((analysis) => (
                        <Link
                            key={analysis.id}
                            href={`/results/${analysis.id}`}
                            className="flex items-center justify-between p-5 hover:bg-muted/50 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground ltr">{analysis.fileName}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(analysis.createdAt).toLocaleDateString("ar-SA", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {getStatusBadge(analysis.status)}
                                {analysis.riskScore !== null && getRiskBadge(analysis.riskScore)}
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                                    <Eye className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
