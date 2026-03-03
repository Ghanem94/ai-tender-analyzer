"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
    ArrowRight,
    AlertCircle,
    Clock,
    CheckCircle2,
    Send,
    User,
    ShieldCheck,
    MessageSquare,
    MoreVertical,
    Trash2,
    Ban
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import { tickets } from "../page"

export default function AdminTicketDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [ticket, setTicket] = useState<any>(null)
    const [reply, setReply] = useState("")
    const [isSending, setIsSending] = useState(false)

    useEffect(() => {
        const foundTicket = tickets.find(t => t.id === params.id)
        if (foundTicket) {
            setTicket(foundTicket)
        }
    }, [params.id])

    if (!ticket) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <p className="text-muted-foreground Cairo">جاري تحميل بيانات التذكرة...</p>
            </div>
        )
    }

    const handleSendReply = () => {
        if (!reply.trim()) return
        setIsSending(true)
        // Simulate sending
        setTimeout(() => {
            const newMessage = {
                role: "admin",
                text: reply,
                time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })
            }
            setTicket({
                ...ticket,
                messages: [...ticket.messages, newMessage]
            })
            setReply("")
            setIsSending(false)
        }, 1000)
    }

    return (
        <div className="space-y-6 pb-10" dir="rtl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="rounded-full hover:bg-primary/5 transition-all"
                    >
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-extrabold tracking-tight Cairo text-foreground">تفاصيل التذكرة</h2>
                            <Badge variant="outline" className="font-mono text-xs py-0.5">#{ticket.id}</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm Cairo mt-0.5">{ticket.subject}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <DropdownMenu dir="rtl">
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="rounded-xl Cairo gap-2 border-border/50">
                                {ticket.status === "Open" ? "مفتوحة" : ticket.status === "Closed" ? "مغلقة" : "جاري العمل"}
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl Cairo min-w-[150px]">
                            <DropdownMenuItem onSelect={() => setTicket({ ...ticket, status: "Open" })} className="gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                مفتوحة
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setTicket({ ...ticket, status: "In Progress" })} className="gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                جاري العمل
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setTicket({ ...ticket, status: "Closed" })} className="gap-2">
                                <div className="w-2 h-2 rounded-full bg-gray-500" />
                                مغلقة
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="outline" size="icon" className="rounded-xl border-border/50 text-destructive hover:bg-destructive/5">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content: Chat/Messages */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="rounded-[24px] border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col h-[600px]">
                        <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
                            <CardTitle className="text-lg font-bold Cairo flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-primary" />
                                سجل المحادثة
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            {ticket.messages.map((msg: any, idx: number) => (
                                <div key={idx} className={cn(
                                    "flex flex-col max-w-[85%] space-y-2",
                                    msg.role === "admin" ? "mr-auto items-start" : "ml-auto items-end"
                                )}>
                                    <div className={cn(
                                        "px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm",
                                        msg.role === "admin"
                                            ? "bg-primary text-primary-foreground rounded-tr-none"
                                            : "bg-muted text-foreground rounded-tl-none border border-border/30"
                                    )}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-mono px-2">{msg.time}</span>
                                </div>
                            ))}
                        </CardContent>

                        <div className="p-4 bg-muted/30 border-t border-border/40">
                            <div className="relative group">
                                <Textarea
                                    placeholder="اكتب ردك هنا..."
                                    className="min-h-[100px] rounded-2xl border-border/50 focus-visible:ring-primary Cairo resize-none pr-4 pl-12 bg-background"
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                />
                                <Button
                                    size="icon"
                                    className="absolute left-3 bottom-3 rounded-xl shadow-lg hover:scale-105 transition-all"
                                    onClick={handleSendReply}
                                    disabled={!reply.trim() || isSending}
                                >
                                    {isSending ? <Clock className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 rtl:rotate-180" />}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar: User Info & Meta */}
                <div className="space-y-6">
                    <Card className="rounded-[24px] border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-muted-foreground Cairo uppercase tracking-wider">بيانات صاحب التذكرة</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4 p-3 rounded-2xl bg-muted/20 border border-border/30">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                    <User className="h-6 w-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-foreground Cairo truncate">{ticket.user.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{ticket.user.email}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-muted-foreground Cairo uppercase">الأولوية</p>
                                    <Badge variant="outline" className={cn(
                                        "Cairo font-bold",
                                        ticket.priority === "High" ? "text-red-500 border-red-500/20 bg-red-500/5" : "text-amber-500 border-amber-500/20 bg-amber-500/5"
                                    )}>
                                        {ticket.priority === "High" ? "عالية" : "متوسطة"}
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-muted-foreground Cairo uppercase">القسم</p>
                                    <p className="text-sm font-bold text-foreground Cairo">{ticket.category}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-muted-foreground Cairo uppercase">تاريخ الإنشاء</p>
                                    <p className="text-sm font-bold text-foreground Cairo font-mono">{ticket.date}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-muted-foreground Cairo uppercase">الرد الأخير</p>
                                    <p className="text-sm font-bold text-foreground Cairo">منذ ساعة</p>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2 border-t border-border/40">
                                <Button variant="secondary" className="flex-1 rounded-xl Cairo text-xs h-9 gap-2">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    تغيير القسم
                                </Button>
                                <Button variant="secondary" className=" rounded-xl Cairo text-xs h-9 text-rose-500 hover:text-rose-600">
                                    <Ban className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[24px] border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                        <CardHeader className="pb-2 bg-muted/20 border-b border-border/40">
                            <CardTitle className="text-xs font-bold text-muted-foreground Cairo text-center">الإجراءات السريعة</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                            <Button variant="ghost" className="w-full justify-start rounded-xl Cairo text-sm h-10 hover:bg-primary/5">إرسال تنبيه للمستخدم</Button>
                            <Button variant="ghost" className="w-full justify-start rounded-xl Cairo text-sm h-10 hover:bg-primary/5">طلب معلومات إضافية</Button>
                            <Button variant="ghost" className="w-full justify-start rounded-xl Cairo text-sm h-10 hover:bg-emerald-500/5 text-emerald-600">حل وإغلاق فوري</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
