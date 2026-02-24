"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/shared/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter as DialogFooterUI,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Ticket, PlusCircle, AlertCircle, Eye, Clock, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock Data
const stats = [
    {
        title: "إجمالي التذاكر",
        value: "24",
        icon: Ticket,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        title: "تذاكر تحت المعالجة",
        value: "3",
        icon: Clock,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
    },
    {
        title: "تذاكر مكتملة",
        value: "21",
        icon: CheckCircle2,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
]

const recentTickets = [
    {
        id: "TKT-001",
        subject: "مشكلة في تحميل التقرير",
        date: "2026-02-24",
        status: "قيد الانتظار",
        category: "استفسار تقني",
        description: "حاولت تحميل تقرير المناقصة رقم 1234 ولكن تظهر لي رسالة خطأ متعلقة بالسيرفر.",
        reply: null
    },
    {
        id: "TKT-002",
        subject: "استفسار عن التحليل القانوني",
        date: "2026-02-23",
        status: "مكتمل",
        category: "استفسار عام",
        description: "هل يتضمن التحليل القانوني مراجعة شروط الضمان الابتدائي؟",
        reply: "نعم، النظام يقوم بتحليل كافة الشروط القانونية بما فيها متطلبات الضمان البنكي بأنواعه."
    },
    {
        id: "TKT-003",
        subject: "تحديث بيانات الحساب",
        date: "2026-02-20",
        status: "مكتمل",
        category: "إدارة الحساب",
        description: "أرغب بتغيير اسم الشركة المرتبط بحسابي.",
        reply: "تم تحديث اسم الشركة بنجاح كما طلبتم."
    },
    {
        id: "TKT-004",
        subject: "خطأ في عرض لوحة العمليات",
        date: "2026-02-18",
        status: "مكتمل",
        category: "استفسار تقني",
        description: "لا أستطيع رؤية العمليات السابقة في لوحة التحكم.",
        reply: "تم حل المشكلة وتحديث السيرفرات، يرجى إعادة تحميل الصفحة."
    },
]

type TicketType = typeof recentTickets[0]

export function getStatusBadge(status: string) {
    if (status === "مكتمل") {
        return <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 shadow-none border-none">مكتمل</Badge>
    }
    return <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 shadow-none border-none">قيد الانتظار</Badge>
}

export default function SupportTicketsPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const router = useRouter()

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans" dir="rtl">
            <DashboardHeader />
            <main className="flex-1 p-4 md:p-8 container mx-auto max-w-7xl">
                {/* ====== Standard Tickets List View ====== */}
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-2">الدعم الفني</h1>
                            <p className="text-[#7D7D7D] text-lg">نحن هنا لمساعدتك في حل أي مشكلة تواجهك</p>
                        </div>

                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="rounded-2xl gap-3 h-14 bg-primary hover:bg-primary/80 text-white px-8 text-base font-bold shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
                                    <PlusCircle className="w-5 h-5" />
                                    فتح تذكرة جديدة
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px] rounded-[2rem] p-8" dir="rtl">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-[#1A1A1A] mb-2">فتح تذكرة جديدة</DialogTitle>
                                    <DialogDescription className="text-[#7D7D7D] text-base">
                                        يرجى ملء النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-6 py-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="subject" className="text-right text-sm font-bold text-[#1A1A1A]">
                                            عنوان المشكلة
                                        </Label>
                                        <Input id="subject" placeholder="أدخل عنواناً واضحاً لمشكلتك" className="h-12 rounded-xl bg-[#F8F9FA] border-[#E6E4DF] focus-visible:ring-[#9A8D59]" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="category" className="text-right text-sm font-bold text-[#1A1A1A]">
                                            نوع المشكلة
                                        </Label>
                                        <select id="category" className="flex h-12 w-full rounded-xl border border-[#E6E4DF] bg-[#F8F9FA] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A8D59] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue={""}>
                                            <option value="" disabled>اختر نوع المشكلة</option>
                                            <option value="technical">مشكلة تقنية</option>
                                            <option value="billing">استفسار مالي</option>
                                            <option value="account">إدارة الحساب</option>
                                            <option value="other">أخرى</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="description" className="text-right text-sm font-bold text-[#1A1A1A]">
                                            وصف المشكلة
                                        </Label>
                                        <textarea
                                            id="description"
                                            className="flex min-h-[120px] w-full rounded-xl border border-[#E6E4DF] bg-[#F8F9FA] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A8D59] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                            placeholder="يرجى وصف المشكلة بالتفصيل لمساعدتنا في حلها بشكل أسرع..."
                                        />
                                    </div>
                                </div>
                                <DialogFooterUI className="sm:justify-start gap-3 flex-row-reverse">
                                    <Button type="submit" className="h-12 rounded-xl bg-[#9A8D59] hover:bg-[#8A7D49] text-white font-bold px-8" onClick={() => setIsDialogOpen(false)}>
                                        إرسال التذكرة
                                    </Button>
                                    <Button type="button" variant="outline" className="h-12 rounded-xl border-[#E6E4DF] text-[#7D7D7D] font-bold px-8 hover:bg-gray-50" onClick={() => setIsDialogOpen(false)}>
                                        إلغاء
                                    </Button>
                                </DialogFooterUI>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Statistics Row */}
                    <div className="grid gap-6 md:grid-cols-3">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <Card key={index} className="rounded-[2rem] border-[#E6E4DF]/50 shadow-sm hover:shadow-md transition-shadow">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
                                        <CardTitle className="text-sm font-bold text-[#7D7D7D]">
                                            {stat.title}
                                        </CardTitle>
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bgColor}`}>
                                            <Icon className={`w-6 h-6 ${stat.color}`} />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 pt-0">
                                        <div className="text-4xl font-extrabold text-[#1A1A1A]">{stat.value}</div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    {/* Action & List Section */}
                    <Card className="rounded-[2rem] border-[#E6E4DF]/50 shadow-sm overflow-hidden">
                        <CardHeader className="bg-[#F8F9FA] border-b border-[#E6E4DF]/50 p-6 flex-row items-center justify-between">
                            <CardTitle className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-[#9A8D59]" />
                                تذاكر الدعم السابقة
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-[#FDFCF9] hover:bg-[#FDFCF9] border-b-[#E6E4DF]/50 text-[#7D7D7D] font-bold">
                                            <TableHead className="text-right font-bold w-[120px] rounded-tr-2xl">رقم التذكرة</TableHead>
                                            <TableHead className="text-right font-bold">الموضوع</TableHead>
                                            <TableHead className="text-right font-bold w-[150px]">التاريخ</TableHead>
                                            <TableHead className="text-right font-bold w-[120px]">الحالة</TableHead>
                                            <TableHead className="text-right font-bold w-[100px] rounded-tl-2xl">إجراءات</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentTickets.map((ticket) => (
                                            <TableRow key={ticket.id} className="border-b-[#E6E4DF]/30 hover:bg-[#F8F9FA]/50 transition-colors">
                                                <TableCell className="font-mono text-sm font-bold text-[#1A1A1A]">{ticket.id}</TableCell>
                                                <TableCell className="font-medium text-[#4A4A4A]">{ticket.subject}</TableCell>
                                                <TableCell className="text-[#7D7D7D] text-sm">{ticket.date}</TableCell>
                                                <TableCell>
                                                    {getStatusBadge(ticket.status)}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => router.push(`/support/${ticket.id}`)}
                                                        className="h-8 px-3 text-[#9A8D59] hover:text-[#8A7D49] hover:bg-[#9A8D59]/10 rounded-lg gap-1.5 transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        <span className="text-xs font-bold">عرض</span>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
