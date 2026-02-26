"use client"


import { DashboardHeader } from "@/components/shared/dashboard-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DataTable, ColumnDef } from "@/components/shared/data-table"
import { StatusBadge } from "@/components/shared/status-badge"

import { WalletCards, Receipt, Download, FileText, Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock Data for Transactions
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
        amount: "-",
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


export default function BillingPage() {

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans" dir="rtl">
            <DashboardHeader />
            <main className="flex-1 p-8 container mx-auto space-y-8 max-w-7xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-2">الفواتير والرصيد</h1>
                        <p className="text-[#7D7D7D] text-lg">إدارة رصيدك من الملفات وعرض سجل العمليات والمدفوعات</p>
                    </div>
                </div>

                {/* Current Plan & Quota Section */}
                <div className="bg-gradient-to-l from-[#1A1A1A] to-[#2A2A2A] rounded-[2rem] p-8 text-white shadow-lg relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#9A8D59] opacity-10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9A8D59] to-[#b3a46a] flex items-center justify-center shrink-0 shadow-inner">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[#A0A0A0] text-sm font-medium">الباقة الحالية</p>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-bold tracking-tight">الباقة الاحترافية (Pro)</h2>
                                    <Badge className="bg-[#9A8D59]/20 text-[#D4C485] hover:bg-[#9A8D59]/30 border-none px-3 font-bold transition-colors">
                                        نشطة
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                            <div className="flex flex-col items-center md:items-end justify-center w-full md:w-auto p-4 md:p-0 bg-white/5 md:bg-transparent rounded-2xl md:rounded-none border border-white/10 md:border-none">
                                <span className="text-sm text-[#A0A0A0] mb-1">الرصيد المتاح من الملفات</span>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-4xl font-extrabold text-[#D4C485]">10</span>
                                    <span className="text-lg font-medium text-white/80">/ 50 ملف</span>
                                </div>
                            </div>

                            <div className="w-full h-px md:w-px md:h-12 bg-white/10 hidden md:block"></div>

                            <Button asChild className="w-full md:w-auto rounded-xl gap-2 h-14 bg-[#9A8D59] hover:bg-[#8A7D49] text-white px-8 text-base font-bold shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 border-none">
                                <Link href="/pricing">
                                    شحن رصيد إضافي
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Statistics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {/* Stat Card 1 */}
                    <div className="bg-card rounded-[32px] p-6 flex items-center justify-between shadow-sm border border-border h-[120px]">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-muted-foreground">الرصيد الحالي</span>
                            <span className="text-3xl font-bold text-foreground">10 ملفات</span>
                        </div>
                        <div className="p-3 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <WalletCards className="w-6 h-6" />
                        </div>
                    </div>
                    {/* Stat Card 2 */}
                    <div className="bg-card rounded-[32px] p-6 flex items-center justify-between shadow-sm border border-border h-[120px]">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-muted-foreground">الاستهلاك هذا الشهر</span>
                            <span className="text-3xl font-bold text-foreground">2 ملف</span>
                        </div>
                        <div className="p-3 rounded-full bg-blue-600 text-white flex items-center justify-center">
                            <FileText className="w-6 h-6" />
                        </div>
                    </div>
                    {/* Stat Card 3 */}
                    <div className="bg-card rounded-[32px] p-6 flex items-center justify-between shadow-sm border border-border h-[120px]">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-muted-foreground">إجمالي المدفوعات</span>
                            <span className="text-3xl font-bold text-foreground">50 ريال</span>
                        </div>
                        <div className="p-3 rounded-full bg-yellow-500 text-white flex items-center justify-center">
                            <Receipt className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* List Section */}
                <Card className="rounded-[2rem] border-[#E6E4DF]/50 shadow-sm overflow-hidden bg-card">
                    <CardHeader className="bg-[#F8F9FA] border-b border-[#E6E4DF]/50 p-6">
                        <CardTitle className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
                            <Receipt className="w-5 h-5 text-primary" />
                            سجل العمليات والمدفوعات
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <DataTable
                                data={transactions}
                                columns={[
                                    { header: "التاريخ", accessorKey: "date" },
                                    { header: "الوصف", accessorKey: "description" },
                                    {
                                        header: "المبلغ",
                                        cell: (item) => <span className="font-mono font-bold text-[#1A1A1A]">{item.amount}</span>
                                    },
                                    {
                                        header: "الرصيد",
                                        cell: (item) => (
                                            <Badge variant="outline" className={item.credit.startsWith('+') ? "bg-emerald-500/10 text-emerald-500 border-none px-3" : "bg-gray-100 text-gray-500 border-none px-3"}>
                                                {item.credit}
                                            </Badge>
                                        )
                                    },
                                    {
                                        header: "الحالة",
                                        cell: (item) => <StatusBadge status={item.status} className="bg-opacity-10 shadow-none px-3" />
                                    },
                                    {
                                        header: "الفاتورة",
                                        cell: (item) => item.amount !== "-" ? (
                                            <Button variant="ghost" size="sm" className="h-8 gap-1 text-primary hover:bg-primary/10 hover:text-primary justify-start px-2">
                                                <Download className="w-3.5 h-3.5" />
                                                <span className="text-xs">PDF</span>
                                            </Button>
                                        ) : (
                                            <span className="text-xs text-muted-foreground px-4">-</span>
                                        )
                                    }
                                ]}
                                searchKey="description"
                                searchPlaceholder="ابحث في العمليات..."
                                filters={[
                                    {
                                        column: "status",
                                        label: "الحالة",
                                        options: [
                                            { label: "مكتمل", value: "مكتمل" },
                                            { label: "معلق", value: "معلق" }
                                        ]
                                    }
                                ]}
                            />
                        </div>
                    </CardContent>
                </Card>
            </main >
        </div >
    )
}
