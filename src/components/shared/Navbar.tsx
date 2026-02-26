"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileSearch, LayoutDashboard } from "lucide-react"
import { useAuthModal } from "@/components/providers/modal-provider"

export function Navbar() {
    const { openLogin } = useAuthModal()

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">

                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                            <LayoutDashboard className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground text-primary">محلل المناقصات</span>
                        </div>
                    </Link>
                </div>
                <div className="hidden md:flex gap-6">
                    <Link href="#features" className="text-sm font-medium hover:text-primary">
                        المميزات
                    </Link>
                    <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
                        كيف يعمل
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium hover:text-primary">
                        الأسعار
                    </Link>
                    <Link href="#faq" className="text-sm font-medium hover:text-primary">
                        الأسئلة الشائعة
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Button onClick={openLogin}>ابدأ التحليل</Button>
                </div>
            </div>
        </nav>
    )
}
