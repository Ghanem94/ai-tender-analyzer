import { UploadCloud, BrainCircuit, FileText } from "lucide-react"

const steps = [
    {
        number: "01",
        title: "ارفع الوثيقة",
        description: "قم بتحميل مستند المناقصة (PDF/DOCX) إلى النظام بسهولة.",
        icon: UploadCloud,
    },
    {
        number: "02",
        title: "تحليل الذكاء الاصطناعي",
        description: "يقوم نظامنا بتحليل كل بند وشرط واستخلاص المعلومات المهمة.",
        icon: BrainCircuit,
    },
    {
        number: "03",
        title: "استلم تقريرك",
        description: "تقرير مفصل يوضح الملخص، المخاطر، والتوصيات النهائية.",
        icon: FileText,
    },
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 md:py-28 bg-background">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        كيف تحصل على <span className="text-primary">تقريرك؟</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        ثلاث خطوات بسيطة تفصلك عن اتخاذ قرارك الاستثماري القادم بكل ثقة.
                    </p>
                </div>

                {/* Stepper Container */}
                <div className="relative">
                    {/* Desktop Layout: Horizontal Stepper */}
                    <div className="hidden md:block">
                        <div className="relative flex justify-between items-start">
                            {/* Background Progress Line */}
                            <div className="absolute top-10 left-[16%] right-[16%] h-1 bg-primary z-0 translate-y-[-50%]"></div>

                            {steps.map((step, index) => (
                                <div key={index} className="flex flex-col items-center text-center relative z-10 w-1/3 px-4">
                                    {/* Step Circle */}
                                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-background border-4 border-primary/20 shadow-sm mb-6 transition-all duration-300 hover:scale-105 hover:border-primary group">
                                        <div className="absolute -top-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full ring-4 ring-background shadow-sm">
                                            {step.number}
                                        </div>
                                        <step.icon className="h-9 w-9 text-primary group-hover:scale-110 transition-transform duration-300" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground max-w-[250px] leading-relaxed">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Layout: Vertical Stepper */}
                    <div className="md:hidden flex flex-col gap-12 relative">
                        {/* Vertical Line */}
                        <div className="absolute top-6 bottom-6 right-[2.5rem] w-0.5 bg-border/50 -z-10 translate-x-1/2" />

                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-row items-start gap-6 text-right relative">
                                {/* Step Circle */}
                                <div className="relative flex-shrink-0 flex h-20 w-20 items-center justify-center rounded-full bg-background border-4 border-muted shadow-sm">
                                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full ring-4 ring-background">
                                        {step.number}
                                    </div>
                                    <step.icon className="h-8 w-8 text-primary" />
                                </div>

                                {/* Content */}
                                <div className="pt-2">
                                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
