"use client"

import { Check, Gift, Star, Crown, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { useAuthModal } from "@/components/providers/modal-provider"
import { cn } from "@/lib/utils"

const plans = [
    {
        name: "المجانية",
        price: "0",
        features: [
            "نقطة واحدة",
            "النقطة الواحدة = 100 صفحة",
            "تحليل قانوني و مالي عميق"
        ],
        icon: Gift,
        cta: "اشترك الآن",
        popular: false,
    },
    {
        name: "الأساسية",
        price: "50",
        features: [
            "5 نقاط",
            "النقطة الواحدة = 100 صفحة",
            "تحليل قانوني ومالي عميق"
        ],
        icon: Star,
        cta: "اشترك الآن",
        popular: false,
    },
    {
        name: "الاحترافية",
        price: "100",
        features: [
            "10 نقاط",
            "النقطة الواحدة = 100 صفحة",
            "تحليل قانوني ومالي عميق"
        ],
        icon: Crown,
        cta: "اشترك الآن",
        popular: true,
        badge: "الأكثر شيوعاً"
    },
]

export function Pricing() {
    const { openRegister } = useAuthModal()

    return (
        <section id="pricing" className="py-24 bg-[#FDFCF9] font-sans" dir="rtl">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1A1A1A]">
                        اختر الباقة <span className="text-[#A18E5E]">المناسبة لاحتياجاتك</span>
                    </h2>
                    <p className="text-lg md:text-xl text-[#7D7D7D] max-w-2xl mx-auto font-medium">
                        أسعار مرنة وباقات مصممة لتناسب الأفراد والشركات بمختلف أحجامها.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 items-start">
                    {plans.map((plan, index) => {
                        const Icon = plan.icon;
                        return (
                            <Card
                                key={index}
                                className={cn(
                                    "relative flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-300",
                                    plan.popular
                                        ? "border-2 border-[#A18E5E] shadow-[0_8px_30px_rgb(154,141,89,0.15)] md:-translate-y-4 z-10"
                                        : "border-[#E6E4DF] shadow-sm hover:shadow-md hover:-translate-y-1"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 inset-x-0 flex justify-center object-top">
                                        <div className="bg-[#A18E5E] text-white text-xs font-bold py-1.5 px-4 rounded-b-xl shadow-sm">
                                            {plan.badge}
                                        </div>
                                    </div>
                                )}

                                <CardHeader className={cn("text-center pb-6", plan.popular ? "pt-12" : "pt-8")}>
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A18E5E]/10 mb-4 text-[#A18E5E]">
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold text-[#1A1A1A] mb-2">{plan.name}</CardTitle>
                                    <div className="flex items-baseline justify-center gap-1.5 text-[#1A1A1A]">
                                        <span className="text-5xl font-extrabold">{plan.price}</span>
                                        <span className="text-xl font-bold text-[#7D7D7D]">ريال</span>
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-1 px-6 pb-6 pt-0 space-y-4">
                                    <div className="space-y-4">
                                        {plan.features.map((feature, fIndex) => (
                                            <div
                                                key={fIndex}
                                                className={cn(
                                                    "flex items-start gap-3 rounded-xl p-3 transition-colors",
                                                    fIndex === 0 ? "bg-gray-50 border border-gray-100" : "px-3"
                                                )}
                                            >
                                                <Check className="h-5 w-5 text-[#A18E5E] shrink-0 mt-0.5" />
                                                <span className={cn(
                                                    "text-[15px]",
                                                    fIndex === 0 ? "font-bold text-[#4A4A4A]" : "font-semibold text-[#7D7D7D]"
                                                )}>
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>

                                <CardFooter className="px-6 pb-8 pt-0 mt-auto">
                                    <Button
                                        className={cn(
                                            "w-full rounded-2xl h-12 text-[16px] font-bold shadow-sm transition-all duration-200",
                                            plan.popular
                                                ? "bg-[#A18E5E] hover:bg-[#8A7D49] text-white hover:shadow-md hover:-translate-y-0.5"
                                                : "bg-[#F8F9FA] hover:bg-[#E6E4DF] text-[#1A1A1A] border border-[#E6E4DF]"
                                        )}
                                        onClick={openRegister}
                                    >
                                        {plan.cta}
                                    </Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>

                {/* Bottom Note
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center justify-center gap-2 bg-[#A18E5E]/5 border border-[#A18E5E]/20 rounded-full py-3 px-6 text-sm font-bold text-[#7D7D7D]">
                        <span className="w-2 h-2 rounded-full bg-[#A18E5E] animate-pulse"></span>
                        للملفات التي تزيد عن 100 صفحة، يرجى التواصل مع الدعم الفني للحصول على تسعيرة خاصة.
                    </div>
                </div> */}
            </div>
        </section>
    )
}
