"use client";

import { DashboardHeader } from "@/components/shared/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Mail, Save, Shield, KeyRound, CheckCircle2, CreditCard, Plus } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="flex min-h-screen flex-col bg-background font-sans" dir="rtl">
            <DashboardHeader />

            <main className="flex-1 p-4 md:p-8 container mx-auto max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-2">الملف الشخصي</h1>
                        <p className="text-[#7D7D7D] text-lg">إدارة بيانات حسابك الشخصية وإعدادات الأمان الخاصة بك</p>
                    </div>
                </div>

                {/* Profile Overview Card (Hero) */}
                <Card className="rounded-[2rem] border-none shadow-lg overflow-hidden relative bg-gradient-to-l from-[#1A1A1A] to-[#2A2A2A] text-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#9A8D59] opacity-10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                    <CardContent className="p-8 relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9A8D59] to-[#b3a46a] flex items-center justify-center shrink-0 shadow-inner border-4 border-white/10">
                                <span className="text-4xl font-bold text-white tracking-widest">GT</span>
                            </div>
                            <div className="space-y-2 text-center md:text-right flex-1">
                                <h2 className="text-3xl font-bold tracking-tight">غانم ابراهيم الطيب</h2>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1 text-white/70">
                                    <div className="flex items-center gap-1.5">
                                        <Mail className="w-4 h-4 text-[#D4C485]" />
                                        <span>ghanem@example.com</span>
                                    </div>
                                </div>
                            </div>
                            <div className="shrink-0">
                                <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-xl h-11 px-6 font-bold shadow-sm transition-all">
                                    تغيير الصورة
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Settings Form */}
                    <Card className="md:col-span-2 rounded-[2rem] border-[#E6E4DF]/50 shadow-sm bg-white">
                        <CardHeader className="p-8 pb-6 border-b border-[#E6E4DF]/50">
                            <CardTitle className="text-2xl font-bold text-[#1A1A1A] flex items-center gap-2">
                                <User className="w-5 h-5 text-[#9A8D59]" />
                                المعلومات الأساسية
                            </CardTitle>
                            <CardDescription className="text-[#7D7D7D] text-[15px]">
                                قم بتحديث بيانات حسابك الأساسية.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="name" className="text-sm font-bold text-[#1A1A1A]">
                                            الاسم الكامل
                                        </Label>
                                        <Input id="name" defaultValue="غانم ابراهيم الطيب" className="h-12 rounded-xl bg-[#F8F9FA] border-[#E6E4DF] focus-visible:ring-[#9A8D59] font-medium text-[#4A4A4A]" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="email" className="text-sm font-bold text-[#1A1A1A]">
                                            البريد الإلكتروني
                                        </Label>
                                        <Input id="email" type="email" defaultValue="ghanem@example.com" className="h-12 rounded-xl bg-[#F8F9FA] border-[#E6E4DF] focus-visible:ring-[#9A8D59] text-left ltr font-mono text-sm text-[#4A4A4A]" />
                                    </div>
                                </div>



                                <div className="pt-4 flex justify-end">
                                    <Button type="button" className="h-12 rounded-xl bg-[#9A8D59] hover:bg-[#8A7D49] text-white font-bold px-8 shadow-md gap-2 transition-all">
                                        <Save className="w-4 h-4" />
                                        حفظ التعديلات
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Sidebar Settings (Security & Payment) */}
                    <div className="space-y-6 md:col-span-1">
                        {/* Security Settings */}
                        <Card className="rounded-[2rem] border-[#E6E4DF]/50 shadow-sm bg-white">
                            <CardHeader className="p-6 pb-4 border-b border-[#E6E4DF]/50">
                                <CardTitle className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-[#9A8D59]" />
                                    إعدادات الأمان
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-[#1A1A1A] text-[15px]">حالة الحساب</h4>
                                        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg w-fit">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span className="text-sm font-bold">موثق وفعال</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1 pt-2 border-t border-[#E6E4DF]/50">
                                        <h4 className="font-bold text-[#1A1A1A] text-[15px]">كلمة المرور</h4>
                                        <p className="text-sm text-[#7D7D7D]">آخر تحديث منذ 3 أشهر</p>
                                        <Button variant="outline" className="w-full mt-3 h-11 rounded-xl border-[#E6E4DF] text-[#4A4A4A] font-bold gap-2 hover:bg-[#F8F9FA]">
                                            <KeyRound className="w-4 h-4 text-[#9A8D59]" />
                                            تغيير كلمة المرور
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Methods */}
                        <Card className="rounded-[2rem] border-[#E6E4DF]/50 shadow-sm bg-white">
                            <CardHeader className="p-6 pb-4 border-b border-[#E6E4DF]/50 flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-[#9A8D59]" />
                                    طرق الدفع
                                </CardTitle>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-[#9A8D59] hover:bg-[#9A8D59]/10 transition-colors">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                {/* Saved Card Item */}
                                <div className="p-4 rounded-xl border border-[#E6E4DF] bg-[#F8F9FA] flex items-center justify-between group hover:border-[#9A8D59]/50 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-8 bg-black rounded flex items-center justify-center text-white shrink-0 shadow-sm font-bold italic text-xs">
                                            VISA
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#1A1A1A] text-sm ltr tracking-wider">**** 4242</p>
                                            <p className="text-[11px] text-[#7D7D7D]">ينتهي في 12/26</p>
                                        </div>
                                    </div>
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                                </div>

                                <Button variant="outline" className="w-full h-11 border-dashed border-[#E6E4DF] text-[#7D7D7D] font-bold hover:bg-[#F8F9FA] hover:text-[#1A1A1A] gap-2 rounded-xl transition-all">
                                    <Plus className="w-4 h-4" />
                                    إضافة بطاقة جديدة
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </main>
        </div>
    );
}
