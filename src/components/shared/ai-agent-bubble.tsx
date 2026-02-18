"use client"

import { Bot, MessageCircle, X } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AIAgentBubble() {
    const [isOpen, setIsOpen] = useState(true)
    const [isHovered, setIsHovered] = useState(false)

    // Auto-close the text bubble after 5 seconds, but keep the agent
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(false)
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="fixed bottom-6 left-6 z-50 flex items-end gap-2 pointer-events-none">
            {/* Chat Bubble */}
            <div
                className={cn(
                    "mb-2 p-3 bg-white dark:bg-card border border-primary/20 rounded-2xl rounded-bl-none shadow-lg transform transition-all duration-300 ease-in-out origin-bottom-left max-w-[200px] pointer-events-auto",
                    isOpen || isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                )}
            >
                <div className="flex justify-between items-start gap-2">
                    <p className="text-sm font-medium text-foreground leading-tight">
                        مرحبًا! 👋 <br />
                        أنا مساعدك الذكي لتحليل المناقصات
                    </p>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Agent Button */}
            <div
                className="pointer-events-auto relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Pulse Effect */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-20 animate-ping group-hover:opacity-10 dark:opacity-30"></span>

                <Button
                    size="icon"
                    className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-transform duration-300 hover:scale-110 active:scale-95 border-2 border-white dark:border-background"
                >
                    <Bot className="w-8 h-8 text-primary-foreground animate-bounce-slow" />
                </Button>
            </div>
        </div>
    )
}
