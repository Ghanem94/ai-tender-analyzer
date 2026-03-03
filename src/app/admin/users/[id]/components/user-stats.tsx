"use client"

import { Coins, Zap, CreditCard, PlusCircle } from "lucide-react"
import { StatCard, StatCardsGrid } from "../../../components/stat-cards"
import { Button } from "@/components/ui/button"

interface UserStatsProps {
    totalPoints: number
    consumedPoints: number
    totalPayments: number
}

export function UserStats({ totalPoints, consumedPoints, totalPayments }: UserStatsProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold Cairo">ملخص الرصيد والنشاط</h2>
                <Button variant="ghost" className="text-primary hover:bg-primary/10 gap-2 rounded-xl Cairo font-semibold">
                    <PlusCircle className="h-4 w-4" />
                    إضافة نقاط يدوياً
                </Button>
            </div>

            <StatCardsGrid>
                <StatCard
                    title="إجمالي النقاط"
                    value={totalPoints}
                    icon={Coins}
                    iconClassName="bg-amber-500/10 text-amber-500"
                    description="الرصيد المتاح حالياً"
                />
                <StatCard
                    title="النقاط المستهلكة"
                    value={consumedPoints}
                    icon={Zap}
                    iconClassName="bg-blue-500/10 text-blue-500"
                    description="إجمالي النقاط المستخدمة"
                />
                <StatCard
                    title="إجمالي المدفوعات"
                    value={`${totalPayments.toLocaleString()} ر.س`}
                    icon={CreditCard}
                    iconClassName="bg-emerald-500/10 text-emerald-500"
                    description="إجمالي مبالغ الشحن"
                />
            </StatCardsGrid>
        </div>
    )
}
