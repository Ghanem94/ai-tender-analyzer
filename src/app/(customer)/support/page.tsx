"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/shared/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table"
import { DataTable, ColumnDef } from "@/components/shared/data-table"
import { StatusBadge } from "@/components/shared/status-badge"
import { Ticket, AlertCircle, Eye, Clock, CheckCircle2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { CreateTicketDialog } from "./components/create-ticket-dialog"
import { DeleteTicketDialog } from "./components/delete-ticket-dialog"

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


export default function SupportTicketsPage() {
    const [tickets, setTickets] = useState<TicketType[]>(recentTickets)
    const [deletingTicketId, setDeletingTicketId] = useState<string | null>(null)
    const router = useRouter()

    const handleDelete = () => {
        if (!deletingTicketId) return
        setTickets(prev => prev.filter(t => t.id !== deletingTicketId))
        setDeletingTicketId(null)
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#FDFDFD] font-sans" dir="rtl">
            <DashboardHeader />
            <main className="flex-1 p-6 md:p-10 container mx-auto max-w-7xl space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight Cairo">مركز المساعدة</h1>
                        <p className="text-[#7D7D7D] text-lg Cairo font-medium">سجل التذاكر والدعم الفني المباشر</p>
                    </div>
                    <CreateTicketDialog />
                </div>

                {/* Statistics Row */}
                <div className="grid gap-6 md:grid-cols-3">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <Card key={index} className="rounded-[2.5rem] border-[#E6E4DF]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white overflow-hidden group">
                                <CardContent className="p-8 flex items-center gap-6">
                                    <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 transition-colors duration-300 ${stat.bgColor} group-hover:bg-primary/10`}>
                                        <Icon className={`w-8 h-8 transition-transform duration-300 group-hover:scale-110 ${stat.color}`} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-[#7D7D7D] Cairo uppercase tracking-wider">
                                            {stat.title}
                                        </p>
                                        <div className="text-4xl font-black text-[#1A1A1A] tabular-nums">
                                            {stat.value}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* List Section */}
                <Card className="rounded-[2.5rem] border-[#E6E4DF]/60 shadow-xl shadow-black/[0.02] overflow-hidden bg-white">
                    <CardHeader className="bg-[#F8F9FA] border-b border-[#E6E4DF]/60 p-8 flex-row items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                                <Ticket className="w-5 h-5" />
                            </div>
                            <CardTitle className="text-2xl font-black text-[#1A1A1A] Cairo">
                                التذاكر المفتوحة والسابقة
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <DataTable
                            data={tickets}
                            columns={[
                                {
                                    header: "رقم التذكرة",
                                    cell: (item: TicketType) => (
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-sm font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10 tracking-tight uppercase">
                                                {item.id}
                                            </span>
                                        </div>
                                    )
                                },
                                {
                                    header: "الموضوع",
                                    cell: (item: TicketType) => (
                                        <div className="max-w-[300px] truncate font-bold text-[#1A1A1A] Cairo">
                                            {item.subject}
                                        </div>
                                    )
                                },
                                {
                                    header: "التاريخ",
                                    cell: (item: TicketType) => (
                                        <div className="text-[#7D7D7D] font-medium text-sm tabular-nums">
                                            {new Date(item.date).toLocaleDateString("ar-SA", { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>
                                    )
                                },
                                {
                                    header: "الحالة",
                                    cell: (item: TicketType) => (
                                        <StatusBadge status={item.status} className="bg-opacity-10 shadow-none border-none py-1 px-4 font-bold text-xs Cairo" />
                                    )
                                },
                                {
                                    header: "الإجراءات",
                                    cell: (item: TicketType) => (
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => router.push(`/support/${item.id}`)}
                                                className="h-10 px-5 text-primary hover:text-white hover:bg-primary rounded-[14px] gap-2 transition-all font-bold Cairo border border-primary/20"
                                            >
                                                <Eye className="w-4 h-4" />
                                                عرض التفاصيل
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setDeletingTicketId(item.id)}
                                                className="h-10 w-10 text-rose-500 hover:text-white hover:bg-rose-500 rounded-[14px] transition-all border border-rose-500/20 flex items-center justify-center p-0"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )
                                }
                            ]}
                            searchKey="subject"
                            searchPlaceholder="ابحث في التذاكر باسم الموضوع..."
                            filters={[
                                {
                                    column: "status",
                                    label: "تصفية حسب الحالة",
                                    options: [
                                        { label: "مكتمل", value: "مكتمل" },
                                        { label: "قيد الانتظار", value: "قيد الانتظار" }
                                    ]
                                }
                            ]}
                        />
                    </CardContent>
                </Card>

                <DeleteTicketDialog
                    isOpen={!!deletingTicketId}
                    onClose={() => setDeletingTicketId(null)}
                    onConfirm={handleDelete}
                />
            </main>
        </div>
    )
}
