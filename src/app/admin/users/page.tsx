"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

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

            <UsersTable users={users} />
        </div>
    )
}
