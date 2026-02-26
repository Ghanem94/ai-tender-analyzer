import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { SettingsService } from "@/services/settings.service"

// GET: Fetch all settings
export async function GET() {
    try {
        const session = await getSession()
        if (!session || session.role !== "ADMIN") {
            return NextResponse.json({ message: "غير مصرح" }, { status: 403 })
        }

        const result = await SettingsService.getAllSettings()

        return NextResponse.json(result)
    } catch (error) {
        console.error("Failed to fetch settings", error)
        return NextResponse.json({ message: "خطأ في الخادم" }, { status: 500 })
    }
}

// POST: Save settings
export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session || session.role !== "ADMIN") {
            return NextResponse.json({ message: "غير مصرح" }, { status: 403 })
        }

        const body = await request.json()

        const result = await SettingsService.updateSettings(body)

        return NextResponse.json(result)
    } catch (error) {
        console.error("Failed to save settings", error)
        return NextResponse.json({ message: "خطأ في الخادم" }, { status: 500 })
    }
}
