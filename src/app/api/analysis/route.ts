import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth"

// POST: Create analysis from uploaded file
export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ message: "يجب تسجيل الدخول" }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get("file") as File | null
        const fileName = formData.get("fileName") as string || "unknown"
        const fileType = formData.get("fileType") as string || "unknown"

        if (!file) {
            return NextResponse.json({ message: "الملف مطلوب" }, { status: 400 })
        }

        // 1. Create Analysis record
        const analysis = await db.analysis.create({
            data: {
                userId: session.id as string,
                fileName,
                status: "PENDING",
            },
        })

        // 2. Create Document record
        await db.document.create({
            data: {
                userId: session.id as string,
                analysisId: analysis.id,
                name: fileName,
                type: fileType,
                size: file.size,
                url: `/uploads/${analysis.id}/${fileName}`,
            },
        })

        // 3. Update status to PROCESSING
        await db.analysis.update({
            where: { id: analysis.id },
            data: { status: "PROCESSING" },
        })

        // 4. Get webhook URL from settings
        const webhookSetting = await db.setting.findUnique({
            where: { key: "webhookTenderAnalysis" },
        })

        console.log("webhookSetting", webhookSetting)

        let analysisResult = null

        if (webhookSetting?.value) {
            try {
                // Send file to webhook
                const webhookFormData = new FormData()
                webhookFormData.append("file", file)
                webhookFormData.append("fileName", fileName)
                webhookFormData.append("fileType", fileType)
                webhookFormData.append("analysisId", analysis.id)

                const webhookResponse = await fetch(webhookSetting.value, {
                    method: "POST",
                    body: webhookFormData,
                })

                if (webhookResponse.ok) {
                    const jsonRes = await webhookResponse.json()
                    analysisResult = jsonRes.data || jsonRes
                    console.log("Extracted analysisResult:", analysisResult)
                }
            } catch (error) {
                console.error("Webhook error:", error)
            }
        }

        // 5. Save result
        if (analysisResult) {
            await db.analysis.update({
                where: { id: analysis.id },
                data: {
                    status: "COMPLETED",
                    riskScore: analysisResult.risk_score ?? analysisResult.riskScore ?? analysisResult.score ?? null,
                    summary: analysisResult.summary ?? null,
                    result: JSON.stringify(analysisResult),
                },
            })
        } else {
            // No webhook or webhook failed — mark as completed with no result
            await db.analysis.update({
                where: { id: analysis.id },
                data: {
                    status: "COMPLETED",
                    result: null,
                },
            })
        }

        return NextResponse.json({
            message: "تم التحليل بنجاح",
            analysisId: analysis.id,
            result: analysisResult,
        })
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

        if (id) {
            // Get single analysis
            const analysis = await db.analysis.findUnique({
                where: { id },
                include: { documents: true },
            })

            if (!analysis) {
                return NextResponse.json({ message: "التحليل غير موجود" }, { status: 404 })
            }

            // Only allow owner or admin
            if (analysis.userId !== session.id && session.role !== "ADMIN") {
                return NextResponse.json({ message: "غير مصرح" }, { status: 403 })
            }

            return NextResponse.json(analysis)
        } else {
            // List all analyses for user
            const analyses = await db.analysis.findMany({
                where: session.role === "ADMIN" ? {} : { userId: session.id as string },
                orderBy: { createdAt: "desc" },
                include: { documents: true },
            })

            return NextResponse.json(analyses)
        }
    } catch (error) {
        console.error("Fetch analysis error:", error)
        return NextResponse.json({ message: "خطأ في الخادم" }, { status: 500 })
    }
}
