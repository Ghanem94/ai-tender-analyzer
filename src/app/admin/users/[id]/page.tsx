"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProfileHeader } from "./components/profile-header"
import { UserStats } from "./components/user-stats"
import { InfoTabs } from "./components/info-tabs"

export default function UserDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (params.id) {
            fetchUserDetails()
        }
    }, [params.id])

    async function fetchUserDetails() {
        try {
            const response = await fetch(`/api/admin/users/${params.id}`)
            if (response.ok) {
                const data = await response.json()
                setUser(data)
            } else {
                console.error("Failed to fetch user details")
            }
        } catch (error) {
            console.error("Error fetching user details:", error)
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

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] gap-4">
                <p className="text-muted-foreground Cairo">لم يتم العثور على المستخدم المطلوب.</p>
                <Button variant="outline" onClick={() => router.back()} className="Cairo rounded-xl">
                    العودة للخلف
                </Button>
            </div>
        )
    }

    const totalPayments = user.payments
        .filter((p: any) => p.status === "COMPLETED")
        .reduce((sum: number, p: any) => sum + p.amount, 0)

    // For now, consumed points is 0 or we can calculate from analyses if applicable
    const consumedPoints = user.analyses.length

    return (
        <div className="space-y-8 pb-12" dir="rtl">
            <div className="flex items-center justify-between" dir="rtl">
                <div className="flex items-center gap-4 w-full justify-start" dir="rtl">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-primary/5 hover:text-primary transition-all">
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                    <div className="text-right">
                        <h2 className="text-2xl font-extrabold tracking-tight Cairo text-right">تفاصيل المستخدم</h2>
                        <p className="text-muted-foreground text-sm Cairo text-right">عرض وإدارة كافة المعلومات الخاصة بالمستخدم.</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-8">
                <ProfileHeader user={user} />

                <UserStats
                    totalPoints={user.subscription?.analysisLimit ?? 0}
                    consumedPoints={consumedPoints}
                    totalPayments={totalPayments}
                />

                <InfoTabs
                    payments={user.payments}
                    analyses={user.analyses}
                />
            </div>
        </div>
    )
}
