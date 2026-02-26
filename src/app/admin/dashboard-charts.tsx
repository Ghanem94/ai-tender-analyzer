"use client"

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

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

export function DashboardCharts() {
    return (
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
                                tickFormatter={(value) => "$" + value}
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
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card)' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="var(--primary)" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
