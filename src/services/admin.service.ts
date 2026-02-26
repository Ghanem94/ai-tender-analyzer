import { db } from "@/lib/db"

/**
 * Service class handling administrative operations, including user management and KPI metrics.
 */
export class AdminService {
    /**
     * Retrieves all users along with their subscription limits.
     * @returns A list of user objects with basic info and subscription data
     */
    static async getAllUsers() {
        return db.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                subscription: {
                    select: {
                        plan: true,
                        analysisLimit: true,
                    },
                },
            },
        })
    }

    /**
     * Calculates and retrieves key performance indicators for the admin dashboard.
     * @returns Object containing revenue, subscription counts, and active ticket metrics
     */
    static async getDashboardKPIs() {
        // 1. Total Revenue
        const totalRevenueAggr = await db.payment.aggregate({
            where: { status: "COMPLETED" },
            _sum: { amount: true },
        })
        const totalRevenue = totalRevenueAggr._sum.amount || 0

        // 2. Active Subscriptions
        const activeSubscriptionsCount = await db.subscription.count({
            where: { status: "ACTIVE" },
        })

        // 3. Total Subscriptions
        const totalSubscriptionsCount = await db.subscription.count()

        // 4. Available User Credits
        const availableCreditsAggr = await db.subscription.aggregate({
            where: { status: "ACTIVE" },
            _sum: { analysisLimit: true },
        })
        const availableUserCredits = availableCreditsAggr._sum.analysisLimit || 0

        // 5. Open Tickets
        const openTicketsCount = await db.ticket.count({
            where: { status: "OPEN" },
        })

        return {
            totalRevenue,
            activeSubscriptionsCount,
            totalSubscriptionsCount,
            availableUserCredits,
            openTicketsCount
        }
    }
}
