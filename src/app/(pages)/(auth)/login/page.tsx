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
import { loginSchema, LoginFormData } from "@/lib/validations/auth"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: LoginFormData) {
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            console.log("Login data:", data)
            setIsLoading(false)
            // For demo purposes, redirect to dashboard
            router.push("/dashboard")
        }, 1500)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-[40px] shadow-lg border border-border">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">تسجيل الدخول</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        مرحباً بك مجدداً في محلل المناقصات الذكي
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-6">
                                    <FormLabel className="text-base font-semibold mb-2 block">البريد الإلكتروني</FormLabel>
                                    <FormControl>
                                        <Input className="h-14" placeholder="name@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-6">
                                    <FormLabel className="text-base font-semibold mb-2 block">كلمة المرور</FormLabel>
                                    <FormControl>
                                        <Input className="h-14" type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                            تسجيل الدخول
                        </Button>
                    </form>
                </Form>

                <div className="text-center text-sm">
                    <p className="text-muted-foreground">
                        ليس لديك حساب؟{" "}
                        <Link href="/register" className="font-medium text-primary hover:underline">
                            إنشاء حساب جديد
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
