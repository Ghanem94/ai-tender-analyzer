"use client"

import { useEffect, useState } from "react"
import { Loader2, Users, Activity, Zap } from "lucide-react"
import { StatCard, StatCardsGrid } from "../components/stat-cards"


import { UsersTable } from "./components/users-table"

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

    // Calculate Stats
    const totalUsers = users.length

    // Active users: Registered this month (proxy for active)
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const activeUsers = users.filter(user => new Date(user.createdAt) >= firstDayOfMonth).length

    const totalPoints = users.reduce((sum, user) => sum + (user.subscription?.analysisLimit || 0), 0)

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
        <div className="space-y-6" dir="rtl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight Cairo">المستخدمين</h1>
                <p className="text-muted-foreground Cairo">
                    إدارة المستخدمين والصلاحيات
                </p>
            </div>

            <StatCardsGrid>
                <StatCard
                    title="إجمالي المستخدمين"
                    value={totalUsers}
                    icon={Users}
                    iconClassName="bg-blue-500/10 text-blue-500"
                    description="كافة الحسابات المسجلة"
                />
                <StatCard
                    title="المستخدمين النشطين"
                    value={activeUsers}
                    icon={Activity}
                    iconClassName="bg-emerald-500/10 text-emerald-500"
                    description="مسجلين لهذا الشهر"
                />
                <StatCard
                    title="إجمالي نقاط الرصيد"
                    value={totalPoints}
                    icon={Zap}
                    iconClassName="bg-amber-500/10 text-amber-500"
                    description="رصيد النقاط الكلي الفعال"
                />
            </StatCardsGrid>

            <UsersTable users={users} />
        </div>
    )
}

