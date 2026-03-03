"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText, Wallet, Activity as ActivityIcon, CheckCircle2, Clock, XCircle } from "lucide-react"
import { DataTable, ColumnDef } from "@/components/shared/data-table"

interface InfoTabsProps {
    payments: any[]
    analyses: any[]
}

export function InfoTabs({ payments, analyses }: InfoTabsProps) {
    // Columns for Recharge History
    const rechargeColumns: ColumnDef<any>[] = [
        {
            header: "التاريخ",
            cell: (p) => (
                <span className="Cairo text-muted-foreground font-medium">
                    {new Date(p.createdAt).toLocaleDateString("ar-SA", { day: "numeric", month: "long", year: "numeric" })}
                </span>
            ),
        },
        {
            header: "الحالة",
            cell: (p) => (
                <Badge className={
                    p.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 Cairo" :
                        p.status === "PENDING" ? "bg-amber-500/10 text-amber-600 border-amber-500/20 Cairo" :
                            "bg-rose-500/10 text-rose-600 border-rose-500/20 Cairo"
                }>
                    {p.status === "COMPLETED" ? "ناجحة" : p.status === "PENDING" ? "معلقة" : "فاشلة"}
                </Badge>
            ),
        },
        {
            header: "المبلغ",
            cell: (p) => <span className="Cairo font-bold text-foreground">{p.amount} ر.س</span>,
        },
        {
            header: "النقاط المضافة",
            cell: (p) => <span className="Cairo font-bold text-primary">+{Math.floor(p.amount / 10)}</span>,
        },
    ]

    // Columns for Invoices
    const invoiceColumns: ColumnDef<any>[] = [
        {
            header: "رقم الفاتورة",
            cell: (p) => <span className="Cairo font-mono text-xs uppercase text-muted-foreground">#{p.id.slice(-8)}</span>,
        },
        {
            header: "التاريخ",
            cell: (p) => (
                <span className="Cairo text-muted-foreground">
                    {new Date(p.createdAt).toLocaleDateString("ar-SA", { day: "numeric", month: "long", year: "numeric" })}
                </span>
            ),
        },
        {
            header: "المبلغ",
            cell: (p) => <span className="Cairo font-bold text-foreground">{p.amount} ر.س</span>,
        },
        {
            header: "إجراءات",
            cell: () => (
                <Button variant="ghost" size="sm" className="Cairo gap-2 rounded-xl text-primary hover:bg-primary/10">
                    <Download className="h-4 w-4" />
                    تحميل PDF
                </Button>
            ),
        },
    ]

    // Columns for Activity
    const activityColumns: ColumnDef<any>[] = [
        {
            header: "الملف",
            cell: (a) => (
                <div className="Cairo font-medium max-w-[200px] truncate text-foreground" title={a.fileName}>
                    {a.fileName}
                </div>
            ),
        },
        {
            header: "التاريخ",
            cell: (a) => (
                <span className="Cairo text-muted-foreground text-sm">
                    {new Date(a.createdAt).toLocaleString("ar-SA", { day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
            ),
        },
        {
            header: "الحالة",
            cell: (a) => (
                <Badge className={
                    a.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 Cairo" :
                        a.status === "FAILED" ? "bg-rose-500/10 text-rose-600 border-rose-500/20 Cairo" :
                            "bg-blue-500/10 text-blue-600 border-blue-500/20 Cairo"
                }>
                    {a.status === "COMPLETED" ? "مكتمل" : a.status === "FAILED" ? "فشل" : "قيد المعالجة"}
                </Badge>
            ),
        },
        {
            header: "النقاط المخصومة",
            cell: () => <span className="Cairo font-bold text-rose-600">-1</span>,
        },
    ]

    return (
        <Tabs defaultValue="recharge" className="w-full" dir="rtl">
            <div className="flex justify-start mb-6" dir="rtl">
                <TabsList className="bg-muted/50 p-1 rounded-2xl grid grid-cols-3 w-full md:w-[600px]" dir="rtl">
                    <TabsTrigger value="recharge" className="rounded-xl Cairo gap-2 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm justify-center">
                        <Wallet className="h-4 w-4" />
                        سجل الشحن
                    </TabsTrigger>
                    <TabsTrigger value="invoices" className="rounded-xl Cairo gap-2 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm justify-center">
                        <FileText className="h-4 w-4" />
                        الفواتير
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="rounded-xl Cairo gap-2 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm justify-center">
                        <ActivityIcon className="h-4 w-4" />
                        سجل العمليات
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="recharge" className="space-y-4" dir="rtl">
                <DataTable
                    data={payments}
                    columns={rechargeColumns}
                    emptyMessage="لا يوجد سجل شحن متاح"
                    itemsPerPage={5}
                />
            </TabsContent>

            <TabsContent value="invoices" className="space-y-4" dir="rtl">
                <DataTable
                    data={payments.filter(p => p.status === "COMPLETED")}
                    columns={invoiceColumns}
                    emptyMessage="لا توجد فواتير متاحة"
                    itemsPerPage={5}
                />
            </TabsContent>

            <TabsContent value="activity" className="space-y-4" dir="rtl">
                <DataTable
                    data={analyses}
                    columns={activityColumns}
                    emptyMessage="لا يوجد سجل عمليات متاح"
                    itemsPerPage={10}
                />
            </TabsContent>
        </Tabs>
    )
}
