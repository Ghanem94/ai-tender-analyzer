import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth"

// GET: Fetch all settings
export async function GET() {
    try {
        const session = await getSession()
        if (!session || session.role !== "ADMIN") {
            return NextResponse.json({ message: "غير مصرح" }, { status: 403 })
        }

        const settings = await db.setting.findMany()

        // Convert array to object { key: value }
        const result: Record<string, string> = {}
        for (const s of settings) {
            result[s.key] = s.value
        }

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

        // Upsert each setting
        const keys = Object.keys(body)
        for (const key of keys) {
            await db.setting.upsert({
                where: { key },
                update: { value: body[key] },
                create: { key, value: body[key] },
            })
        }

        return NextResponse.json({ message: "تم حفظ الإعدادات بنجاح" })
    } catch (error) {
        console.error("Failed to save settings", error)
        return NextResponse.json({ message: "خطأ في الخادم" }, { status: 500 })
    }
}
