"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"

import { FileSearch, LayoutDashboard } from "lucide-react"

export function Navbar() {
    const [authOpen, setAuthOpen] = useState(false)
    const [authView, setAuthView] = useState<"login" | "register">("login")

    const handleOpenLogin = () => {
        setAuthView("login")
        setAuthOpen(true)
    }

    const handleOpenRegister = () => {
        setAuthView("register")
        setAuthOpen(true)
    }

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">

                <div className="flex items-center gap-2">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                            <LayoutDashboard className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground text-primary">محلل المناقصات</span>
                        </div>
                    </Link>
                </div>
                <div className="hidden md:flex gap-6">
                    <Link href="#features" className="text-sm font-medium hover:text-primary">
                        المميزات
                    </Link>
                    <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
                        كيف يعمل
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium hover:text-primary">
                        الأسعار
                    </Link>
                    <Link href="#faq" className="text-sm font-medium hover:text-primary">
                        الأسئلة الشائعة
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Button onClick={handleOpenRegister}>ابدأ التحليل</Button>
                </div>

                <Dialog open={authOpen} onOpenChange={setAuthOpen}>
                    <DialogContent className="sm:max-w-[425px] rounded-[40px]">
                        <DialogHeader>
                            <DialogTitle className="text-center text-2xl font-bold text-primary">
                                {authView === "login" ? "تسجيل الدخول" : "إنشاء حساب جديد"}
                            </DialogTitle>
                            <DialogDescription className="text-center">
                                {authView === "login"
                                    ? "مرحباً بك مجدداً في محلل المناقصات الذكي"
                                    : "ابدأ رحلة تحليل المناقصات بكل ثقة"}
                            </DialogDescription>
                        </DialogHeader>
                        {authView === "login" ? (

                            <RegisterForm onShowLogin={() => setAuthView("login")} />
                        ) : (
                            <LoginForm onShowRegister={() => setAuthView("register")} />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </nav>
    )
}
