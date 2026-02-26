import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

import { SubscriptionsTable } from "./components/subscriptions-table"

const subscriptions = [
    {
        id: "SUB-1001",
        user: "Ahmed Mohamed",
        plan: "Pro",
        status: "Active",
        date: "2024-02-14",
        amount: "$29.00",
    },
    {
        id: "SUB-1002",
        user: "Sarah Johnson",
        plan: "Basic",
        status: "Active",
        date: "2024-02-13",
        amount: "$9.00",
    },
    {
        id: "SUB-1003",
        user: "Tech Corp",
        plan: "Enterprise",
        status: "Pending",
        date: "2024-02-12",
        amount: "$99.00",
    },
    {
        id: "SUB-1004",
        user: "Khaled Ali",
        plan: "Pro",
        status: "Cancelled",
        date: "2024-02-10",
        amount: "$29.00",
    },
]

export default function SubscriptionsPage() {
    return (
        <div className="space-y-6 p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">إدارة الاشتراكات</h3>
                    <p className="text-muted-foreground mt-1">
                        عرض وإدارة اشتراكات المستخدمين وتفاصيل الدفع.
                    </p>
                </div>
                <Button variant="outline" className="gap-2 rounded-xl">
                    <Filter className="h-4 w-4" />
                    تصفية النتائج
                </Button>
            </div>

            <SubscriptionsTable subscriptions={subscriptions} />
        </div>
    )
}
