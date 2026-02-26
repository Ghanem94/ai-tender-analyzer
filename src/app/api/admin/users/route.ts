import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { AdminService } from "@/services/admin.service"

export async function GET() {
    try {
        const session = await getSession()

        if (!session || session.role !== "ADMIN") {
            return NextResponse.json(
                { message: "غير مصرح لك بالوصول" },
                { status: 403 }
            )
        }

        const users = await AdminService.getAllUsers()
        return NextResponse.json(users)
    } catch (error) {
        console.error("Fetch users error:", error)
        return NextResponse.json(
            { message: "حدث خطأ أثناء جلب المستخدمين" },
            { status: 500 }
        )
    }
}
