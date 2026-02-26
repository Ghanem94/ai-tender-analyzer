import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { AnalysisService } from "@/services/analysis.service"

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ message: "يجب تسجيل الدخول" }, { status: 401 })
        }

        const { id } = await params

        try {
            const result = await AnalysisService.deleteAnalysis(id, session.id as string, session.role as string)
            return NextResponse.json(result)
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
        console.error("Delete analysis error:", error)
        return NextResponse.json({ message: "خطأ في الخادم" }, { status: 500 })
    }
}
