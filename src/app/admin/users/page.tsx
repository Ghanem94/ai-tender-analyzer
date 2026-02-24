"use client"

import { useEffect, useState } from "react"
import { Loader2, Trash2, UserCog, Coins } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface User {
    id: string
    name: string
    email: string
    role: "ADMIN" | "USER"
    createdAt: string
    subscription?: {
        plan: "FREE" | "PRO" | "ENTERPRISE"
        analysisLimit: number
    }
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        try {
            const response = await fetch("/api/admin/users")
            if (response.ok) {
                const data = await response.json()
                setUsers(data)
            }
        } catch (error) {
            console.error("Failed to fetch users", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">المستخدمين</h1>
                <p className="text-muted-foreground">
                    إدارة المستخدمين والصلاحيات
                </p>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right">الاسم</TableHead>
                            <TableHead className="text-right">البريد الإلكتروني</TableHead>
                            <TableHead className="text-right">الصلاحية</TableHead>
                            <TableHead className="text-right">تاريخ الانضمام</TableHead>
                            <TableHead className="text-right">الباقة الحالية</TableHead>
                            <TableHead className="text-right">الرصيد المتبقي</TableHead>
                            <TableHead className="text-right">إجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                                        {user.role === "ADMIN" ? "مشرف" : "مستخدم"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {new Date(user.createdAt).toLocaleDateString("ar-SA", { day: "numeric", month: "long", year: "numeric" })}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="font-bold border-primary/20 text-primary bg-primary/5">
                                        {user.subscription?.plan === "PRO" ? "الأساسية" : user.subscription?.plan === "ENTERPRISE" ? "المتقدمة" : "المجانية"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5 font-bold">
                                        <span>{user.subscription?.analysisLimit ?? 0}</span>
                                        <span className="text-xs text-muted-foreground font-normal">تذكرة</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon" title="إضافة/إعادة ضبط الرصيد">
                                            <Coins className="h-4 w-4 text-emerald-600" />
                                        </Button>
                                        <Button variant="ghost" size="icon" title="إعدادات المستخدم">
                                            <UserCog className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive" title="حذف المستخدم">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
