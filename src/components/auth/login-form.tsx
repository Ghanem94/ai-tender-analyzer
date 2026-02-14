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
import { loginSchema, LoginFormData } from "@/lib/validations/auth"

interface LoginFormProps {
    onSuccess?: () => void
    onShowRegister?: () => void
}

export function LoginForm({ onSuccess, onShowRegister }: LoginFormProps) {
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
            // For demo purposes, redirect to analysis
            router.push("/analysis")
            if (onSuccess) {
                onSuccess()
            }
        }, 1500)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        </Form>
    )
}
