"use client";

import { useState } from "react";
import { Loader2, Mail, ShieldAlert, KeyRound, CheckCircle2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ForgotPasswordFormProps {
    onSuccess?: () => void;
    onBackToLogin?: () => void;
}

export function ForgotPasswordForm({ onSuccess, onBackToLogin }: ForgotPasswordFormProps) {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [isLoading, setIsLoading] = useState(false);

    // Form states
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Error states
    const [error, setError] = useState<string | null>(null);

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email) {
            setError("يرجى إدخال البريد الإلكتروني");
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setStep(2);
        }, 1500);
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (code.length < 4) {
            setError("يرجى إدخال رمز التحقق بشكل صحيح");
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setStep(3);
        }, 1500);
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError("كلمات المرور غير متطابقة");
            return;
        }
        if (password.length < 8) {
            setError("يجب أن تتكون كلمة المرور من 8 أحرف على الأقل");
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (onSuccess) onSuccess();
        }, 2000);
    };

    return (
        <div className="space-y-6 pt-2 pb-4">
            <div className="flex flex-col items-center justify-center space-y-3 mb-6">
                <div className="w-14 h-14 bg-[#F8F9FA] rounded-full flex items-center justify-center text-[#9A8D59]">
                    {step === 1 && <Mail className="w-6 h-6" />}
                    {step === 2 && <ShieldAlert className="w-6 h-6" />}
                    {step === 3 && <KeyRound className="w-6 h-6" />}
                </div>
                <div className="text-center text-sm text-[#7D7D7D] max-w-[280px]">
                    {step === 1 && "أدخل بريدك الإلكتروني وسنقوم بإرسال رمز للتحقق لاستعادة حسابك."}
                    {step === 2 && `أدخل الرمز المكون من 6 أرقام الذي أرسلناه للتو إلى ${email}`}
                    {step === 3 && "قم بإنشاء كلمة مرور جديدة قوية وآمنة لحسابك."}
                </div>
            </div>

            {/* Step 1: Email Form */}
            {step === 1 && (
                <form onSubmit={handleSendCode} className="space-y-5 animate-in slide-in-from-right-2 duration-300">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="block pb-2">البريد الإلكتروني</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />
                    </div>
                    {error && <p className="text-sm text-red-500 font-bold">{error}</p>}
                    <Button type="submit" className="w-full h-12" disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "إرسال رمز التحقق"}
                    </Button>
                </form>
            )}

            {/* Step 2: Verification Code Form */}
            {step === 2 && (
                <form onSubmit={handleVerifyCode} className="space-y-5 animate-in slide-in-from-left-2 duration-300">
                    <div className="space-y-2">
                        <Label htmlFor="code" className="block pb-2">رمز التحقق</Label>
                        <Input
                            id="code"
                            type="text"
                            placeholder="123456"
                            className="text-center tracking-widest text-xl font-bold h-12 ltr"
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                            autoFocus
                        />
                    </div>
                    {error && <p className="text-sm text-red-500 font-bold">{error}</p>}
                    <Button type="submit" className="w-full h-12" disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "تأكيد الرمز"}
                    </Button>
                    <div className="text-center">
                        <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-primary hover:underline">
                            تغيير البريد الإلكتروني
                        </button>
                    </div>
                </form>
            )}

            {/* Step 3: New Password Form */}
            {step === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-4 animate-in slide-in-from-left-2 duration-300">
                    <div className="space-y-2">
                        <Label htmlFor="password" className="block pb-2">كلمة المرور الجديدة</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="block pb-2">تأكيد كلمة المرور</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-sm text-red-500 font-bold">{error}</p>}
                    <Button type="submit" className="w-full h-12 gap-2" disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                إعادة تعيين الدخول
                            </>
                        )}
                    </Button>
                </form>
            )}

            {/* Go Back Link */}
            {step < 3 && onBackToLogin && (
                <div className="pt-2 text-center">
                    <button
                        type="button"
                        onClick={onBackToLogin}
                        className="inline-flex items-center justify-center gap-1.5 text-sm text-[#7D7D7D] hover:text-[#1A1A1A] transition-colors"
                    >
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                        العودة لتسجيل الدخول
                    </button>
                </div>
            )}
        </div>
    );
}
