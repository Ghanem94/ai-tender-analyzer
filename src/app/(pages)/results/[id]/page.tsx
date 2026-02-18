"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import {
    AlertTriangle,
    CheckCircle2,
    FileText,
    ShieldAlert,
    Download,
    Share2,
    ChevronRight,
    AlertCircle,
    ArrowLeft,
    Moon
} from "lucide-react" // Ensure icons match allowed list or available icons
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function ResultsPage() {
    const params = useParams()
    const id = params?.id as string

    // Mock Data based on the image content
    const analysisResult = {
        score: 99,
        riskLevel: "منخفض جداً",
        riskScoreLabel: "درجة المخاطرة",
        title: "التقرير القانوني الذكي",
        summary: "بناءً على الفحص الآلي، الوثيقة المرفقة لا ترقى لتكون وثيقة تعاقدية رسمية. يُنصح بشدة بعدم استخدامها لأي أغراض تجارية أو قانونية لتجنب المسائلة.",
        recommendation: {
            title: "توصية: حظر التعامل",
            subtitle: "الوثيقة غير صالحة للتعاقد",
            description: "هذه الوثيقة تفتقر للعناصر الأساسية للعقود الحكومية (النطاق، الجداول، الشروط الجزائية). يُنصح بعدم المضي قدماً في أي إجراءات تعاقدية بناءً على هذه المسودة.",
            actions: [
                "رفض الوثيقة فوراً",
                "طلب كراسة شروط رسمية (RFP)",
                "تحويل الملف للإدارة القانونية للمراجعة"
            ]
        },
        legalGaps: [
            {
                id: "01",
                title: "انعدام الصفة التعاقدية",
                description: "الوثيقة عبارة عن محتوى تعليمي (Tutorial) ولا تمت بصلة لصياغة العقود أو المنافسات.",
                action: "تجاهل المحتوى بالكامل"
            },
            {
                id: "02",
                title: "مخاطر الملكية الفكرية",
                description: "وجود حقوق نشر لطرف ثالث (Tutorials Point) قد يعرض المؤسسة لنزاعات قانونية.",
                action: "التحقق من التراخيص"
            },
            {
                id: "03",
                title: "غياب جداول الكميات",
                description: "لا يوجد أساس لتسعير المشروع، مما يجعل التقييم المالي مستحيلاً.",
                action: "طلب جداول الكميات"
            }
        ]
    }

    return (
        // Standard RTL Layout: Sidebar on Right, Content on Left.
        // dir="rtl" + flex-row does this automatically.
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#F8F9FA] font-sans overflow-hidden" dir="rtl">

            {/* SIDEBAR (Visually Right in RTL) */}
            <aside className="w-full lg:w-[400px] bg-[#1E1E1E] text-white flex flex-col shrink-0 relative overflow-hidden p-8 lg:p-10 justify-between">

                {/* Top: Navigation */}
                <div>
                    <Link href="/analysis" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12">
                        <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
                        <span>تحليل جديد</span>
                    </Link>

                    {/* Score Circle */}
                    <div className="flex flex-col items-center justify-center mb-8">
                        <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                            {/* Outer RIng */}
                            <div className="absolute inset-0 rounded-full border border-white/10" />
                            {/* Inner Progress Ring (Mocked) */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="transparent"
                                    className="text-white/5"
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="#C5A059" // Gold color
                                    strokeWidth="4"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 88}
                                    strokeDashoffset={2 * Math.PI * 88 * (1 - analysisResult.score / 100)}
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-6xl font-bold tracking-tighter text-white">
                                    {analysisResult.score}
                                </span>
                                <span className="text-sm font-medium text-white/50 mt-1">{analysisResult.riskScoreLabel}</span>
                            </div>
                        </div>

                        <div className="bg-[#3A2A2A] text-[#FF6B6B] border border-[#FF6B6B]/20 px-6 py-2 rounded-full text-sm font-bold mb-8">
                            {analysisResult.riskLevel}
                        </div>

                        <h1 className="text-2xl font-bold text-center mb-4 leading-relaxed">
                            {analysisResult.title}
                        </h1>
                        <p className="text-white/60 text-center text-sm leading-relaxed px-4">
                            {analysisResult.summary}
                        </p>
                    </div>
                </div>

                {/* Bottom Buttons */}
                <div className="space-y-3">
                    <Button className="w-full h-12 bg-[#C5A059] hover:bg-[#B08D4C] text-black font-bold rounded-xl">
                        <Download className="w-4 h-4 ml-2" />
                        تحميل التقرير الكامل
                    </Button>
                    <Button variant="outline" className="w-full h-12 border-white/10 bg-transparent text-white hover:bg-white/5 rounded-xl">
                        <Share2 className="w-4 h-4 ml-2" />
                        مشاركة النتائج
                    </Button>
                </div>
            </aside>

            {/* RIGHT MAIN CONTENT */}
            <main className="flex-1 overflow-y-auto bg-[#F8F9FA] p-8 lg:p-12">
                <div className="w-full max-w-6xl space-y-8">

                    {/* Header with Title */}
                    <div className="flex items-center justify-start gap-2 text-[#C5A059] font-bold text-xl mb-4">
                        <Briefcase className="w-6 h-6" />
                        <h2>التوصية التنفيذية</h2>
                    </div>

                    {/* Recommendation Card */}
                    <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden relative">
                        {/* Watermark Shield - Keep on Left (End) to avoid text overlap */}
                        <div className="absolute top-8 left-8 text-gray-100">
                            <ShieldAlert className="w-24 h-24 opacity-50 fill-primary-100 stroke-none" />
                        </div>

                        <CardContent className="p-8 lg:p-10">
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold text-[#1A1A1A] mb-1">
                                    {analysisResult.recommendation.title}
                                </h2>
                                <p className="text-red-500 font-medium mb-6 text-sm">
                                    {analysisResult.recommendation.subtitle}
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-8 max-w-3xl">
                                    {analysisResult.recommendation.description}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium shadow-sm hover:bg-gray-50 cursor-pointer transition-colors">
                                        <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs">
                                            <span className="mb-0.5">×</span>
                                        </div>
                                        {analysisResult.recommendation.actions[0]}
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium shadow-sm hover:bg-gray-50 cursor-pointer transition-colors">
                                        <FileText className="w-4 h-4" />
                                        {analysisResult.recommendation.actions[1]}
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-[#FBF8F3] border border-[#F0E6D2] text-[#9A8D59] rounded-full text-sm font-medium hover:bg-[#F5EFDF] cursor-pointer transition-colors ml-auto">
                                        <ShieldAlert className="w-4 h-4" />
                                        {analysisResult.recommendation.actions[2]}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Analysis Section */}
                    <div className="mt-12">
                        <div className="flex items-center justify-start gap-2 text-[#C5A059] font-bold text-xl mb-6">
                            <ShieldAlert className="w-6 h-6" />
                            <h2>التحليل القانوني للمخاطر</h2>
                        </div>

                        <div className="space-y-4">
                            {analysisResult.legalGaps.map((gap, i) => (
                                <Card key={i} className="border-none shadow-sm bg-white rounded-[24px] hover:shadow-md transition-shadow">
                                    <CardContent className="p-6 flex items-start gap-6">
                                        {/* Number */}
                                        <div className="text-5xl font-bold text-gray-100 leading-none shrink-0 tracking-tighter">
                                            {gap.id}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl font-bold text-[#1A1A1A]">
                                                    {gap.title}
                                                </h3>
                                                {i === 0 && <Badge variant="secondary" className="bg-red-50 text-red-500 hover:bg-red-100 border-none">حرجة</Badge>}
                                            </div>
                                            <p className="text-gray-500 leading-relaxed text-sm">
                                                {gap.description}
                                            </p>
                                            <div className="pt-2">
                                                <Link href="#" className="inline-flex items-center text-[#C5A059] text-sm font-bold hover:underline">
                                                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                                                    {gap.action}
                                                </Link>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>


            </main>
        </div>
    )
}

function Briefcase(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    )
}
