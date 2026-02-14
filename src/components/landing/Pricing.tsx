import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import Link from "next/link"

const plans = [
    {
        name: "الأساسية",
        price: "50",
        description: "للأفراد والشركات الناشئة",
        features: ["تحليل 5 وثائق شهرياً", "دعم ملفات PDF", "ملخص أساسي للمخاطر"],
        cta: "اشترك الآن",
        href: "/register?plan=basic",
        popular: false,
    },
    {
        name: "المتقدمة",
        price: "100",
        description: "للشركات المتوسطة والمحترفين",
        features: [
            "تحليل 20 وثيقة شهرياً",
            "دعم PDF & Word",
            "تحليل قانوني معمق",
            "تصدير PDF & Excel",
            "دعم فني مباشر",
        ],
        cta: "اشترك الآن",
        href: "/register?plan=pro",
        popular: true,
    },
    {
        name: "المؤسسات",
        price: "اتصل بنا",
        description: "للشركات الكبرى والجهات الحكومية",
        features: ["تحليل غير محدود", "API Access", "تدريب فريق العمل", "مدير حساب خاص", "تخصيص كامل"],
        cta: "تواصل معنا",
        href: "/contact",
        popular: false,
    },
]

export function Pricing() {
    return (
        <section id="pricing" className="py-20 md:py-28 bg-muted/30">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        اختر الخطة <span className="text-primary">المناسبة لك</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        أسعار مرنة تناسب الشركات الناشئة وحتى الجهات الحكومية.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 items-center">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105 z-10' : 'border-border shadow-sm'}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                                    الأكثر طلباً
                                </div>
                            )}
                            <CardHeader className="text-center pb-8 pt-10">
                                <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                                <div className="text-4xl font-bold mb-2">
                                    {plan.price !== "اتصل بنا" && <span className="text-xl font-normal align-top">$</span>}
                                    {plan.price}
                                    {plan.price !== "اتصل بنا" && <span className="text-base font-normal text-muted-foreground">/شهر</span>}
                                </div>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ul className="flex flex-col gap-3 text-sm">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            <Check className="ml-2 h-4 w-4 text-primary shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="pt-8">
                                <Button
                                    className="w-full rounded-full"
                                    variant={plan.popular ? "default" : "outline"}
                                    asChild
                                >
                                    <Link href={plan.href}>{plan.cta}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
