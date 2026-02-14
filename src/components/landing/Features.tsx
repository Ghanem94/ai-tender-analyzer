import { Zap, ShieldCheck, Search, Clock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const features = [
    {
        title: "سرعة فائقة",
        description: "قم بتحليل مئات الصفحات في ثوانٍ. وفر وقتك للتركيز على القرارات الاستراتيجية.",
        icon: Zap,
    },
    {
        title: "دقة قانونية",
        description: "يكشف نظامنا عن المخاطر القانونية والشروط الجزائية المخفية بدقة متناهية.",
        icon: ShieldCheck,
    },
    {
        title: "تحليل المخاطر",
        description: "احصل على تقييم شامل للمخاطر المالية والتشغيلية قبل الدخول في أي مناقصة.",
        icon: Search,
    },
    {
        title: "توفير الوقت",
        description: "لا مزيد من القراءة اليدوية المرهقة. دع الذكاء الاصطناعي يقوم بالعمل الشاق.",
        icon: Clock,
    },
]

export function Features() {
    return (
        <section id="features" className="py-20 md:py-28 bg-muted/30">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        لماذا تختار <span className="text-primary">محلل المناقصات؟</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground mx-auto max-w-2xl">
                        نقدم لك مجموعة من الأدوات القوية التي تجعل عملية تحليل المناقصات أسهل وأسرع وأكثر دقة.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="mb-2">{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
