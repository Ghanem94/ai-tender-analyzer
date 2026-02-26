"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuthModal } from "@/components/providers/modal-provider"
import { UploadCloud } from "lucide-react"

export function Hero() {
    const { openLogin } = useAuthModal()

    return (
        <section className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-28">
            <div className="container relative z-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium text-primary mb-6">
                    <UploadCloud className="w-5 h-5 m-2" />
                    <span> نظام تحليل المناقصات الذكي</span>
                </div>
                <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    حوّل تعقيد <span className="text-primary">المناقصات</span> إلى
                    <br className="hidden sm:inline" />
                    قرارات واثقة
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                    أداة تحليل متطورة تساعدك على فهم المناقصات، كشف المخاطر، وتلخيص المستندات الضخمة في ثوانٍ باستخدام الذكاء الاصطناعي.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Button size="lg" className="rounded-full px-8 text-lg" onClick={openLogin}>
                        ابدأ التحليل مجاناً
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 text-lg" asChild>
                        <Link href="#how-it-works">كيف يعمل؟</Link>
                    </Button>
                </div>

                {/* Abstract dashboard preview */}
                <div className="mt-16 sm:mt-20 relative w-full max-w-6xl mx-auto px-4 sm:px-6">
                    <img
                        src="hero-section.jpeg"
                        alt="معاينة لوحة التحليل"
                        className="w-full h-auto object-cover object-top"
                    />
                </div>
            </div>
        </section>
    )
}
