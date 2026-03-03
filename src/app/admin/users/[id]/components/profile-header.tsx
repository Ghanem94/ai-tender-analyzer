"use client"

import { User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Ban, ShieldAlert } from "lucide-react"

interface ProfileHeaderProps {
    user: {
        name: string
        email: string
        createdAt: string
        role: string
    }
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    const joinDate = new Date(user.createdAt).toLocaleDateString("ar-SA", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })

    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm rounded-[24px] overflow-hidden" dir="rtl">
            <CardContent className="p-6 md:p-8 text-right">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex gap-6 items-center">
                        <div className="h-24 w-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border-4 border-background shadow-xl">
                            <User className="h-12 w-12" />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-extrabold tracking-tight Cairo">{user.name}</h1>
                                {user.role === "ADMIN" && (
                                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold Cairo flex items-center gap-1.5">
                                        <ShieldAlert className="h-3.5 w-3.5" />
                                        مشرف النظام
                                    </div>
                                )}
                            </div>
                            <p className="text-muted-foreground flex items-center gap-2 Cairo">
                                <span className="font-medium text-foreground/80">{user.email}</span>
                            </p>
                            <p className="text-sm text-muted-foreground Cairo">
                                تاريخ الانضمام: <span className="font-bold text-foreground/80">{joinDate}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                        <Button variant="outline" className="gap-2 rounded-xl Cairo hover:bg-primary/5 border-border/50">
                            <Edit className="h-4 w-4" />
                            تعديل البيانات
                        </Button>
                        <Button variant="outline" className="gap-2 rounded-xl Cairo text-rose-600 hover:bg-rose-500/5 hover:text-rose-700 border-rose-500/20">
                            <Ban className="h-4 w-4" />
                            حظر المستخدم
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
