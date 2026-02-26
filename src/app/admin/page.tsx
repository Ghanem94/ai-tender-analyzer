import { AdminService } from "@/services/admin.service"
import { Users, CreditCard, Activity, DollarSign, Database, Zap, Coins, TicketIcon } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { DashboardCharts } from "./dashboard-charts"

export default async function AdminDashboard() {
    const kpis = await AdminService.getDashboardKPIs()

    const {
        totalRevenue,
        activeSubscriptionsCount,
        totalSubscriptionsCount,
        availableUserCredits,
        openTicketsCount
    } = kpis

    return (
        <div className="space-y-8 p-4">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">نظرة عامة على النظام</h2>
                <p className="text-muted-foreground mt-2">تحليلات الأداء المباشرة ومؤشرات النمو بناءً على البيانات الفعلية.</p>
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
                        <div className="text-3xl font-bold text-foreground ltr">{totalRevenue.toLocaleString()} ر.س</div>
                        <p className="text-xs font-medium text-emerald-500 flex items-center mt-1">
                            تم تحصيلها بنجاح
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            الاشتراكات النشطة
                        </CardTitle>
                        <div className="p-2 bg-blue-500/10 rounded-full text-blue-500">
                            <Activity className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground ltr">{activeSubscriptionsCount.toLocaleString()}</div>
                        <p className="text-xs font-medium text-blue-500 flex items-center mt-1">
                            اشتراكات فعالة حالياً
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">مجموع الاشتراكات</CardTitle>
                        <div className="p-2 bg-purple-500/10 rounded-full text-purple-500">
                            <Users className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground ltr">{totalSubscriptionsCount.toLocaleString()}</div>
                        <p className="text-xs font-medium text-purple-500 flex items-center mt-1">
                            إجمالي المسجلين في النظام
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">الرصيد المتاح للعملاء</CardTitle>
                        <div className="p-2 bg-amber-500/10 rounded-full text-amber-500">
                            <Coins className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground ltr">{availableUserCredits.toLocaleString()} ملف</div>
                        <p className="text-xs font-medium text-amber-500 flex items-center mt-1">
                            رصيد غير مستهلك
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            التذاكر المفتوحة
                        </CardTitle>
                        <div className="p-2 bg-rose-500/10 rounded-full text-rose-500">
                            <TicketIcon className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground ltr">{openTicketsCount.toLocaleString()}</div>
                        <p className="text-xs font-medium text-rose-500 flex items-center mt-1">
                            تذاكر بحاجة للمعالجة
                        </p>
                    </CardContent>
                </Card>
            </div>

            <DashboardCharts />
        </div>
    )
}
