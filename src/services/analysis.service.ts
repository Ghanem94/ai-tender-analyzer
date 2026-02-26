import { db } from "@/lib/db"

/**
 * Service class handling business logic for Analyses, including database operations and webhook integrations.
 */
export class AnalysisService {
    /**
     * Uploads a file, sends it to the configured webhook for analysis, and creates records in the DB.
     * @param formData The form data containing the file and metadata
     * @param userId The ID of the user uploading the file
     * @returns The extracted analysis result and the created analysis details
     */
    static async uploadAndAnalyze(formData: FormData, userId: string) {
        const file = formData.get("file") as File | null
        const fileName = (formData.get("fileName") as string) || "unknown"
        const fileType = (formData.get("fileType") as string) || "unknown"
        const pageCount = formData.get("pageCount") as string | null

        if (!file) {
            throw new Error("FILE_REQUIRED")
        }

        // Get webhook URL from settings
        const webhookSetting = await db.setting.findUnique({
            where: { key: "webhookTenderAnalysis" },
        })

        let analysisResult = null

        if (webhookSetting?.value) {
            try {
                // Send file to webhook
                const webhookFormData = new FormData()
                webhookFormData.append("file", file)
                webhookFormData.append("fileName", fileName)
                webhookFormData.append("fileType", fileType)
                if (pageCount) {
                    webhookFormData.append("pageCount", pageCount)
                }

                const webhookResponse = await fetch(webhookSetting.value, {
                    method: "POST",
                    body: webhookFormData,
                })
                if (!webhookResponse.ok) {
                    throw new Error(`مشكلة في الاتصال: ${webhookResponse.status} ${webhookResponse.statusText}`)
                }

                const jsonRes = await webhookResponse.json()
                // Handle case where json is an array like [{ result: { ... } }]
                if (Array.isArray(jsonRes) && jsonRes[0]?.result) {
                    analysisResult = jsonRes[0].result
                } else if (jsonRes.result) {
                    analysisResult = jsonRes.result
                } else {
                    analysisResult = jsonRes
                }
            } catch (error: any) {
                throw new Error("WEBHOOK_FAILED:" + error.message)
            }
        }

        let analysis = null
        // Save result
        if (analysisResult && analysisResult.status === "success") {
            // Create Analysis record
            analysis = await db.analysis.create({
                data: {
                    userId: userId,
                    fileName,
                    status: "COMPLETED",
                    result: JSON.stringify(analysisResult),
                    riskScore: analysisResult.data?.risk_score,
                    summary: analysisResult.data?.summary,
                    recommendation: typeof analysisResult.data?.recommendation === "string" ? analysisResult.data.recommendation : JSON.stringify(analysisResult.data?.recommendation),
                    statusColor: analysisResult.data?.status_color,
                    legalAnalysis: analysisResult.data?.legal_analysis || [],
                    technicalRequirements: analysisResult.data?.technical_requirements || [],
                    timeline: analysisResult.data?.timeline,
                    financialTerms: analysisResult.data?.financial_terms,
                },
            })

            // Create Document record
            await db.document.create({
                data: {
                    userId: userId,
                    analysisId: analysis.id,
                    name: fileName,
                    type: fileType,
                    size: file.size,
                    url: `/uploads/${analysis.id}/${fileName}`,
                },
            })
        }

        return {
            status: analysisResult?.status === "success",
            message: analysisResult?.message,
            ...(analysis?.id && { analysisId: analysis.id }),
            result: analysisResult,
        }
    }

    /**
     * Retrieves a single analysis by its ID, enforcing authorization.
     * @param id The ID of the analysis
     * @param userId The ID of the authenticated user
     * @param userRole The role of the authenticated user (e.g., ADMIN, USER)
     * @returns The analysis record with its associated documents
     */
    static async getAnalysis(id: string, userId: string, userRole: string) {
        const analysis = await db.analysis.findUnique({
            where: { id },
            include: { documents: true },
        })

        if (!analysis) {
            throw new Error("NOT_FOUND")
        }

        // Only allow owner or admin
        if (analysis.userId !== userId && userRole !== "ADMIN") {
            throw new Error("UNAUTHORIZED")
        }

        return analysis
    }

    /**
     * Retrieves all analyses for an admin.
     * @returns List of all analyses ordered by creation date
     */
    static async getAllAnalyses() {
        return db.analysis.findMany({
            orderBy: { createdAt: "desc" },
            include: { documents: true },
        })
    }

    /**
     * Retrieves all analyses owned by a specific user.
     * @param userId The ID of the authenticated user
     * @returns List of user's analyses ordered by creation date
     */
    static async getUserAnalyses(userId: string) {
        return db.analysis.findMany({
            where: { userId: userId },
            orderBy: { createdAt: "desc" },
            include: { documents: true },
        })
    }

    /**
     * Deletes an analysis record and its associated documents, enforcing authorization.
     * @param id The ID of the analysis to delete
     * @param userId The ID of the authenticated user
     * @param userRole The role of the authenticated user
     */
    static async deleteAnalysis(id: string, userId: string, userRole: string) {
        const analysis = await db.analysis.findUnique({
            where: { id },
        })

        if (!analysis) {
            throw new Error("NOT_FOUND")
        }

        // Only allow owner or admin to delete
        if (analysis.userId !== userId && userRole !== "ADMIN") {
            throw new Error("UNAUTHORIZED")
        }

        // Delete documents associated with the analysis first
        await db.document.deleteMany({
            where: { analysisId: id },
        })

        // Then delete the analysis
        await db.analysis.delete({
            where: { id },
        })

        return { success: true, message: "تم الحذف بنجاح" }
    }
}
