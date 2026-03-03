"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/shared/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Clock,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Calendar,
    Download,
    Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/status-badge";

// We'll reuse the mock data for now, ideally this would come from an API
type TicketType = {
    id: string;
    subject: string;
    date: string;
    status: string;
    category: string;
    description: string;
    reply: string | null;
    image?: string;
};

const recentTickets: TicketType[] = [
    {
        id: "TKT-001",
        subject: "مشكلة في تحميل التقرير",
        date: "2026-02-24",
        status: "قيد الانتظار",
        description: "حاولت تحميل تقرير المناقصة رقم 1234 ولكن تظهر لي رسالة خطأ متعلقة بالسيرفر.",
        reply: null,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
        category: "استفسار تقني",
    },
    {
        id: "TKT-002",
        subject: "استفسار عن التحليل القانوني",
        date: "2026-02-23",
        status: "مكتمل",
        category: "استفسار عام",
        description: "هل يتضمن التحليل القانوني مراجعة شروط الضمان الابتدائي؟",
        reply: "نعم، النظام يقوم بتحليل كافة الشروط القانونية بما فيها متطلبات الضمان البنكي بأنواعه.",
    },
    {
        id: "TKT-003",
        subject: "تحديث بيانات الحساب",
        date: "2026-02-20",
        status: "مكتمل",
        category: "إدارة الحساب",
        description: "أرغب بتغيير اسم الشركة المرتبط بحسابي.",
        reply: "تم تحديث اسم الشركة بنجاح كما طلبتم.",
    },
    {
        id: "TKT-004",
        subject: "خطأ في عرض لوحة العمليات",
        date: "2026-02-18",
        status: "مكتمل",
        category: "استفسار تقني",
        description: "لا أستطيع رؤية العمليات السابقة في لوحة التحكم.",
        reply: "تم حل المشكلة وتحديث السيرفرات، يرجى إعادة تحميل الصفحة.",
    },
];

export default function TicketDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params as { id: string };

    const ticket = recentTickets.find(t => t.id === id);

    useEffect(() => {
        if (!ticket) {
            router.push("/support");
        }
    }, [ticket, router]);

    if (!ticket) {
        return (
            <div className="flex min-h-screen flex-col bg-background font-sans items-center justify-center" dir="rtl">
                <DashboardHeader />
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#E6E4DF] rounded-full mb-4"></div>
                    <div className="h-6 w-32 bg-[#E6E4DF] rounded-md"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#FDFDFD] font-sans" dir="rtl">
            <DashboardHeader />
            <main className="flex-1 p-6 md:p-10 container mx-auto max-w-5xl space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#E6E4DF]/60 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-5">
                        <Button
                            variant="outline"
                            className="h-12 w-12 p-0 rounded-2xl border-[#E6E4DF] text-[#4A4A4A] hover:bg-primary/5 hover:text-primary transition-all shadow-sm flex items-center justify-center shrink-0 border-2"
                            onClick={() => router.push("/support")}
                        >
                            <ArrowRight className="h-6 w-6" />
                        </Button>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight Cairo">تفاصيل التذكرة</h1>
                            <p className="text-[#7D7D7D] text-lg font-medium Cairo">متابعة حالة الطلب والردود المباشرة</p>
                        </div>
                    </div>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                    <Card className="rounded-[2.5rem] border-[#E6E4DF]/60 shadow-2xl shadow-black/[0.03] overflow-hidden bg-white">
                        {/* Ticket Summary Header */}
                        <div className="bg-[#F8F9FA]/50 border-b border-[#E6E4DF]/60 p-8 md:p-10">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Badge className="Cairo rounded-xl bg-primary/10 text-primary border-none px-4 py-1.5 text-xs font-black">
                                            {ticket.category}
                                        </Badge>
                                        <StatusBadge status={ticket.status} className="bg-opacity-10 shadow-none border-none py-1.5 px-4 font-black text-xs Cairo" />
                                    </div>
                                    <h2 className="text-3xl font-black text-[#1A1A1A] Cairo leading-tight">{ticket.subject}</h2>

                                    <div className="flex flex-wrap items-center gap-5 text-sm font-bold text-[#7D7D7D]">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#A0A0A0] Cairo font-bold">الرقم المرجعي:</span>
                                            <span className="font-mono text-primary bg-primary/5 px-2.5 py-0.5 rounded-lg border border-primary/10">{ticket.id}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-primary" />
                                            <span className="font-mono text-[#1A1A1A]">{new Date(ticket.date).toLocaleDateString("ar-SA", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ticket Content Body */}
                        <CardContent className="p-8 md:p-12 space-y-12">
                            {/* Problem Description Area */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] border border-[#E6E4DF] flex items-center justify-center text-primary shadow-sm">
                                        <AlertCircle className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-black text-[#1A1A1A] Cairo">وصف المشكلة</h3>
                                </div>
                                <div className="mr-8 relative">
                                    <div className="absolute top-0 -right-6 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/5 to-transparent"></div>
                                    <div className="bg-[#FDFDFD] border border-[#E6E4DF]/60 p-8 rounded-[2rem] text-[17px] leading-relaxed text-[#4A4A4A] shadow-sm Cairo font-medium relative italic">
                                        "{ticket.description}"
                                    </div>
                                    {ticket.image && (
                                        <div className="mt-8 rounded-[2rem] overflow-hidden border-2 border-[#E6E4DF] shadow-lg max-w-md group cursor-pointer transition-all hover:scale-[1.02]">
                                            <img
                                                src={ticket.image}
                                                alt="مرفق التذكرة"
                                                className="w-full h-auto object-cover max-h-[400px]"
                                                onClick={() => window.open(ticket.image, '_blank')}
                                            />
                                            <div className="p-4 bg-white border-t border-[#E6E4DF] flex items-center justify-between">
                                                <span className="text-xs font-bold text-[#7D7D7D] Cairo">مرفق الملف</span>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 rounded-lg">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Support Reply Area */}
                            {ticket.reply ? (
                                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-black text-primary Cairo">رد فريق الدعم</h3>
                                    </div>
                                    <div className="mr-8 relative">
                                        <div className="absolute top-0 -right-6 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/10 to-transparent"></div>
                                        <div className="bg-primary/5 border-2 border-primary/10 p-8 rounded-[2rem] text-[17px] leading-relaxed text-[#1A1A1A] shadow-md Cairo font-bold relative">
                                            {ticket.reply}
                                            <div className="absolute -top-3 -left-3 bg-white p-2 rounded-full border-2 border-primary/10 shadow-sm">
                                                <Sparkles className="h-4 w-4 text-primary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mr-8 p-10 bg-[#F8F9FA]/40 border-2 border-[#E6E4DF] border-dashed rounded-[2.5rem] flex flex-col items-center text-center gap-6">
                                    <div className="w-20 h-20 rounded-full bg-white border-2 border-[#E6E4DF] shadow-lg flex items-center justify-center relative overflow-hidden group">
                                        <Clock className="w-10 h-10 text-amber-500 group-hover:rotate-12 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-amber-500/5 animate-pulse"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-[#1A1A1A] font-black text-2xl Cairo">التذكرة تحت المراجعة</h4>
                                        <p className="text-[#7D7D7D] font-bold text-[16px] max-w-lg Cairo leading-relaxed">
                                            نحن نهتم بطلبك، يقوم فريقنا بمراجعة التفاصيل وسنقوم بالرد عليك في أقرب وقت عبر هذا النظام.
                                        </p>
                                    </div>
                                    <div className="w-16 h-1.5 bg-primary/10 rounded-full animate-pulse"></div>
                                </div>
                            )}
                        </CardContent>

                        {/* Footer Actions */}
                        <div className="bg-[#F8F9FA]/50 border-t border-[#E6E4DF]/60 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-3 text-sm font-bold text-[#7D7D7D] Cairo">
                                <Clock className="h-4 w-4" />
                                وقت الاستجابة المتوقع: أقل من 24 ساعة
                            </div>
                            <Button
                                className="w-full md:w-auto h-12 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black Cairo shadow-lg shadow-primary/20 transition-all hover:scale-105"
                                onClick={() => router.push("/support")}
                            >
                                العودة للقائمة
                            </Button>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}
