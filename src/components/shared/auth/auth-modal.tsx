"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { ForgotPasswordForm } from "./forgot-password-form"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    view: "login" | "register" | "forgot-password"
    onViewChange: (view: "login" | "register" | "forgot-password") => void
}

export function AuthModal({ isOpen, onClose, view, onViewChange }: AuthModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px] rounded-[40px]">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-primary">
                        {view === "login" && "تسجيل الدخول"}
                        {view === "register" && "إنشاء حساب جديد"}
                        {view === "forgot-password" && "استعادة كلمة المرور"}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        {view === "login" && "مرحباً بك مجدداً في محلل المناقصات الذكي"}
                        {view === "register" && "ابدأ رحلة تحليل المناقصات بكل ثقة"}
                        {view === "forgot-password" && "لا تقلق، سنساعدك في استعادة حسابك"}
                    </DialogDescription>
                </DialogHeader>
                {view === "login" && (
                    <LoginForm
                        onShowRegister={() => onViewChange("register")}
                        onShowForgotPassword={() => onViewChange("forgot-password")}
                        onSuccess={onClose}
                    />
                )}
                {view === "register" && (
                    <RegisterForm
                        onShowLogin={() => onViewChange("login")}
                        onSuccess={onClose}
                    />
                )}
                {view === "forgot-password" && (
                    <ForgotPasswordForm
                        onBackToLogin={() => onViewChange("login")}
                        onSuccess={() => onViewChange("login")}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}
