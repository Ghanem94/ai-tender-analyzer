import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-28">
            <div className="container relative z-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium text-primary mb-6">
                    <span>✨ نظام تحليل المناقصات الذكي</span>
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
                    <Button size="lg" className="rounded-full px-8 text-lg" asChild>
                        <Link href="/register">ابدأ التحليل مجاناً</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 text-lg" asChild>
                        <Link href="#how-it-works">كيف يعمل؟</Link>
                    </Button>
                </div>

                {/* Abstract dashboard preview */}
                <div className="mt-16 sm:mt-20 relative w-full max-w-5xl mx-auto">
                    <div className="relative rounded-xl border bg-card shadow-2xl p-2 sm:p-4 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-50" />
                        <div className="aspect-[16/9] rounded-lg bg-muted/30 flex items-center justify-center border border-dashed border-border">
                            <div className="text-center p-8">
                                <p className="text-muted-foreground text-lg mb-2">معاينة لوحة التحليل</p>
                                <p className="text-xs text-muted-foreground/60">(صورة توضيحية)</p>
                            </div>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full bg-secondary/80 blur-3xl" />
                </div>
            </div>
        </section>
    )
}
