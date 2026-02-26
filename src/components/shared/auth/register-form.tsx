"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RegisterFormProps {
    onSuccess?: () => void
    onShowLogin?: () => void
}

export function RegisterForm({ onSuccess, onShowLogin }: RegisterFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    function validate() {
        const errors: Record<string, string> = {}

        if (formData.name.length < 2) {
            errors.name = "الاسم يجب أن يكون حرفين على الأقل"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            errors.email = "البريد الإلكتروني غير صالح"
        }

        if (formData.password.length < 8) {
            errors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = "تأكيد كلمة المرور مطلوب"
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "كلمات المرور غير متطابقة"
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
            const response = await fetch("/api/auth/register", {
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
            console.error("Registration failed", err)
            setError("حدث خطأ غير متوقع")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label className="block pb-2">الاسم الكامل</Label>
                <Input
                    placeholder="الاسم"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {fieldErrors.name && <p className="text-sm text-red-500">{fieldErrors.name}</p>}
            </div>

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
                <Label className="block pb-2">كلمة المرور</Label>
                <Input
                    type="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {fieldErrors.password && <p className="text-sm text-red-500">{fieldErrors.password}</p>}
            </div>

            <div className="space-y-2">
                <Label className="block pb-2">تأكيد كلمة المرور</Label>
                <Input
                    type="password"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                {fieldErrors.confirmPassword && <p className="text-sm text-red-500">{fieldErrors.confirmPassword}</p>}
            </div>

            {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button className="w-full mt-2" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                إنشاء الحساب
            </Button>

            <div className="text-center text-sm">
                <p className="text-muted-foreground">
                    لديك حساب بالفعل؟{" "}
                    <button
                        type="button"
                        onClick={onShowLogin}
                        className="font-bold text-primary hover:underline"
                    >
                        سجل دخولك
                    </button>
                </p>
            </div>
        </form>
    )
}
