"use client"

import { Trash2, UserCog, Coins } from "lucide-react"

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

interface UsersTableProps {
    /** The array of user data explicitly fetched by the parent page */
    users: User[]
}

/**
 * Renders the users data table.
 * 
 * It purely handles the UI presentation of the User rows, including
 * their roles, subscription data, and administrative actions.
 */
export function UsersTable({ users }: UsersTableProps) {
    return (
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
    )
}
