"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter as DialogFooterUI,
} from "@/components/ui/dialog"
import { PlusCircle, Check, Gift, Sparkles, Coins } from "lucide-react"
import { cn } from "@/lib/utils"

const tiers = [
    {
        id: "basic",
        name: "الباقة الأساسية",
        points: "5",
        price: "50",
        description: "5 نقاط دفع",
        icon: Coins,
        disabled: false,
    },
    {
        id: "pro",
        name: "الباقة الاحترافية",
        points: "10",
        price: "100",
        description: "10 نقاط دفع",
        icon: Sparkles,
        disabled: false,
        popular: true,
    },
]

export function RechargePointsDialog() {
    const [selectedTier, setSelectedTier] = useState<string | null>("pro")
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-2xl gap-3 h-14 bg-primary hover:bg-primary/80 text-white px-8 text-base font-bold shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
                    <PlusCircle className="w-5 h-5" />
                    شحن الرصيد
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] p-8 font-sans border-none shadow-2xl" dir="rtl">
                <DialogHeader className="space-y-3">
                    <DialogTitle className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">شحن رصيد النقاط</DialogTitle>
                    <DialogDescription className="text-[#7D7D7D] text-lg">
                        اختر الباقة المناسبة لاحتياجاتك واستمتع بتحليلات دقيقة لمناقصاتك.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 px-4 md:px-12">
                    {tiers.map((tier) => {
                        const Icon = tier.icon
                        const isSelected = selectedTier === tier.id

                        return (
                            <div
                                key={tier.id}
                                onClick={() => !tier.disabled && setSelectedTier(tier.id)}
                                className={cn(
                                    "relative p-5 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 flex flex-col items-center text-center group",
                                    isSelected
                                        ? "border-[#A18E5E] bg-[#A18E5E]/5 shadow-md"
                                        : "border-[#E6E4DF] hover:border-[#A18E5E]/50 bg-white",
                                    tier.disabled && "opacity-50 cursor-not-allowed grayscale"
                                )}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A18E5E] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm z-10 whitespace-nowrap">
                                        الأكثر طلبًا
                                    </div>
                                )}

                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                                    isSelected ? "bg-[#A18E5E] text-white" : "bg-gray-100 text-[#7D7D7D] group-hover:bg-[#A18E5E]/10"
                                )}>
                                    <Icon className="w-6 h-6" />
                                </div>

                                <div className="space-y-1 mb-4">
                                    <h3 className="font-bold text-[#1A1A1A] text-sm">{tier.name}</h3>
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="text-2xl font-black text-[#A18E5E]">{tier.points}</span>
                                        <span className="text-xs font-bold text-[#7D7D7D]">نقطة</span>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <div className="text-lg font-bold text-[#1A1A1A]">
                                        {tier.price} <span className="text-[10px] font-medium text-[#7D7D7D]">ر.س</span>
                                    </div>
                                </div>

                                {isSelected && (
                                    <div className="absolute top-3 right-3 w-6 h-6 bg-[#A18E5E] rounded-full flex items-center justify-center shadow-sm">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="flex flex-col items-center gap-6">
                    <p className="text-[#7D7D7D] text-[13px] font-medium bg-[#F8F9FA] px-6 py-2.5 rounded-full border border-[#E6E4DF]/50">
                        كل نقطة تتيح لك تحليل <span className="text-[#A18E5E] font-bold">100 صفحة</span> بدقة عالية
                    </p>

                    <DialogFooterUI className="w-full sm:justify-center gap-4 flex-col sm:flex-row-reverse">
                        <Button
                            className="w-full sm:w-auto h-14 rounded-2xl bg-[#A18E5E] hover:bg-[#8A7D49] text-white font-bold px-12 text-lg shadow-lg shadow-[#A18E5E]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            مواصلة للدفع
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full sm:w-auto h-14 rounded-2xl text-[#7D7D7D] font-bold px-8 hover:bg-gray-100"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            إلغاء
                        </Button>
                    </DialogFooterUI>
                </div>
            </DialogContent>
        </Dialog>
    )
}
