"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
    ArrowRight,
    Download,
    Printer,
    CheckCircle2,
    XCircle,
    Clock,
    FileText,
    User,
    CreditCard,
    Building2,
    Calendar,
    Receipt
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DashboardHeader } from "@/components/shared/dashboard-header"
import { cn } from "@/lib/utils"

// Mock Data (consistent with BillingPage)
const transactions = [
    {
        id: "INV-2026-001",
        date: "2026-02-20",
        description: "شحن باقة 10 ملفات",
        amount: "50 ريال",
        credit: "+10 ملفات",
        status: "مكتمل",
    },
    {
        id: "INV-2026-002",
        date: "2026-02-15",
        description: "تحليل مناقصة وزارة الصحة",
        amount: "-", // Not a payment, just a usage
        credit: "-1 ملف",
        status: "مكتمل",
    },
    {
        id: "INV-2026-003",
        date: "2026-02-10",
        description: "تحليل كراسة شروط هيئة النقل",
        amount: "-",
        credit: "-1 ملف",
        status: "مكتمل",
    },
]

export default function CustomerInvoiceDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [invoice, setInvoice] = useState<any>(null)

    useEffect(() => {
        const found = transactions.find(t => t.id === params.id)
        if (found) {
            setInvoice(found)
        }
    }, [params.id])

    if (!invoice) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Clock className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    // Prepare derived data
    const amountNum = parseInt(invoice.amount) || 0
    const vat = amountNum * 0.15
    const subtotal = amountNum - vat

    return (
        <div className="flex min-h-screen flex-col bg-[#FDFDFD] font-sans" dir="rtl">
            <DashboardHeader />
            <main className="flex-1 p-8 container mx-auto space-y-8 max-w-5xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.back()}
                            className="rounded-full hover:bg-primary/5 transition-all"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight mb-1 Cairo">تفاصيل الفاتورة</h1>
                            <p className="text-[#7D7D7D] text-sm Cairo">عرض سجل العملية وبياناتها الضريبية</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none h-11 rounded-2xl Cairo gap-2 border-border/60">
                            <Printer className="h-4 w-4" />
                            طباعة
                        </Button>
                        <Button className="flex-1 md:flex-none h-11 rounded-2xl Cairo gap-2 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                            <Download className="h-4 w-4" />
                            تحميل PDF
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Invoice Content */}
                    <div className="lg:col-span-2">
                        <Card className="rounded-[40px] border-[#E6E4DF]/50 bg-white overflow-hidden shadow-sm border">
                            <div className="bg-[#F8F9FA] border-b border-[#E6E4DF]/50 p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                <div className="flex items-center gap-5">
                                    <div className="h-16 w-16 rounded-[24px] bg-white border border-[#E6E4DF]/60 flex items-center justify-center shadow-sm">
                                        <Receipt className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <h3 className="text-xl font-bold text-[#1A1A1A] font-mono tracking-tight">{invoice.id}</h3>
                                            <Badge className="Cairo rounded-lg bg-emerald-500/10 text-emerald-600 border-none px-3 py-1 text-xs">
                                                {invoice.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#7D7D7D] text-sm">
                                            <Calendar className="h-4 w-4" />
                                            <span className="Cairo font-medium">{new Date(invoice.date).toLocaleDateString("ar-SA", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-xs font-bold text-[#7D7D7D] Cairo uppercase mb-1.5 tracking-wider">القيمة الإجمالية</p>
                                    <h4 className="text-4xl font-black text-primary tracking-tight">
                                        {invoice.amount}
                                    </h4>
                                </div>
                            </div>

                            <CardContent className="p-10 space-y-12">
                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-primary font-bold Cairo text-md">
                                            <Building2 className="h-5 w-5" />
                                            مُصدر الفاتورة
                                        </div>
                                        <div className="space-y-2">
                                            <p className="font-extrabold text-[#1A1A1A] Cairo text-lg">منصة تحليل المناقصات الذكية</p>
                                            <p className="text-[#7D7D7D] text-sm Cairo leading-relaxed">المملكة العربية السعودية، الرياض<br />الرقم الضريبي: 310123456700003</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-primary font-bold Cairo text-md">
                                            <User className="h-5 w-5" />
                                            مستلم الفاتورة
                                        </div>
                                        <div className="space-y-2">
                                            <p className="font-extrabold text-[#1A1A1A] Cairo text-lg">العميل المحترم</p>
                                            <p className="text-[#7D7D7D] text-sm Cairo line-clamp-2">سجل الدخول لعرض بياناتك الكاملة<br />فاتورة رقم: {invoice.id}</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-[#E6E4DF]/40" />

                                {/* Items */}
                                <div className="space-y-5">
                                    <h5 className="font-bold text-[#1A1A1A] Cairo text-lg">بنود الفاتورة</h5>
                                    <div className="rounded-[24px] border border-[#E6E4DF]/50 overflow-hidden">
                                        <table className="w-full text-sm">
                                            <thead className="bg-[#F8F9FA] border-b border-[#E6E4DF]/50">
                                                <tr>
                                                    <th className="px-8 py-5 text-right Cairo font-bold text-[#7D7D7D] text-xs uppercase">الوصف</th>
                                                    <th className="px-8 py-5 text-center Cairo font-bold text-[#7D7D7D] text-xs uppercase">الكمية</th>
                                                    <th className="px-8 py-5 text-left Cairo font-bold text-[#7D7D7D] text-xs uppercase">السعر</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#E6E4DF]/30">
                                                <tr>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="font-bold text-[#1A1A1A] Cairo text-md">{invoice.description}</div>
                                                        <div className="text-xs text-[#7D7D7D] Cairo mt-1.5 font-medium">باقة نقاط ذكية للاستخدام في تحليل مستندات المناقصات</div>
                                                    </td>
                                                    <td className="px-8 py-6 text-center Cairo font-bold text-[#1A1A1A]">1</td>
                                                    <td className="px-8 py-6 text-left Cairo font-bold text-[#1A1A1A]">{subtotal.toFixed(2)} ريال</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Calculation */}
                                <div className="flex justify-start">
                                    <div className="w-full md:w-80 space-y-4">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-[#7D7D7D] Cairo font-medium">المجموع الفرعي:</span>
                                            <span className="font-bold text-[#1A1A1A] Cairo">{subtotal.toFixed(2)} ريال</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-[#7D7D7D] Cairo font-medium">ضريبة القيمة المضافة (15%):</span>
                                            <span className="font-bold text-[#1A1A1A] Cairo">{vat.toFixed(2)} ريال</span>
                                        </div>
                                        <Separator className="bg-[#E6E4DF]/40 my-1" />
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="text-xl font-bold text-[#1A1A1A] Cairo">الإجمالي النهائي:</span>
                                            <span className="text-3xl font-black text-primary tracking-tight">{invoice.amount}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Side info */}
                    <div className="space-y-8">
                        <Card className="rounded-[32px] border-[#E6E4DF]/50 bg-white shadow-sm border">
                            <CardHeader className="p-7 pb-4">
                                <CardTitle className="text-lg font-bold Cairo text-[#1A1A1A]">معلومات السداد</CardTitle>
                            </CardHeader>
                            <CardContent className="p-7 pt-0 space-y-6">
                                <div className="flex items-center gap-4 p-5 rounded-[24px] bg-[#F8F9FA] border border-[#E6E4DF]/40 shadow-inner">
                                    <CreditCard className="h-6 w-6 text-primary flex-shrink-0" />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-[#7D7D7D] Cairo mb-1 tracking-wider">طريقة الدفع</p>
                                        <p className="font-bold text-[#1A1A1A] Cairo">بطاقة ائتمان / مدى</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm items-center">
                                        <span className="text-[#7D7D7D] Cairo font-medium">رقم العملية:</span>
                                        <span className="font-mono text-[#1A1A1A] font-bold">TXN_2026_9941</span>
                                    </div>
                                    <div className="flex justify-between text-sm items-center">
                                        <span className="text-[#7D7D7D] Cairo font-medium">تاريخ الدفع:</span>
                                        <span className="Cairo text-[#1A1A1A] font-bold">{new Date(invoice.date).toLocaleDateString("ar-SA")}</span>
                                    </div>
                                </div>

                                <Separator className="bg-[#E6E4DF]/40" />

                                <div className="bg-emerald-500/5 p-5 rounded-[24px] border border-emerald-500/10">
                                    <div className="flex items-center gap-2.5 text-emerald-600 font-bold Cairo text-sm mb-2.5">
                                        <CheckCircle2 className="h-4 w-4" />
                                        عملية معتمدة
                                    </div>
                                    <p className="text-xs text-emerald-600/80 Cairo leading-relaxed font-medium">
                                        هذه الفاتورة مستند ضريبي رسمي، تم تحصيل المبلغ المحدد وتحديث رصيد ملفاتك بنجاح.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-3">
                            <Button variant="ghost" className="w-full justify-start h-14 rounded-2xl Cairo text-[#1A1A1A] hover:bg-white hover:shadow-sm border border-transparent hover:border-[#E6E4DF]/30 gap-3 px-6">
                                <FileText className="h-5 w-5 text-[#7D7D7D]" />
                                إرسال نسخة للبريد
                            </Button>
                            <Button variant="ghost" className="w-full justify-start h-14 rounded-2xl Cairo text-[#1A1A1A] hover:bg-white hover:shadow-sm border border-transparent hover:border-[#E6E4DF]/30 gap-3 px-6">
                                <Printer className="h-5 w-5 text-[#7D7D7D]" />
                                نسخة صديقة للطباعة
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
