"use client"

import Link from "next/link"
import { LayoutDashboard, FileText, LogOut, History } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DashboardHeader() {
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                            <LayoutDashboard className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground">محلل المناقصات</span>
                            <span className="text-[10px] text-muted-foreground">لوحة التحكم الذكية</span>
                        </div>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-primary">
                        <Link href="/analysis">
                            <FileText className="h-4 w-4" />
                            التحليل
                        </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-primary">
                        <Link href="/dashboard">
                            <History className="h-4 w-4" />
                            سجل العمليات
                        </Link>
                    </Button>
                    <div className="w-px h-6 bg-border mx-2" />
                    <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-red-500">
                        <Link href="/">
                            <LogOut className="h-4 w-4" />
                            تسجيل الخروج
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
