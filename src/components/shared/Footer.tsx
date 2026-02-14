import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t bg-muted/20">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <span className="text-xl font-bold text-primary">محلل المناقصات الذكي</span>
                        <p className="text-sm text-muted-foreground">
                            منصة ذكية لتحليل المناقصات ومساعدتك في اتخاذ قرارات واثقة في وقت قياسي.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">روابط سريعة</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="/" className="hover:text-primary">
                                    الرئيسية
                                </Link>
                            </li>
                            <li>
                                <Link href="#features" className="hover:text-primary">
                                    المميزات
                                </Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="hover:text-primary">
                                    الأسعار
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">قانوني</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-primary">
                                    سياسة الخصوصية
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-primary">
                                    الشروط والأحكام
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">تواصل معنا</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>support@example.com</li>
                            <li>+966 50 000 0000</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} محلل المناقصات الذكي. جميع الحقوق محفوظة.
                </div>
            </div>
        </footer>
    )
}
