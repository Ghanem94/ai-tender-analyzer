"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/shared/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { getStatusBadge } from "../page";

// We'll reuse the mock data for now, ideally this would come from an API
type TicketType = {
    id: string;
    subject: string;
    date: string;
    status: string;
    category: string;
    description: string;
    reply: string | null;
};

const recentTickets: TicketType[] = [
    {
        id: "TKT-001",
        subject: "مشكلة في تحميل التقرير",
        date: "2026-02-24",
        status: "قيد الانتظار",
        category: "استفسار تقني",
        description: "حاولت تحميل تقرير المناقصة رقم 1234 ولكن تظهر لي رسالة خطأ متعلقة بالسيرفر.",
        reply: null
    },
    {
        id: "TKT-002",
        subject: "استفسار عن التحليل القانوني",
        date: "2026-02-23",
        status: "مكتمل",
        category: "استفسار عام",
        description: "هل يتضمن التحليل القانوني مراجعة شروط الضمان الابتدائي؟",
        reply: "نعم، النظام يقوم بتحليل كافة الشروط القانونية بما فيها متطلبات الضمان البنكي بأنواعه."
    },
    {
        id: "TKT-003",
        subject: "تحديث بيانات الحساب",
        date: "2026-02-20",
        status: "مكتمل",
        category: "إدارة الحساب",
        description: "أرغب بتغيير اسم الشركة المرتبط بحسابي.",
        reply: "تم تحديث اسم الشركة بنجاح كما طلبتم."
    },
    {
        id: "TKT-004",
        subject: "خطأ في عرض لوحة العمليات",
        date: "2026-02-18",
        status: "مكتمل",
        category: "استفسار تقني",
        description: "لا أستطيع رؤية العمليات السابقة في لوحة التحكم.",
        reply: "تم حل المشكلة وتحديث السيرفرات، يرجى إعادة تحميل الصفحة."
    },
];


export default function TicketDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params as { id: string };

    const ticket = recentTickets.find(t => t.id === id);

    useEffect(() => {
        if (!ticket) {
            // Handle not found (could redirect back to /support)
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
        <div className="flex min-h-screen flex-col bg-background font-sans" dir="rtl">
            <DashboardHeader />
            <main className="flex-1 p-4 md:p-8 container mx-auto max-w-7xl">
                <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Header & Actions */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E6E4DF]/50">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                className="h-11 w-11 p-0 rounded-xl border-[#E6E4DF] text-[#4A4A4A] hover:bg-[#F8F9FA] hover:text-[#1A1A1A] transition-all shadow-sm flex items-center justify-center shrink-0"
                                onClick={() => router.push("/support")}
                            >
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">تفاصيل التذكرة</h1>
                                <p className="text-[#7D7D7D] text-[15px] mt-1">متابعة حالة التذكرة والردود</p>
                            </div>
                        </div>
                    </div>

                    {/* Ticket Main Card */}
                    <Card className="rounded-[1.5rem] border-[#E6E4DF] shadow-sm overflow-hidden bg-white">
                        {/* Ticket Header Banner */}
                        <div className="bg-[#FDFCF9] border-b border-[#E6E4DF]/60 p-6 md:p-8">
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-bold text-[#1A1A1A] pb-5">{ticket.subject}</h2>
                                        <div className="flex flex-wrap items-center gap-4 text-[14px] font-medium text-[#7D7D7D]">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[#A0A0A0]">رقم التذكرة:</span>
                                                <span className="font-mono text-[#1A1A1A] bg-white px-2 py-0.5 rounded-md border border-[#E6E4DF] shadow-sm">{ticket.id}</span>
                                            </div>
                                            <span className="w-1 h-1 rounded-full bg-[#D4D4D4]"></span>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[#A0A0A0]">القسم:</span>
                                                <span className="text-[#1A1A1A]">{ticket.category}</span>
                                            </div>
                                            <span className="w-1 h-1 rounded-full bg-[#D4D4D4]"></span>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[#A0A0A0]">تاريخ الإنشاء:</span>
                                                <span className="font-mono text-[#1A1A1A]">{ticket.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shrink-0 flex items-center gap-3">
                                        {getStatusBadge(ticket.status)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ticket Content Body */}
                        <CardContent className="p-6 md:p-8 space-y-8">
                            {/* Problem Description Area */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 px-1">
                                    <div className="w-8 h-8 rounded-lg bg-[#F8F9FA] border border-[#E6E4DF] flex items-center justify-center">
                                        <AlertCircle className="w-4 h-4 text-[#4A4A4A]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#1A1A1A]">وصف المشكلة</h3>
                                </div>
                                <div className="bg-[#F8F9FA] border border-[#E6E4DF]/60 p-6 rounded-2xl text-[15px] leading-relaxed text-[#4A4A4A] mr-10 relative before:content-[''] before:absolute before:-right-[21px] before:top-6 before:w-[21px] before:h-px before:bg-[#E6E4DF]/60">
                                    {ticket.description}
                                </div>
                            </div>

                            {/* Support Reply Area */}
                            {ticket.reply ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 px-1">
                                        <div className="w-8 h-8 rounded-lg bg-[#9A8D59]/10 border border-[#9A8D59]/20 flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-[#9A8D59]" />
                                        </div>
                                        <h3 className="text-lg font-bold text-[#9A8D59]">رد الدعم الفني</h3>
                                    </div>
                                    <div className="bg-[#FDFCF9] border border-[#9A8D59]/30 p-6 rounded-2xl text-[15px] leading-relaxed text-[#1A1A1A] shadow-[0_2px_8px_rgba(154,141,89,0.04)] mr-10 relative before:content-[''] before:absolute before:-right-[21px] before:top-6 before:w-[21px] before:h-px before:bg-[#9A8D59]/30">
                                        {ticket.reply}
                                    </div>
                                </div>
                            ) : (
                                <div className="mr-10 py-6 px-6 bg-[#F8F9FA]/50 border border-[#E6E4DF] border-dashed rounded-2xl flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white border border-[#E6E4DF] shadow-sm flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5 text-[#A0A0A0]" />
                                    </div>
                                    <div>
                                        <h4 className="text-[#1A1A1A] font-bold text-[15px]">جاري مراجعة التذكرة</h4>
                                        <p className="text-[#7D7D7D] font-medium text-sm mt-0.5">
                                            فريق الدعم يعمل حالياً على مراجعة طلبك وسيقوم بالرد عليك في أقرب وقت. شكراً لصبرك.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
