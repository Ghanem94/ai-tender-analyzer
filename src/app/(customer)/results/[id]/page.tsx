"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import {
    ShieldAlert,
    Download,
    Share2,
    ArrowLeft,
    Clock,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    File,
    Briefcase,
    Calendar,
    Wallet,
    Sparkles,
    Scale,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoCard, FileDetailsCard } from "@/components/shared/file-details-card"

interface AnalysisData {
    id: string
    fileName: string
    status: string
    riskScore: number | null
    summary: string | null
    result: string | null
    recommendation: string | null
    statusColor: string | null
    legalAnalysis: any | null
    technicalRequirements: any | null
    timeline: string | null
    financialTerms: string | null
    createdAt: string
    updatedAt: string
    documents: { id: string; name: string; type: string; size: number; createdAt: string }[]
}

interface ParsedResult {
    score?: number
    riskScore?: number
    risk_score?: number
    riskLevel?: string
    title?: string
    summary?: string
    recommendation?: string | { title?: string; subtitle?: string; description?: string; actions?: string[] }
    status_color?: string
    legal_analysis?: {
        title: string
        description: string
    }[]
    technical_requirements?: string[]
    timeline?: string
    financial_terms?: string
}

export default function ResultsPage() {
    const params = useParams()
    const id = params?.id as string
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchAnalysis() {
            try {
                const response = await fetch(`/api/analysis?id=${id}`)
                if (!response.ok) {
                    throw new Error("التحليل غير موجود")
                }
                const data = await response.json()
                setAnalysis(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err))
            } finally {
                setIsLoading(false)
            }
        }
        if (id) fetchAnalysis()
    }, [id])

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#FDFCF9] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#9A8D59]/5 to-transparent"></div>
                <div className="text-center space-y-6 relative z-10">
                    <div className="relative w-20 h-20 mx-auto">
                        <div className="absolute inset-0 rounded-full border-t-2 border-[#9A8D59] animate-spin"></div>
                        <div className="absolute inset-2 rounded-full border-r-2 border-[#1A1A1A] animate-spin animation-delay-150"></div>
                        <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-[#9A8D59] animate-pulse" />
                    </div>
                    <p className="text-[#1A1A1A] text-xl font-bold tracking-tight animate-pulse">جاري التحليل واستخراج النتائج...</p>
                </div>
            </div>
        )
    }

    if (error || !analysis) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#FDFCF9]">
                <div className="text-center space-y-6 bg-white p-12 rounded-[2.5rem] shadow-xl shadow-black/5 border border-[#E6E4DF] max-w-md w-full mx-4">
                    <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto">
                        <ShieldAlert className="h-10 w-10 text-red-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">{error || "التحليل غير موجود"}</h2>
                        <p className="text-[#7D7D7D]">حدث خطأ أثناء محاولة استرجاع بيانات التحليل، يرجى المحاولة مرة أخرى.</p>
                    </div>
                    <Link href="/dashboard" className="block pt-4">
                        <Button className="w-full h-12 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-white">
                            العودة للوحة العمليات
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    // Parse result JSON if available
    let parsed: ParsedResult = {}
    if (analysis.result) {
        try {
            parsed = JSON.parse(analysis.result)
        } catch {
            parsed = {}
        }
    }

    const score = analysis.riskScore ?? parsed.risk_score ?? parsed.score ?? parsed.riskScore ?? 0
    const hasWebhookResult = analysis.result !== null && Object.keys(parsed).length > 0

    // Status color handling
    const statusColorRaw = (analysis.statusColor || parsed.status_color || "").toLowerCase()
    let riskColor = score >= 70 ? "#FF4B4B" : score >= 40 ? "#F59E0B" : "#10B981"
    let riskLevelStr = score >= 70 ? "مرتفع" : score >= 40 ? "متوسط" : "منخفض"
    let riskBgColor = score >= 70 ? "bg-red-500/10 text-red-500 border-red-500/20" : score >= 40 ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"

    // If explicit text color overrides
    if (statusColorRaw.includes("green")) {
        riskColor = "#10B981"
        riskLevelStr = "منخفض"
        riskBgColor = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    } else if (statusColorRaw.includes("yellow") || statusColorRaw.includes("yallow")) {
        riskColor = "#F59E0B"
        riskLevelStr = "متوسط"
        riskBgColor = "bg-amber-500/10 text-amber-500 border-amber-500/20"
    } else if (statusColorRaw.includes("red") || statusColorRaw.includes("read")) {
        riskColor = "#FF4B4B"
        riskLevelStr = "مرتفع"
        riskBgColor = "bg-red-500/10 text-red-500 border-red-500/20"
    }

    const title = parsed.title ?? "تقرير التحليل"
    const summary = analysis.summary ?? parsed.summary ?? "تم تحليل المستند بنجاح."
    const recommendation = analysis.recommendation ?? parsed.recommendation
    const legalAnalysis = analysis.legalAnalysis ?? parsed.legal_analysis ?? []
    const technicalRequirements = analysis.technicalRequirements ?? parsed.technical_requirements ?? []
    const timeline = analysis.timeline ?? parsed.timeline
    const financialTerms = analysis.financialTerms ?? parsed.financial_terms

    function getStatusInfo(status: string) {
        switch (status) {
            case "COMPLETED": return { label: "مكتمل", icon: CheckCircle2, bg: "bg-emerald-500/20", text: "text-emerald-400" }
            case "PROCESSING": return { label: "قيد التحليل", icon: Clock, bg: "bg-blue-500/20", text: "text-blue-400" }
            case "FAILED": return { label: "فشل", icon: XCircle, bg: "bg-red-500/20", text: "text-red-400" }
            default: return { label: "قيد الانتظار", icon: Clock, bg: "bg-amber-500/20", text: "text-amber-400" }
        }
    }

    const statusInfo = getStatusInfo(analysis.status)
    const StatusIcon = statusInfo.icon

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#FDFCF9] font-sans selection:bg-[#9A8D59]/30 selection:text-[#1A1A1A]" dir="rtl">
            {/* SIDEBAR - Fixed height to keep buttons visible, visually hidden scrollbar */}
            <aside className="w-full lg:w-[420px] lg:h-screen lg:sticky lg:top-0 bg-[#0A0A0A] text-white flex flex-col shrink-0 relative overflow-hidden p-6 lg:p-8 shadow-2xl z-20">
                {/* Decorative background glow removed */}

                <div className="flex flex-col h-full relative z-10 w-full">
                    {/* Header: Back Button */}
                    <div className="shrink-0 mb-6">
                        <Link href="/dashboard" className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors w-fit">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                            </div>
                            <span className="font-medium tracking-wide text-sm">العودة للوحة العمليات</span>
                        </Link>
                    </div>

                    {/* Center Content - Scrollable but visually hidden scrollbar */}
                    <div className="flex-1 overflow-y-auto pr-2 pb-6 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {/* Score Circle */}
                        <div className="flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-6">
                                {/* Outer Glow removed */}

                                {/* Inner Background */}
                                <div className="absolute inset-4 rounded-full bg-[#1A1A1A]/50 backdrop-blur-md border border-white/5"></div>

                                <svg className="w-full h-full transform -rotate-90 relative z-10 drop-shadow-2xl">
                                    <circle cx="50%" cy="50%" r="44%" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-white/5" />
                                    <circle
                                        cx="50%" cy="50%" r="44%"
                                        stroke={riskColor}
                                        strokeWidth="6"
                                        fill="transparent"
                                        strokeDasharray={1000}
                                        strokeDashoffset={1000 * (1 - score / 100)}
                                        className="transition-all duration-1000 ease-out origin-center"
                                        strokeLinecap="round"
                                        style={{ strokeDasharray: "276", strokeDashoffset: `${276 * (1 - score / 100)}` }}
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center z-20">
                                    <span className="text-6xl sm:text-7xl font-bold tracking-tighter text-white" style={{ textShadow: `0 0 40px ${riskColor}80` }}>
                                        {Math.round(score)}
                                    </span>
                                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/40 mt-1">درجة المخاطرة</span>
                                </div>
                            </div>

                            <div className={`px-5 py-2 rounded-full text-xs font-bold mb-6 border backdrop-blur-xl transition-colors ${riskBgColor} animate-in fade-in zoom-in duration-500 delay-300`}>
                                مستوى المخاطرة: {riskLevelStr}
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 leading-relaxed text-white/90">{title}</h1>
                            <p className="text-white/50 text-center text-xs sm:text-sm leading-relaxed px-2">{summary}</p>
                        </div>

                        {/* Document Info */}
                        {analysis.documents && analysis.documents.length > 0 && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 px-1">المستندات المرفقة</h3>
                                {analysis.documents.map((doc) => (
                                    <FileDetailsCard
                                        key={doc.id}
                                        name={doc.name}
                                        size={doc.size}
                                        className="bg-white/5 border-white/5"
                                    />
                                ))}
                            </div>
                        )}

                        {/* Status & Date */}
                        <div className="grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                            <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col justify-center gap-1.5">
                                <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">الحالة</span>
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${statusInfo.bg}`}>
                                        <StatusIcon className={`w-3 h-3 ${statusInfo.text}`} />
                                    </div>
                                    <span className="text-xs font-bold text-white/90">{statusInfo.label}</span>
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col justify-center gap-1.5">
                                <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">تاريخ الرفع</span>
                                <span className="text-xs font-bold text-white/90">
                                    {new Date(analysis.createdAt).toLocaleDateString("ar-SA", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Buttons (Fixed at the bottom of the sidebar) */}
                    <div className="space-y-2 shrink-0 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <Button className="w-full h-12 bg-[#9A8D59] hover:bg-[#8A7D49] text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-[#9A8D59]/20 group text-sm">
                            <Download className="w-4 h-4 ml-2 group-hover:-translate-y-1 transition-transform" />
                            تحميل التقرير الكامل
                        </Button>

                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT - Light Elegant Area */}
            <main className="flex-1 overflow-y-auto h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-[#FDFCF9] to-[#F4F2ED] p-6 lg:py-10 lg:px-10 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-full h-[300px] bg-gradient-to-b from-white/80 to-transparent pointer-events-none"></div>

                <div className="w-full space-y-8 relative z-10 pb-20">
                    <header className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                        <h2 className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-3">تفاصيل التحليل</h2>
                        <p className="text-[#7D7D7D] text-lg">نظرة شاملة على الجوانب القانونية والفنية والمالية للمناقصة.</p>
                    </header>

                    {hasWebhookResult ? (
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                            {/* Recommendation Hero Section */}
                            <div className="mb-8">
                                {recommendation ? (
                                    <div className="relative overflow-hidden group bg-gradient-to-br from-[#9A8D59]/10 via-[#FDFCF9] to-[#9A8D59]/5 rounded-[1.5rem] p-8 md:p-10 border border-[#9A8D59]/20 shadow-inner">
                                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#9A8D59] to-transparent opacity-50"></div>
                                        <div className="absolute -top-16 -left-16 text-[#9A8D59]/10 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-45 pointer-events-none">
                                            <Sparkles className="w-80 h-80" />
                                        </div>
                                        <div className="absolute -bottom-16 -right-16 text-[#9A8D59]/10 transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-45 pointer-events-none">
                                            <Briefcase className="w-80 h-80" />
                                        </div>
                                        <div className="relative z-10 flex items-start gap-6">
                                            <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-sm border border-[#9A8D59]/20 flex items-center justify-center">
                                                <Briefcase className="w-7 h-7 md:w-8 md:h-8 text-[#9A8D59]" />
                                            </div>
                                            <div className="flex flex-col items-start text-right gap-3 pt-2">
                                                <h4 className="text-xl md:text-2xl font-bold text-[#1A1A1A] leading-snug tracking-tight">
                                                    {typeof recommendation === "string" ? recommendation : recommendation.title}
                                                </h4>
                                                {typeof recommendation !== "string" && recommendation.description && (
                                                    <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed font-medium max-w-3xl">
                                                        {recommendation.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-16 text-center bg-[#FDFCF9] rounded-[1.5rem] border border-[#E6E4DF]/50">
                                        <Briefcase className="w-16 h-16 text-[#E6E4DF] mb-4" />
                                        <p className="text-[#7D7D7D] text-xl font-bold">لا توجد توصيات تنفيذية.</p>
                                    </div>
                                )}
                            </div>

                            {/* Organized Tabs */}
                            <Tabs defaultValue="legal" className="w-full" dir="rtl">
                                <TabsList className="flex flex-wrap h-auto w-full justify-start items-center gap-2 bg-transparent p-0 mb-8 border-b border-[#E6E4DF]/50 pb-px">
                                    <TabsTrigger
                                        value="legal"
                                        className="h-12 px-6 rounded-t-xl rounded-b-none border-b-2 border-transparent data-[state=active]:bg-red-500/10 data-[state=active]:border-red-500 data-[state=active]:text-red-600 text-[#7D7D7D] font-bold text-base transition-all"
                                    >
                                        <Scale className="w-4 h-4 ml-2" />
                                        التحليل القانوني
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="technical"
                                        className="h-12 px-6 rounded-t-xl rounded-b-none border-b-2 border-transparent data-[state=active]:bg-blue-500/10 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 text-[#7D7D7D] font-bold text-base transition-all"
                                    >
                                        <CheckCircle2 className="w-4 h-4 ml-2" />
                                        المتطلبات الفنية
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="details"
                                        className="h-12 px-6 rounded-t-xl rounded-b-none border-b-2 border-transparent data-[state=active]:bg-emerald-500/10 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 text-[#7D7D7D] font-bold text-base transition-all"
                                    >
                                        <Calendar className="w-4 h-4 ml-2" />
                                        تفاصيل أخرى
                                    </TabsTrigger>
                                </TabsList>

                                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-black/[0.03] border border-white">

                                    {/* TAB 2: LEGAL GAPS */}
                                    <TabsContent value="legal" className="mt-0 outline-none">
                                        {legalAnalysis.length > 0 ? (
                                            <div className="grid grid-cols-1 gap-5">
                                                {legalAnalysis.map((gap: { title: string, description: string }, i: number) => (
                                                    <div key={i} className="group bg-[#FDFCF9] rounded-[1.5rem] p-6 shadow-sm border border-[#E6E4DF]/50 hover:border-red-100 hover:bg-white hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 flex flex-col md:flex-row gap-5 items-start">
                                                        <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center font-bold text-xl shrink-0 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                                                            {i + 1}
                                                        </div>
                                                        <div className="flex-1 space-y-1.5 pt-1">
                                                            <h4 className="text-lg font-bold text-[#1A1A1A]">{gap.title}</h4>
                                                            <p className="text-[#4A4A4A] leading-relaxed text-base">{gap.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-[#7D7D7D] text-lg">لا توجد مخاطر قانونية مسجلة.</p>
                                        )}
                                    </TabsContent>

                                    {/* TAB 3: TECHNICAL REQUIREMENTS */}
                                    <TabsContent value="technical" className="mt-0 outline-none">
                                        {technicalRequirements.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                                {technicalRequirements.map((req: string, i: number) => (
                                                    <div key={i} className="flex items-start gap-4 group bg-[#FDFCF9] rounded-2xl p-4 border border-[#E6E4DF]/50 hover:bg-white hover:border-blue-100 transition-colors">
                                                        <div className="mt-0.5 w-8 h-8 rounded-full bg-blue-50/50 text-blue-500 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                                                            <CheckCircle2 className="w-4 h-4" />
                                                        </div>
                                                        <span className="text-[#4A4A4A] leading-relaxed text-base font-medium pt-0.5 group-hover:text-[#1A1A1A] transition-colors">{req}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-[#7D7D7D] text-lg">لا توجد متطلبات فنية مسجلة.</p>
                                        )}
                                    </TabsContent>

                                    {/* TAB 4: TIMELINE & FINANCIAL TERMS GRID */}
                                    <TabsContent value="details" className="mt-0 outline-none">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {timeline && (
                                                <div className="bg-[#FDFCF9] rounded-[1.5rem] p-6 border border-[#E6E4DF]/50 hover:bg-white transition-colors">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
                                                            <Calendar className="w-6 h-6" />
                                                        </div>
                                                        <h4 className="text-xl font-bold text-[#1A1A1A]">الإطار الزمني</h4>
                                                    </div>
                                                    <p className="text-[#4A4A4A] leading-relaxed text-base font-medium">{timeline}</p>
                                                </div>
                                            )}
                                            {financialTerms && (
                                                <div className="bg-[#FDFCF9] rounded-[1.5rem] p-6 border border-[#E6E4DF]/50 hover:bg-white transition-colors">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                                                            <Wallet className="w-6 h-6" />
                                                        </div>
                                                        <h4 className="text-xl font-bold text-[#1A1A1A]">الشروط المالية</h4>
                                                    </div>
                                                    <p className="text-[#4A4A4A] leading-relaxed text-base font-medium">{financialTerms}</p>
                                                </div>
                                            )}
                                            {!timeline && !financialTerms && (
                                                <p className="text-[#7D7D7D] text-lg col-span-2">لا توجد تفاصيل إضافية للإطار الزمني أو الشروط المالية.</p>
                                            )}
                                        </div>
                                    </TabsContent>

                                </div>
                            </Tabs>
                        </div>
                    ) : (
                        // No webhook result — show basic info
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-black/[0.03] border border-white p-8 md:p-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <InfoCard title="اسم الملف" value={analysis.fileName} />
                                    <InfoCard title="حالة التحليل">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusInfo.bg}`}>
                                                <StatusIcon className={`w-4 h-4 ${statusInfo.text}`} />
                                            </div>
                                            <span className="font-bold text-xl text-[#1A1A1A]">{statusInfo.label}</span>
                                        </div>
                                    </InfoCard>
                                    <InfoCard title="تاريخ الرفع" value={new Date(analysis.createdAt).toLocaleDateString("ar-SA", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })} valueClassName="font-bold text-xl text-[#1A1A1A]" />
                                    <InfoCard title="معرف التحليل" value={analysis.id} valueClassName="font-bold text-[#1A1A1A] ltr text-sm tracking-widest font-mono" />
                                </div>

                                {/* Webhook hint */}
                                <div className="mt-10 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 rounded-[2rem] p-8 md:p-10 text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl"></div>
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl"></div>
                                    <div className="relative z-10 space-y-4">
                                        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                                            <AlertTriangle className="w-10 h-10 text-amber-500" />
                                        </div>
                                        <p className="text-amber-900 font-extrabold text-2xl">لا يوجد تحليل مفصل بالذكاء الاصطناعي</p>
                                        <p className="text-amber-700/80 text-lg max-w-xl mx-auto font-medium">
                                            قم بإعداد رابط الويب هوك في الإعدادات العامة للحصول على تحليل مفصل واستخراج التوصيات والمخاطر بشكل آلي.
                                        </p>
                                        <div className="pt-6">
                                            <Link href="/dashboard">
                                                <Button className="bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/20 text-white font-bold rounded-2xl px-10 h-14 text-lg transition-transform hover:-translate-y-1">
                                                    إعداد الويب هوك
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* New Analysis Button */}
                    <div className="flex justify-center pt-8">
                        <Link href="/analysis">
                            <Button className="rounded-2xl gap-3 h-16 bg-white hover:bg-gray-50 text-[#1A1A1A] px-12 text-lg border-2 border-[#E6E4DF] font-bold shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 group">
                                <Sparkles className="w-6 h-6 text-[#9A8D59] group-hover:scale-110 transition-transform" />
                                تحليل مستند جديد
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(154, 141, 89, 0.3);
                    border-radius: 20px;
                }
            `}</style>
        </div>
    )
}
