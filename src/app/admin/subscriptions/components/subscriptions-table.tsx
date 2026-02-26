"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

export interface SubscriptionData {
    id: string
    user: string
    plan: string
    status: string
    date: string
    amount: string
}

interface SubscriptionsTableProps {
    subscriptions: SubscriptionData[]
}

/**
 * Renders the subscriptions data table in the admin dashboard.
 * 
 * It manages the visual formatting of subscription plans and payment statuses.
 */
export function SubscriptionsTable({ subscriptions }: SubscriptionsTableProps) {
    return (
        <div className="rounded-[24px] border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow className="border-border/50 hover:bg-transparent">
                        <TableHead className="w-[120px] text-right font-bold">رقم الاشتراك</TableHead>
                        <TableHead className="text-right font-bold">المستخدم</TableHead>
                        <TableHead className="text-right font-bold">الخطة</TableHead>
                        <TableHead className="text-right font-bold">الحالة</TableHead>
                        <TableHead className="text-right font-bold">التاريخ</TableHead>
                        <TableHead className="text-right font-bold">المبلغ</TableHead>
                        <TableHead className="text-right font-bold w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subscriptions.map((sub) => (
                        <TableRow key={sub.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                            <TableCell className="font-medium text-primary cursor-pointer hover:underline">{sub.id}</TableCell>
                            <TableCell className="font-medium">{sub.user}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className="rounded-md border-primary/20 bg-primary/5 text-primary">
                                    {sub.plan}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className={
                                    sub.status === "Active" ? "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/20" :
                                        sub.status === "Pending" ? "bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25 border-yellow-500/20" :
                                            "bg-red-500/15 text-red-600 hover:bg-red-500/25 border-red-500/20"
                                }>
                                    {sub.status === "Active" ? "نشط" : sub.status === "Pending" ? "معلق" : "ملغى"}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{sub.date}</TableCell>
                            <TableCell className="font-bold">{sub.amount}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
