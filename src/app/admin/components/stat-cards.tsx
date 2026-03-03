"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
    title: string
    value: string | number
    description?: string
    icon: LucideIcon
    iconClassName?: string
    className?: string
}

export function StatCard({
    title,
    value,
    description,
    icon: Icon,
    iconClassName,
    className
}: StatCardProps) {
    return (
        <Card className={cn("hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm rounded-[24px]", className)} dir="rtl">
            <CardContent className="p-6 text-right">
                <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium text-muted-foreground Cairo text-right">
                        {title}
                    </p>
                    <div className={cn("p-2 rounded-xl", iconClassName)}>
                        <Icon className="h-5 w-5" />
                    </div>
                </div>
                <div className="mt-2 text-right">
                    <div className="text-3xl font-bold tracking-tight text-foreground Cairo text-right">
                        {value}
                    </div>
                    {description && (
                        <p className="text-xs font-medium text-muted-foreground mt-1 Cairo text-right">
                            {description}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export function StatCardsGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {children}
        </div>
    )
}
