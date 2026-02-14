"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { registerSchema, RegisterFormData } from "@/lib/validations/auth"

interface RegisterFormProps {
    onSuccess?: () => void
    onShowLogin?: () => void
}

export function RegisterForm({ onSuccess, onShowLogin }: RegisterFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(data: RegisterFormData) {
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            console.log("Register data:", data)
            setIsLoading(false)
            // For demo purposes, redirect to analysis
            router.push("/analysis")
            if (onSuccess) {
                onSuccess()
            }
        }, 1500)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-3">الاسم الكامل</FormLabel>
                            <FormControl>
                                <Input placeholder="الاسم" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-3">البريد الإلكتروني</FormLabel>
                            <FormControl>
                                <Input placeholder="name@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-3">كلمة المرور</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-3">تأكيد كلمة المرور</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
        </Form>
    )
}
