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

export interface TicketData {
    id: string
    user: string
    subject: string
    status: string
    priority: string
    date: string
}

interface TicketsTableProps {
    tickets: TicketData[]
}

/**
 * Renders the support tickets data table in the admin dashboard.
 * 
 * It manages the customized badge styling based on ticket status and priority.
 */
export function TicketsTable({ tickets }: TicketsTableProps) {
    return (
        <div className="rounded-[24px] border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow className="border-border/50 hover:bg-transparent">
                        <TableHead className="w-[120px] text-right font-bold">رقم التذكرة</TableHead>
                        <TableHead className="text-right font-bold">المستخدم</TableHead>
                        <TableHead className="text-right font-bold">الموضوع</TableHead>
                        <TableHead className="text-right font-bold">الحالة</TableHead>
                        <TableHead className="text-right font-bold">الأولوية</TableHead>
                        <TableHead className="text-right font-bold">التاريخ</TableHead>
                        <TableHead className="text-right font-bold w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets.map((ticket) => (
                        <TableRow key={ticket.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                            <TableCell className="font-medium text-primary cursor-pointer hover:underline">{ticket.id}</TableCell>
                            <TableCell className="font-medium">{ticket.user}</TableCell>
                            <TableCell className="text-muted-foreground">{ticket.subject}</TableCell>
                            <TableCell>
                                <Badge className={
                                    ticket.status === "Open" ? "bg-red-500/15 text-red-600 hover:bg-red-500/25 border-red-500/20" :
                                        ticket.status === "Closed" ? "bg-gray-500/15 text-gray-600 hover:bg-gray-500/25 border-gray-500/20" :
                                            "bg-blue-500/15 text-blue-600 hover:bg-blue-500/25 border-blue-500/20"
                                }>
                                    {ticket.status === "Open" ? "مفتوحة" : ticket.status === "Closed" ? "مغلقة" : "جاري العمل"}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className={`rounded-md border ${ticket.priority === "High" ? "border-red-500/30 text-red-500 bg-red-500/5" :
                                    ticket.priority === "Medium" ? "border-yellow-500/30 text-yellow-500 bg-yellow-500/5" :
                                        "border-green-500/30 text-green-500 bg-green-500/5"
                                    }`}>
                                    {ticket.priority === "High" ? "عالية" : ticket.priority === "Medium" ? "متوسطة" : "منخفضة"}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{ticket.date}</TableCell>
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
