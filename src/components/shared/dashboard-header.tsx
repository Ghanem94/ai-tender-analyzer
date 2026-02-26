"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, LogOut, History, WalletCards, LifeBuoy, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
    {
        title: "التحليل",
        href: "/analysis",
        icon: FileText,
    },
    {
        title: "سجل العمليات",
        href: "/dashboard",
        icon: History,
    },
    {
        title: "الرصيد والشحن",
        href: "/billing",
        icon: WalletCards,
    },
    {
        title: "الدعم الفني",
        href: "/support",
        icon: LifeBuoy,
    },
]

export function DashboardHeader() {
    const pathname = usePathname()

    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-16 items-center justify-between" dir="rtl">
                <div className="flex items-center gap-2">
                    <Link href="/analysis" className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                            <LayoutDashboard className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-primary">محلل المناقصات</span>
                            <span className="text-[10px] text-muted-foreground">لوحة التحكم </span>
                        </div>
                    </Link>
                </div>

                <div className="flex items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (pathname.startsWith(item.href + "/") && item.href !== "/dashboard");
                        return (
                            <Button
                                key={item.href}
                                variant="ghost"
                                size="sm"
                                asChild
                                className={cn(
                                    "gap-2 text-sm md:text-[12px] font-bold transition-all rounded-full h-9 px-4",
                                    isActive
                                        ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
                                )}
                            >
                                <Link href={item.href} className="flex items-center gap-2">
                                    <item.icon className="h-4 w-4 shrink-0" />
                                    <span>{item.title}</span>
                                    {item.title === "الرصيد والشحن" && (
                                        <span className="mr-1.5 inline-flex items-center justify-center rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary border border-primary/20 leading-none h-5">
                                            10 ملفات
                                        </span>
                                    )}
                                </Link>
                            </Button>
                        )
                    })}

                    <div className="w-px h-6 bg-border mx-1 md:mx-2 shrink-0" />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 text-sm md:text-[15px] font-bold text-muted-foreground hover:bg-muted/50 hover:text-primary rounded-full h-9 px-4 shrink-0 transition-all"
                            >
                                <User className="h-4 w-4" />
                                <span>حسابي</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 font-sans border-[#E6E4DF] shadow-md rounded-xl p-1.5 text-right">
                            <DropdownMenuItem asChild className="gap-2.5 cursor-pointer font-bold text-[#7D7D7D] focus:text-[#9A8D59] focus:bg-[#9A8D59]/10 rounded-lg p-2.5 transition-colors">
                                <Link href="/profile">
                                    <User className="h-4 w-4" />
                                    <span>الملف الشخصي</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-[#E6E4DF] my-1" />
                            <DropdownMenuItem asChild className="gap-2.5 cursor-pointer font-bold text-red-500 focus:text-red-600 focus:bg-red-50 rounded-lg p-2.5 transition-colors">
                                <Link href="/">
                                    <LogOut className="h-4 w-4" />
                                    <span>تسجيل الخروج</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                </div>
            </div>
        </header>
    )
}
