import { NextResponse } from "next/server"
import { AdminService } from "@/services/admin.service"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const user = await AdminService.getUserById(id)

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error("Error fetching user details:", error)
        return NextResponse.json({ error: "Failed to fetch user details" }, { status: 500 })
    }
}
