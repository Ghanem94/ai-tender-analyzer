import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "هل النظام متوافق مع نظام المنافسات الحكومية؟",
        answer:
            "نعم، تم تدريب نماذجنا الذكية على نظام المنافسات والمشتريات الحكومية السعودي ولائحته التنفيذية لضمان دقة التحليل.",
    },
    {
        question: "ما مدى دقة التحليل الذي يقدمه الطائر؟",
        answer:
            "تصل دقة التحليل إلى أكثر من 95% في استخراج البنود الحرجة، ومع ذلك ننصح دائماً بالمراجعة البشرية النهائية للقرارات الحساسة.",
    },
    {
        question: "هل بياناتي ووثائقي آمنة؟",
        answer:
            "نحن نأخذ أمن البيانات على محمل الجد. يتم تشفير جميع المستندات وفحصها في بيئة معزولة، ولا يتم مشاركتها مع أي طرف ثالث.",
    },
    {
        question: "هل يمكنني تحليل وثائق ضخمة؟ \"العطاءات\"؟",
        answer:
            "بالتأكيد. النظام مصمم للتعامل مع مستندات تصل إلى مئات الصفحات وتلخيصها واستخراج المعلومات المهمة منها بكفاءة.",
    },
]

export function FAQ() {
    return (
        <section id="faq" className="py-20 md:py-28">
            <div className="container max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        الأسئلة <span className="text-primary">الشائعة</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        كل ما تريد معرفته عن منصة محلل المناقصات.
                    </p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b-border/50">
                            <AccordionTrigger className="text-start text-lg">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
