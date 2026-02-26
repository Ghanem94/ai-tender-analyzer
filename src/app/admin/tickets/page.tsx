import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { TicketsTable, TicketData } from "./components/tickets-table"

const tickets = [
    {
        id: "TCK-204",
        user: "Ahmed Mohamed",
        subject: "مشكلة في تسجيل الدخول",
        status: "Open",
        priority: "High",
        date: "2024-02-14",
    },
    {
        id: "TCK-203",
        user: "Sarah Johnson",
        subject: "استفسار عن الفاتورة",
        status: "Closed",
        priority: "Low",
        date: "2024-02-13",
    },
    {
        id: "TCK-202",
        user: "Tech Corp",
        subject: "طلب ميزة جديدة",
        status: "In Progress",
        priority: "Medium",
        date: "2024-02-12",
    },
    {
        id: "TCK-201",
        user: "Khaled Ali",
        subject: "تغيير خطة الاشتراك",
        status: "Open",
        priority: "Medium",
        date: "2024-02-11",
    },
]

export default function TicketsPage() {
    return (
        <div className="space-y-6 p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">الدعم الفني</h3>
                    <p className="text-muted-foreground mt-1">
                        متابعة ومعالجة تذاكر الدعم والشكاوى المقدمة.
                    </p>
                </div>
                <Button variant="outline" className="gap-2 rounded-xl">
                    <Filter className="h-4 w-4" />
                    تصفية التذاكر
                </Button>
            </div>

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
        </div>
    )
}
