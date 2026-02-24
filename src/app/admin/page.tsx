"use client"

import { Users, CreditCard, Activity, DollarSign } from "lucide-react"
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Area,
    AreaChart,
    CartesianGrid
} from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Database, Zap, Coins } from "lucide-react"

const overviewData = [
    { name: "يناير", total: 1500 },
    { name: "فبراير", total: 2300 },
    { name: "مارس", total: 3200 },
    { name: "أبريل", total: 2800 },
    { name: "مايو", total: 4100 },
    { name: "يونيو", total: 3500 },
    { name: "يوليو", total: 5200 },
    { name: "أغسطس", total: 4800 },
    { name: "سبتمبر", total: 5800 },
    { name: "أكتوبر", total: 6000 },
    { name: "نوفمبر", total: 7200 },
    { name: "ديسمبر", total: 8500 },
]

const activityData = [
    { time: "00:00", value: 400 },
    { time: "04:00", value: 300 },
    { time: "08:00", value: 200 },
    { time: "12:00", value: 800 },
    { time: "16:00", value: 1200 },
    { time: "20:00", value: 900 },
    { time: "23:59", value: 600 },
]

export default function AdminDashboard() {
    return (
        <div className="space-y-8 p-4">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">نظرة عامة على النظام</h2>
                <p className="text-muted-foreground mt-2">تحليلات الأداء المباشرة ومؤشرات النمو.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            إجمالي الإيرادات
                        </CardTitle>
                        <div className="p-2 bg-emerald-500/10 rounded-full text-emerald-500">
                            <DollarSign className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">45,231.89 ر.س</div>
                        <p className="text-xs font-medium text-emerald-500 flex items-center mt-1">
                            +20.1% <span className="text-muted-foreground mr-1">من الشهر الماضي</span>
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            الاشتراكات النشطة
                        </CardTitle>
                        <div className="p-2 bg-blue-500/10 rounded-full text-blue-500">
                            <Users className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">+2350</div>
                        <p className="text-xs font-medium text-emerald-500 flex items-center mt-1">
                            +180.1% <span className="text-muted-foreground mr-1">من الشهر الماضي</span>
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">المبيعات</CardTitle>
                        <div className="p-2 bg-orange-500/10 rounded-full text-orange-500">
                            <CreditCard className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">+12,234</div>
                        <p className="text-xs font-medium text-emerald-500 flex items-center mt-1">
                            +19% <span className="text-muted-foreground mr-1">من الشهر الماضي</span>
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">نشاط الآن</CardTitle>
                        <div className="p-2 bg-purple-500/10 rounded-full text-purple-500">
                            <Activity className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">+573</div>
                        <p className="text-xs font-medium text-emerald-500 flex items-center mt-1">
                            +201 <span className="text-muted-foreground mr-1">منذ الساعة الوراء</span>
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            إجمالي التوكنات المستهلكة
                        </CardTitle>
                        <div className="p-2 bg-indigo-500/10 rounded-full text-indigo-500">
                            <Zap className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">1.2M</div>
                        <p className="text-xs font-medium text-emerald-500 flex items-center mt-1">
                            +12.5% <span className="text-muted-foreground mr-1">من الشهر الماضي</span>
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            تكلفة الـ API التقديرية (LLM)
                        </CardTitle>
                        <div className="p-2 bg-rose-500/10 rounded-full text-rose-500">
                            <Database className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">$450.00</div>
                        <p className="text-xs font-medium text-rose-500 flex items-center mt-1">
                            +5% <span className="text-muted-foreground mr-1">عن الميزانية</span>
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            الرصيد المتاح للعملاء
                        </CardTitle>
                        <div className="p-2 bg-amber-500/10 rounded-full text-amber-500">
                            <Coins className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">15,430 ملف</div>
                        <p className="text-xs font-medium text-muted-foreground mt-1 text-right">
                            إجمالي الملفات غير المستهلكة
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>نظرة عامة على الإيرادات</CardTitle>
                        <CardDescription>
                            تحليل الإيرادات السنوية لعام 2024
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={overviewData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                <XAxis
                                    dataKey="name"
                                    stroke="var(--muted-foreground)"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="var(--muted-foreground)"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
                                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card)' }}
                                />
                                <Bar dataKey="total" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-3 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>النشاط اليومي</CardTitle>
                        <CardDescription>
                            توزيع النشاط على مدار اليوم
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                <XAxis
                                    dataKey="time"
                                    stroke="var(--muted-foreground)"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    hide
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card)' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="var(--primary)" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
