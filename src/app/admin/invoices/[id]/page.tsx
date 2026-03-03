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
    Hash
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { mockInvoices } from "../page"

export default function AdminInvoiceDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [invoice, setInvoice] = useState<any>(null)

    useEffect(() => {
        const found = mockInvoices.find(inv => inv.id === params.id)
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

    const points = Math.floor(invoice.amount / 10)
    const vat = invoice.amount * 0.15
    const subtotal = invoice.amount - vat

    return (
        <div className="space-y-6 pb-10" dir="rtl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                        <h2 className="text-2xl font-extrabold tracking-tight Cairo text-foreground">تفاصيل الفاتورة</h2>
                        <p className="text-muted-foreground text-sm Cairo mt-0.5">سجل الدفع والبيات الضريبية</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl Cairo gap-2 border-border/50">
                        <Printer className="h-4 w-4" />
                        طباعة
                    </Button>
                    <Button className="rounded-xl Cairo gap-2 shadow-lg shadow-primary/20">
                        <Download className="h-4 w-4" />
                        تحميل PDF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Invoice Card */}
                <div className="lg:col-span-2">
                    <Card className="rounded-[32px] border-border/50 bg-card overflow-hidden shadow-sm">
                        <div className="bg-primary/5 border-b border-border/40 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-[20px] bg-background border border-border/50 flex items-center justify-center shadow-sm">
                                    <FileText className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-xl font-bold text-foreground font-mono uppercase">{invoice.id}</h3>
                                        <Badge className={cn(
                                            "Cairo rounded-lg border-0",
                                            invoice.status === "COMPLETED" ? "bg-emerald-500/15 text-emerald-600" :
                                                invoice.status === "PENDING" ? "bg-amber-500/15 text-amber-600" :
                                                    "bg-rose-500/15 text-rose-600"
                                        )}>
                                            {invoice.status === "COMPLETED" ? "مدفوعة" :
                                                invoice.status === "PENDING" ? "معلقة" : "ملغاة"}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span className="Cairo font-medium">{new Date(invoice.createdAt).toLocaleDateString("ar-SA", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-left md:text-right">
                                <p className="text-xs font-bold text-muted-foreground Cairo uppercase mb-1">إجمالي المبلغ</p>
                                <h4 className="text-4xl font-black text-primary tracking-tight">
                                    {invoice.amount.toLocaleString()} <span className="text-lg font-bold">ر.س</span>
                                </h4>
                            </div>
                        </div>

                        <CardContent className="p-8 space-y-10">
                            {/* Addresses */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-primary font-bold Cairo">
                                        <Building2 className="h-4 w-4" />
                                        مُصدر الفاتورة
                                    </div>
                                    <div className="space-y-1.5">
                                        <p className="font-extrabold text-foreground Cairo">منصة تحليل المناقصات الذكية</p>
                                        <p className="text-muted-foreground text-sm Cairo">المملكة العربية السعودية، الرياض</p>
                                        <p className="text-muted-foreground text-sm Cairo">الرقم الضريبي: 310123456700003</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-primary font-bold Cairo">
                                        <User className="h-4 w-4" />
                                        مستلم الفاتورة
                                    </div>
                                    <div className="space-y-1.5">
                                        <p className="font-extrabold text-foreground Cairo">{invoice.user.email.split('@')[0]}</p>
                                        <p className="text-muted-foreground text-sm Cairo">{invoice.user.email}</p>
                                        <p className="text-muted-foreground text-sm Cairo">مشترك رقم: {invoice.userId}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-border/40" />

                            {/* Items Table */}
                            <div className="space-y-4">
                                <h5 className="font-bold text-foreground Cairo text-lg">تفاصيل الباقة</h5>
                                <div className="rounded-2xl border border-border/30 overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/30 border-b border-border/30">
                                            <tr>
                                                <th className="px-6 py-4 text-right Cairo font-bold text-muted-foreground uppercase text-xs">الوصف</th>
                                                <th className="px-6 py-4 text-center Cairo font-bold text-muted-foreground uppercase text-xs">الكمية</th>
                                                <th className="px-6 py-4 text-left Cairo font-bold text-muted-foreground uppercase text-xs">السعر</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/20">
                                            <tr>
                                                <td className="px-6 py-5 text-right">
                                                    <div className="font-bold text-foreground Cairo">باقة نقاط ذكية ({points} نقطة)</div>
                                                    <div className="text-xs text-muted-foreground Cairo mt-1">تستخدم لتحليل المناقصات والمستندات التقنية</div>
                                                </td>
                                                <td className="px-6 py-5 text-center Cairo font-medium">1</td>
                                                <td className="px-6 py-5 text-left Cairo font-bold text-foreground">{subtotal.toLocaleString()} ر.س</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Totals */}
                            <div className="flex justify-start">
                                <div className="w-full md:w-80 space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground Cairo">المجموع الفرعي:</span>
                                        <span className="font-bold text-foreground Cairo">{subtotal.toLocaleString()} ر.س</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground Cairo">ضريبة القيمة المضافة (15%):</span>
                                        <span className="font-bold text-foreground Cairo">{vat.toLocaleString()} ر.س</span>
                                    </div>
                                    <Separator className="bg-border/40 my-2" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-foreground Cairo">الإجمالي النهائي:</span>
                                        <span className="text-2xl font-black text-primary tracking-tight">{invoice.amount.toLocaleString()} ر.س</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card className="rounded-[28px] border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold Cairo">معلومات الدفع</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/20 border border-border/30">
                                <CreditCard className="h-5 w-5 text-primary" />
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground Cairo mb-0.5">طريقة الدفع</p>
                                    <p className="font-bold text-foreground Cairo">بطاقة مدى / فيزا</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm py-2 border-b border-border/20">
                                    <span className="text-muted-foreground Cairo">رقم العملية:</span>
                                    <span className="font-mono text-foreground font-medium">TXN_9823471</span>
                                </div>
                                <div className="flex justify-between text-sm py-2 border-b border-border/20">
                                    <span className="text-muted-foreground Cairo">تاريخ التحصيل:</span>
                                    <span className="Cairo text-foreground font-medium">{new Date(invoice.createdAt).toLocaleDateString("ar-SA")}</span>
                                </div>
                            </div>

                            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                                <div className="flex items-center gap-2 text-primary font-bold Cairo text-sm mb-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    تأكيد الدفع
                                </div>
                                <p className="text-xs text-muted-foreground Cairo leading-relaxed">
                                    تم استلام المبلغ بنجاح وإضافة النقاط المرتبطة بهذه العملية إلى رصيد المستخدم بشكل آلي.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[28px] border-border/50 bg-card/50 backdrop-blur-sm pb-2">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold Cairo">إجراءات سريعة</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start rounded-xl Cairo text-sm h-11 hover:bg-primary/5">
                                <Download className="h-4 w-4 ml-2" />
                                إرسال نسخة للبريد
                            </Button>
                            <Button variant="ghost" className="w-full justify-start rounded-xl Cairo text-sm h-11 text-rose-500 hover:bg-rose-500/5">
                                <XCircle className="h-4 w-4 ml-2" />
                                إلغاء / طلب استرجاع
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
