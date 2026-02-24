import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function GET() {
    try {
        const session = await getSession()

        if (!session || session.role !== "ADMIN") {
            return NextResponse.json(
                { message: "غير مصرح لك بالوصول" },
                { status: 403 }
            )
        }

        const users = await db.user.findMany({
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

        return NextResponse.json(users)
    } catch (error) {
        console.error("Fetch users error:", error)
        return NextResponse.json(
            { message: "حدث خطأ أثناء جلب المستخدمين" },
            { status: 500 }
        )
    }
}
