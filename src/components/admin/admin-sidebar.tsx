"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, MessageSquare, LogOut, Settings, ShieldCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function AdminSidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    const navItems = [
        { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
        { href: "/admin/subscriptions", label: "الاشتراكات", icon: Users },
        { href: "/admin/tickets", label: "الدعم الفني", icon: MessageSquare },
    ]

    return (
        <div className={cn("pb-12 min-h-screen border-l bg-card/50 backdrop-blur-xl", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="mb-6 px-4 flex items-center gap-2">
                        <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground">
                            لوحة التحكم
                        </span>
                    </div>
                    <div className="space-y-1">
                        {navItems.map((item) => (
                            <Button
                                key={item.href}
                                variant={pathname === item.href ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start gap-3 h-12 text-base rounded-xl transition-all duration-200",
                                    pathname === item.href
                                        ? "bg-primary/10 text-primary hover:bg-primary/15 font-semibold"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                )}
                                asChild
                            >
                                <Link href={item.href}>
                                    <item.icon className="h-5 w-5" />
                                    {item.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-wider text-muted-foreground/70 uppercase">
                        الإعدادات
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground">
                            <Settings className="h-5 w-5" />
                            الإعدادات العامة
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base rounded-xl text-destructive/80 hover:text-destructive hover:bg-destructive/10">
                            <LogOut className="h-5 w-5" />
                            تسجيل الخروج
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
