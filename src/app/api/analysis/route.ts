import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { AnalysisService } from "@/services/analysis.service"

// POST: Create analysis from uploaded file
export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ message: "يجب تسجيل الدخول" }, { status: 401 })
        }

        const formData = await request.formData()

        try {
            const result = await AnalysisService.uploadAndAnalyze(formData, session.id as string)
            return NextResponse.json(result)
        } catch (innerError: any) {
            if (innerError.message === "FILE_REQUIRED") {
                return NextResponse.json({ message: "الملف مطلوب" }, { status: 400 })
            }
            if (innerError.message.startsWith("WEBHOOK_FAILED:")) {
                return NextResponse.json({
                    status: false,
                    message: "فشل الاتصال   ",
                    error: innerError.message.replace("WEBHOOK_FAILED:", "")
                }, { status: 502 })
            }
            throw innerError
        }
    } catch (error) {
        console.error("Analysis error:", error)
        return NextResponse.json({ message: "خطأ في الخادم" }, { status: 500 })
    }
}

// GET: Fetch analysis by ID or list all for user
export async function GET(request: Request) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ message: "يجب تسجيل الدخول" }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        try {
            if (id) {
                // Get single analysis
                const analysis = await AnalysisService.getAnalysis(id, session.id as string, session.role as string)
                return NextResponse.json(analysis)
            } else {
                // List analyses based on role
                if (session.role === "ADMIN") {
                    const analyses = await AnalysisService.getAllAnalyses()
                    return NextResponse.json(analyses)
                } else {
                    const analyses = await AnalysisService.getUserAnalyses(session.id as string)
                    return NextResponse.json(analyses)
                }
            }
        } catch (innerError: any) {
            if (innerError.message === "NOT_FOUND") {
                return NextResponse.json({ message: "التحليل غير موجود" }, { status: 404 })
            }
            if (innerError.message === "UNAUTHORIZED") {
                return NextResponse.json({ message: "غير مصرح" }, { status: 403 })
            }
            throw innerError
        }
    } catch (error) {
        console.error("Fetch analysis error:", error)
        return NextResponse.json({ message: "خطأ في الخادم" }, { status: 500 })
    }
}
