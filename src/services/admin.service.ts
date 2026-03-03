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

        // 2. Total Users
        const totalUsersCount = await db.user.count()

        // 3. Available User Credits (Points)
        const availableCreditsAggr = await db.subscription.aggregate({
            where: { status: "ACTIVE" },
            _sum: { analysisLimit: true },
        })
        const availableUserCredits = availableCreditsAggr._sum.analysisLimit || 0

        // 4. Total Analyzed Files
        const totalAnalyzedFiles = await db.analysis.count()

        // Keep existing counts for potential internal use or future expansion
        const activeSubscriptionsCount = await db.subscription.count({
            where: { status: "ACTIVE" },
        })
        const openTicketsCount = await db.ticket.count({
            where: { status: "OPEN" },
        })

        return {
            totalRevenue,
            totalUsersCount,
            availableUserCredits,
            totalAnalyzedFiles,
            activeSubscriptionsCount,
            openTicketsCount
        }
    }

    /**
     * Retrieves all invoices (payments) from the system.
     * @returns A list of payment objects with associated user emails
     */
    static async getAllInvoices() {
        return db.payment.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
            },
        })
    }

    /**
     * Retrieves a single user by their ID with all relevant relations.
     * @param id The user's ID
     * @returns User object with subscription, payments, and analyses
     */
    static async getUserById(id: string) {
        return db.user.findUnique({
            where: { id },
            include: {
                subscription: true,
                payments: {
                    orderBy: { createdAt: "desc" },
                },
                analyses: {
                    orderBy: { createdAt: "desc" },
                },
            },
        })
    }
}

