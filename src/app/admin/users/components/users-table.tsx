"use client"

import { Trash2, UserCog, Coins, Eye, ShieldAlert } from "lucide-react"
import Link from "next/link"
import { DataTable, ColumnDef } from "@/components/shared/data-table"
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

interface UsersTableProps {
    users: User[]
}

export function UsersTable({ users }: UsersTableProps) {
    const columns: ColumnDef<User>[] = [
        {
            header: "الاسم",
            cell: (user) => (
                <Link href={`/admin/users/${user.id}`} className="hover:text-primary hover:underline transition-colors Cairo font-bold text-foreground">
                    {user.name}
                </Link>
            ),
        },
        {
            header: "البريد الإلكتروني",
            accessorKey: "email",
        },
        {
            header: "الصلاحية",
            cell: (user) => (
                <Badge variant={user.role === "ADMIN" ? "default" : "secondary"} className="Cairo gap-1.5">
                    {user.role === "ADMIN" && <ShieldAlert className="h-3 w-3" />}
                    {user.role === "ADMIN" ? "مشرف" : "مستخدم"}
                </Badge>
            ),
        },
        {
            header: "تاريخ الانضمام",
            cell: (user) => (
                <span className="Cairo text-sm">
                    {new Date(user.createdAt).toLocaleDateString("ar-SA", { day: "numeric", month: "long", year: "numeric" })}
                </span>
            ),
        },
        {
            header: "الباقة الحالية",
            cell: (user) => (
                <Badge variant="outline" className="font-bold border-primary/20 text-primary bg-primary/5 Cairo">
                    {user.subscription?.plan === "PRO" ? "الأساسية" : user.subscription?.plan === "ENTERPRISE" ? "المتقدمة" : "المجانية"}
                </Badge>
            ),
        },
        {
            header: "الرصيد المتبقي",
            cell: (user) => (
                <div className="flex items-center gap-1.5 font-bold Cairo text-foreground">
                    <span>{user.subscription?.analysisLimit ?? 0}</span>
                    <span className="text-xs text-muted-foreground font-normal">تذكرة</span>
                </div>
            ),
        },
        {
            header: "إجراءات",
            cell: (user) => (
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" asChild title="عرض التفاصيل">
                        <Link href={`/admin/users/${user.id}`}>
                            <Eye className="h-4 w-4 text-primary" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" title="إضافة/إعادة ضبط الرصيد">
                        <Coins className="h-4 w-4 text-emerald-600" />
                    </Button>
                    <Button variant="ghost" size="icon" title="إعدادات المستخدم">
                        <UserCog className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" title="حذف المستخدم">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ]

    return (
        <DataTable
            data={users}
            columns={columns}
            searchKey="name"
            searchPlaceholder="البحث عن مستخدم بالاسم..."
        />
    )
}
