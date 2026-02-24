"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginFormProps {
    onSuccess?: () => void
    onShowRegister?: () => void
    onShowForgotPassword?: () => void
}

export function LoginForm({ onSuccess, onShowRegister, onShowForgotPassword }: LoginFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    function validate() {
        const errors: Record<string, string> = {}

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            errors.email = "البريد الإلكتروني غير صالح"
        }

        if (formData.password.length < 1) {
            errors.password = "كلمة المرور مطلوبة"
        }

        setFieldErrors(errors)
        return Object.keys(errors).length === 0
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        if (!validate()) return

        setIsLoading(true)

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const result = await response.json()

            if (!response.ok) {
                setError(result.message)
                return
            }

            if (onSuccess) onSuccess()

            if (result.user.role === "ADMIN") {
                router.push("/admin")
            } else {
                router.push("/analysis")
            }
        } catch (err) {
            console.error("Login failed", err)
            setError("حدث خطأ غير متوقع")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="space-y-2">
                <Label className="block pb-2">البريد الإلكتروني</Label>
                <Input
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {fieldErrors.email && <p className="text-sm text-red-500">{fieldErrors.email}</p>}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label className="block pb-2">كلمة المرور</Label>
                </div>
                <Input
                    type="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {fieldErrors.password && <p className="text-sm text-red-500">{fieldErrors.password}</p>}
            </div>
            <div className="flex items-center justify-end">
                <button
                    type="button"
                    onClick={onShowForgotPassword}
                    className="text-xs font-medium text-primary hover:underline"
                >
                    نسيت كلمة المرور؟
                </button>
            </div>

            {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                تسجيل الدخول
            </Button>

            <div className="text-center text-sm">
                <p className="text-muted-foreground">
                    ليس لديك حساب؟{" "}
                    <button
                        type="button"
                        onClick={onShowRegister}
                        className="font-bold text-primary hover:underline"
                    >
                        سجل الآن
                    </button>
                </p>
            </div>
        </form>
    )
}
