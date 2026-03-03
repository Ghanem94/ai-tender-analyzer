"use client"

import { MessageSquare, Clock, CheckCircle2, MoreHorizontal, Eye } from "lucide-react"
import Link from "next/link"
import { DataTable, ColumnDef } from "@/components/shared/data-table"
import { StatCard, StatCardsGrid } from "../components/stat-cards"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const tickets = [
    {
        id: "TCK-204",
        user: {
            name: "Ahmed Mohamed",
            email: "ahmed@example.com",
            avatar: null
        },
        subject: "مشكلة في تسجيل الدخول",
        status: "Open",
        priority: "High",
        date: "2024-02-14",
        category: "استفسار تقني",
        description: "لا أستطيع الدخول إلى حسابي منذ الصباح، تظهر لي رسالة خطأ في كلمة المرور رغم أنها صحيحة.",
        messages: [
            {
                role: "user",
                text: "لا أستطيع الدخول إلى حسابي منذ الصباح، تظهر لي رسالة خطأ في كلمة المرور رغم أنها صحيحة.",
                time: "10:00 ص"
            }
        ]
    },
    {
        id: "TCK-203",
        user: {
            name: "Sarah Johnson",
            email: "sarah@example.com",
            avatar: null
        },
        subject: "استفسار عن الفاتورة",
        status: "Closed",
        priority: "Low",
        date: "2024-02-13",
        category: "فواتير",
        description: "لماذا تم سحب مبلغ إضافي هذا الشهر؟",
        messages: [
            {
                role: "user",
                text: "لماذا تم سحب مبلغ إضافي هذا الشهر؟",
                time: "11:00 ص"
            }
        ]
    },
    {
        id: "TCK-202",
        user: {
            name: "Tech Corp",
            email: "contact@techcorp.com",
            avatar: null
        },
        subject: "طلب ميزة جديدة",
        status: "In Progress",
        priority: "Medium",
        date: "2024-02-12",
        category: "طلبات ميزات",
        description: "نود إضافة إمكانية تصدير التقارير بصيغة Excel.",
        messages: [
            {
                role: "user",
                text: "نود إضافة إمكانية تصدير التقارير بصيغة Excel.",
                time: "01:00 م"
            }
        ]
    },
    {
        id: "TCK-201",
        user: {
            name: "Khaled Ali",
            email: "khaled@example.com",
            avatar: null
        },
        subject: "تغيير خطة الاشتراك",
        status: "Open",
        priority: "Medium",
        date: "2024-02-11",
        category: "إدارة الحساب",
        description: "أرغب في ترقية اشتراكي إلى الباقة المتقدمة، هل يمكنني الحصول على خصم؟",
        messages: [
            {
                role: "user",
                text: "أرغب في ترقية اشتراكي إلى الباقة المتقدمة، هل يمكنني الحصول على خصم؟",
                time: "02:30 م"
            }
        ]
    },
]

type Ticket = typeof tickets[0]

export default function TicketsPage() {
    const totalTickets = tickets.length
    const openTickets = tickets.filter(t => t.status === "Open" || t.status === "In Progress").length
    const resolvedTickets = tickets.filter(t => t.status === "Closed").length

    const columns: ColumnDef<Ticket>[] = [
        {
            header: "رقم التذكرة",
            cell: (ticket) => (
                <Link href={`/admin/tickets/${ticket.id}`} className="font-medium text-primary cursor-pointer hover:underline Cairo">
                    {ticket.id}
                </Link>
            ),
        },
        {
            header: "المستخدم",
            cell: (ticket) => (
                <span className="Cairo font-bold text-foreground">{ticket.user.name}</span>
            ),
        },
        {
            header: "الموضوع",
            accessorKey: "subject",
        },
        {
            header: "الحالة",
            cell: (ticket) => (
                <Badge className={
                    ticket.status === "Open" ? "bg-red-500/15 text-red-600 hover:bg-red-500/25 border-red-500/20 Cairo" :
                        ticket.status === "Closed" ? "bg-gray-500/15 text-gray-600 hover:bg-gray-500/25 border-gray-500/20 Cairo" :
                            "bg-blue-500/15 text-blue-600 hover:bg-blue-500/25 border-blue-500/20 Cairo"
                }>
                    {ticket.status === "Open" ? "مفتوحة" : ticket.status === "Closed" ? "مغلقة" : "جاري العمل"}
                </Badge>
            ),
        },
        {
            header: "الأولوية",
            cell: (ticket) => (
                <Badge variant="outline" className={`rounded-md border Cairo ${ticket.priority === "High" ? "border-red-500/30 text-red-500 bg-red-500/5" :
                    ticket.priority === "Medium" ? "border-yellow-500/30 text-yellow-500 bg-yellow-500/5" :
                        "border-green-500/30 text-green-500 bg-green-500/5"
                    }`}>
                    {ticket.priority === "High" ? "عالية" : ticket.priority === "Medium" ? "متوسطة" : "منخفضة"}
                </Badge>
            ),
        },
        {
            header: "التاريخ",
            accessorKey: "date",
        },
        {
            header: "إجراءات",
            cell: (ticket) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild className="h-8 px-3 text-primary hover:text-primary hover:bg-primary/10 rounded-lg gap-1.5 transition-colors Cairo">
                        <Link href={`/admin/tickets/${ticket.id}`}>
                            <Eye className="w-4 h-4" />
                            عرض
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ]

    return (
        <div className="space-y-6" dir="rtl">
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground Cairo">الدعم الفني</h3>
                <p className="text-muted-foreground mt-1 Cairo">
                    متابعة ومعالجة تذاكر الدعم والشكاوى المقدمة.
                </p>
            </div>

            <StatCardsGrid>
                <StatCard
                    title="إجمالي التذاكر"
                    value={totalTickets}
                    icon={MessageSquare}
                    iconClassName="bg-blue-500/10 text-blue-500"
                    description="كافة التذاكر المسجلة"
                />
                <StatCard
                    title="التذاكر المفتوحة"
                    value={openTickets}
                    icon={Clock}
                    iconClassName="bg-amber-500/10 text-amber-500"
                    description="تذاكر بانتظار المعالجة"
                />
                <StatCard
                    title="تمت معالجتها"
                    value={resolvedTickets}
                    icon={CheckCircle2}
                    iconClassName="bg-emerald-500/10 text-emerald-500"
                    description="تذاكر مكتملة ومغلقة"
                />
            </StatCardsGrid>

            <DataTable
                data={tickets}
                columns={columns}
                searchKey="subject"
                searchPlaceholder="البحث في موضوع التذكرة..."
                filters={[
                    {
                        column: "status",
                        label: "الحالة",
                        options: [
                            { label: "مفتوحة", value: "Open" },
                            { label: "جاري العمل", value: "In Progress" },
                            { label: "مغلقة", value: "Closed" },
                        ]
                    },
                    {
                        column: "priority",
                        label: "الأولوية",
                        options: [
                            { label: "عالية", value: "High" },
                            { label: "متوسطة", value: "Medium" },
                            { label: "منخفضة", value: "Low" },
                        ]
                    }
                ]}
            />
        </div>
    )
}
