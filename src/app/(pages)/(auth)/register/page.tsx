"use client"

import { useState } from "react"
import Link from "next/link"
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

export default function RegisterPage() {
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
            // For demo purposes, redirect to dashboard
            router.push("/dashboard")
        }, 1500)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-[40px] shadow-lg border border-border">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">إنشاء حساب جديد</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        ابدأ رحلة تحليل المناقصات بكل ثقة
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>الاسم الكامل</FormLabel>
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
                                    <FormLabel>البريد الإلكتروني</FormLabel>
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
                                    <FormLabel>كلمة المرور</FormLabel>
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
                                    <FormLabel>تأكيد كلمة المرور</FormLabel>
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
                    </form>
                </Form>

                <div className="text-center text-sm">
                    <p className="text-muted-foreground">
                        لديك حساب بالفعل؟{" "}
                        <Link href="/login" className="font-medium text-primary hover:underline">
                            تسجيل الدخول
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
