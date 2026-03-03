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

import { WalletCards, Receipt, Download, FileText, Sparkles, ArrowLeft, PlusCircle, Eye } from "lucide-react"
import Link from "next/link"
import { RechargePointsDialog } from "./components/recharge-points-dialog"

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
                    <RechargePointsDialog />
                </div>



                {/* Statistics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {/* Stat Card 1 */}
                    <div className="bg-card rounded-[32px] p-6 flex items-center justify-between shadow-sm border border-border h-[120px]">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-muted-foreground">الرصيد الحالي</span>
                            <span className="text-3xl font-bold text-foreground">10 نقاط</span>
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
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm" asChild className="h-8 gap-1 text-primary hover:bg-primary/10 hover:text-primary justify-start px-2 Cairo">
                                                    <Link href={`/billing/${item.id}`}>
                                                        <Eye className="w-3.5 h-3.5" />
                                                        عرض
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground hover:bg-muted/10 justify-start px-2">
                                                    <Download className="w-3.5 h-3.5" />
                                                    <span className="text-xs">PDF</span>
                                                </Button>
                                            </div>
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
