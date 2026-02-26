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
                        <CreateTicketDialog />
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
                            <DataTable
                                data={tickets}
                                columns={[
                                    {
                                        header: "رقم التذكرة",
                                        cell: (item: TicketType) => <span className="font-mono text-sm font-bold text-[#1A1A1A]">{item.id}</span>
                                    },
                                    { header: "الموضوع", accessorKey: "subject" },
                                    { header: "التاريخ", accessorKey: "date" },
                                    {
                                        header: "الحالة",
                                        cell: (item: TicketType) => <StatusBadge status={item.status} className="bg-opacity-10 shadow-none" />
                                    },
                                    {
                                        header: "إجراءات",
                                        cell: (item: TicketType) => (
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => router.push(`/support/${item.id}`)}
                                                    className="h-8 px-3 text-[#9A8D59] hover:text-[#8A7D49] hover:bg-[#9A8D59]/10 rounded-lg gap-1.5 transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span className="text-xs font-bold w-full text-right">عرض</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setDeletingTicketId(item.id)}
                                                    className="h-8 px-3 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg gap-1.5 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    <span className="text-xs font-bold w-full text-right">حذف</span>
                                                </Button>
                                            </div>
                                        )
                                    }
                                ]}
                                searchKey="subject"
                                searchPlaceholder="ابحث في التذاكر..."
                                filters={[
                                    {
                                        column: "status",
                                        label: "الحالة",
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
                </div>
            </main>
        </div>
    )
}
