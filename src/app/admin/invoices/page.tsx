"use client"

import { useEffect, useState } from "react"
import { Loader2, Search, Filter, DollarSign, CreditCard, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { StatCard, StatCardsGrid } from "../components/stat-cards"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { InvoicesTable } from "./components/invoices-table"


export const mockInvoices = [
    {
        id: "INV-2024-001",
        userId: "user_1",
        amount: 500,
        status: "COMPLETED",
        createdAt: "2024-02-28T10:00:00Z",
        user: { email: "ahmed@example.com" }
    },
    {
        id: "INV-2024-002",
        userId: "user_2",
        amount: 1500,
        status: "COMPLETED",
        createdAt: "2024-02-27T14:30:00Z",
        user: { email: "sarah@example.com" }
    },
    {
        id: "INV-2024-003",
        userId: "user_3",
        amount: 250,
        status: "PENDING",
        createdAt: "2024-02-26T09:15:00Z",
        user: { email: "khaled@example.com" }
    },
    {
        id: "INV-2024-004",
        userId: "user_4",
        amount: 1000,
        status: "FAILED",
        createdAt: "2024-02-25T16:45:00Z",
        user: { email: "nora@example.com" }
    },
    {
        id: "INV-2024-005",
        userId: "user_5",
        amount: 750,
        status: "COMPLETED",
        createdAt: "2024-02-24T11:20:00Z",
        user: { email: "faisal@example.com" }
    },
    {
        id: "INV-2024-006",
        userId: "user_6",
        amount: 300,
        status: "REFUNDED",
        createdAt: "2024-02-23T13:10:00Z",
        user: { email: "laila@example.com" }
    }
]

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<any[]>(mockInvoices)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // fetchInvoices() // Using mock data for now
    }, [])

    // Calculate Stats
    const totalRevenue = invoices
        .filter(inv => inv.status === "COMPLETED")
        .reduce((sum, inv) => sum + inv.amount, 0)

    const paidCount = invoices.filter(inv => inv.status === "COMPLETED").length
    const cancelledCount = invoices.filter(inv => inv.status === "FAILED" || inv.status === "REFUNDED").length

    async function fetchInvoices() {
        // Keep for future real implementation
        setIsLoading(true)
        try {
            const response = await fetch("/api/admin/invoices")
            if (response.ok) {
                const data = await response.json()
                setInvoices(data)
            }
        } catch (error) {
            console.error("Failed to fetch invoices", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-6" dir="rtl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground Cairo">إدارة الفواتير</h1>
                <p className="text-muted-foreground mt-1 Cairo">
                    متابعة عمليات الدفع وإصدار الفواتير للعملاء
                </p>
            </div>

            <StatCardsGrid>
                <StatCard
                    title="إجمالي الإيرادات"
                    value={`${totalRevenue.toLocaleString()} ر.س`}
                    icon={DollarSign}
                    iconClassName="bg-emerald-500/10 text-emerald-500"
                    description="صافي الإيرادات المحصلة"
                />
                <StatCard
                    title="الفواتير المدفوعة"
                    value={paidCount}
                    icon={CreditCard}
                    iconClassName="bg-blue-500/10 text-blue-500"
                    description="عمليات دفع ناجحة"
                />
                <StatCard
                    title="الفواتير الملغاة"
                    value={cancelledCount}
                    icon={XCircle}
                    iconClassName="bg-rose-500/10 text-rose-500"
                    description="عمليات ملغاة أو فاشلة"
                />
            </StatCardsGrid>

            <InvoicesTable invoices={invoices} />
        </div>
    )
}


