"use client"

import { Download, CheckCircle2, XCircle, Clock, Eye } from "lucide-react"
import Link from "next/link"
import { DataTable, ColumnDef } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Invoice {
    id: string
    userId: string
    amount: number
    status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
    createdAt: string
    user: {
        email: string
    }
}

interface InvoicesTableProps {
    invoices: Invoice[]
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
    const columns: ColumnDef<Invoice>[] = [
        {
            header: "رقم الفاتورة",
            cell: (invoice) => (
                <Link href={`/admin/invoices/${invoice.id}`} className="font-mono text-xs text-primary hover:underline uppercase">
                    #{invoice.id.slice(-8)}
                </Link>
            ),
        },
        {
            header: "العميل",
            cell: (invoice) => (
                <span className="font-bold text-foreground Cairo">{invoice.user.email}</span>
            ),
        },
        {
            header: "النقاط",
            cell: (invoice) => (
                <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black text-primary">{Math.floor(invoice.amount / 10)}</span>
                    <span className="text-[10px] font-bold text-muted-foreground Cairo">نقطة</span>
                </div>
            ),
        },
        {
            header: "المبلغ",
            cell: (invoice) => (
                <div className="text-lg font-extrabold text-foreground Cairo">
                    {invoice.amount.toLocaleString()} <span className="text-xs font-medium text-muted-foreground">ر.س</span>
                </div>
            ),
        },
        {
            header: "التاريخ",
            cell: (invoice) => (
                <span className="Cairo text-muted-foreground font-medium">
                    {new Date(invoice.createdAt).toLocaleDateString("ar-SA", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    })}
                </span>
            ),
        },
        {
            header: "الحالة",
            cell: (invoice) => (
                <>
                    {invoice.status === "COMPLETED" && (
                        <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 border-emerald-500/20 px-3 py-1 rounded-full gap-1.5 Cairo">
                            <CheckCircle2 className="h-3 w-3" />
                            مدفوعة
                        </Badge>
                    )}
                    {invoice.status === "PENDING" && (
                        <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/15 border-amber-500/20 px-3 py-1 rounded-full gap-1.5 Cairo">
                            <Clock className="h-3 w-3" />
                            معلقة
                        </Badge>
                    )}
                    {(invoice.status === "FAILED" || invoice.status === "REFUNDED") && (
                        <Badge className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/15 border-rose-500/20 px-3 py-1 rounded-full gap-1.5 Cairo">
                            <XCircle className="h-3 w-3" />
                            ملغاة
                        </Badge>
                    )}
                </>
            ),
        },
        {
            header: "إجراءات",
            cell: (invoice) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-8 px-3 text-primary hover:text-primary hover:bg-primary/10 rounded-lg gap-1.5 transition-colors Cairo"
                    >
                        <Link href={`/admin/invoices/${invoice.id}`}>
                            <Eye className="w-4 h-4" />
                            عرض
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-xl gap-2 hover:bg-muted/30 transition-all Cairo"
                    >
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ]

    return (
        <DataTable
            data={invoices}
            columns={columns}
            searchKey="user.email" // DataTable supports nested keys if implemented? Wait, DataTable logic for nested keys?
            // Let's check DataTable again.
            searchPlaceholder="البحث بالبريد الإلكتروني..."
            filters={[
                {
                    column: "status",
                    label: "الحالة",
                    options: [
                        { label: "مدفوعة", value: "COMPLETED" },
                        { label: "معلقة", value: "PENDING" },
                        { label: "ملغاة", value: "FAILED" },
                        { label: "مسترجع", value: "REFUNDED" },
                    ]
                }
            ]}
        />
    )
}
