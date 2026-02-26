import { Badge } from "@/components/ui/badge"

/**
 * Renders a stylized badge indicating the current state of an analysis or operation.
 * @param status The status string (e.g. COMPLETED, PROCESSING, FAILED)
 */
export function StatusBadge({ status, className = "" }: { status: string, className?: string }) {
    const s = status.toUpperCase()
    if (s === "COMPLETED" || s === "مكتمل") {
        return <Badge className={`bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none ${className}`}>مكتمل</Badge>
    }
    if (s === "PROCESSING" || s === "قيد التحليل") {
        return <Badge className={`bg-blue-100 text-blue-700 hover:bg-blue-200 border-none ${className}`}>قيد التحليل</Badge>
    }
    if (s === "FAILED" || s === "فشل") {
        return <Badge className={`bg-red-100 text-red-700 hover:bg-red-200 border-none ${className}`}>فشل</Badge>
    }
    if (s === "معلق") {
        return <Badge className={`bg-amber-100 text-amber-700 hover:bg-amber-200 border-none ${className}`}>معلق</Badge>
    }
    return <Badge variant="secondary" className={className}>{status === "قيد الانتظار" ? "قيد الانتظار" : "قيد الانتظار"}</Badge>
}

/**
 * Renders a stylized badge indicating the risk level based on a numeric score.
 * Higher scores indicate higher risk.
 * @param score The risk score (0-100) or null if undetermined
 */
export function RiskBadge({ score }: { score: number | null }) {
    if (score === null || score === undefined) return <Badge variant="secondary">غير محدد</Badge>

    // Using the same logic as the results/[id] page (>=70 is high risk)
    if (score >= 70)
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">مرتفع</Badge>
    if (score >= 40)
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-none">متوسط</Badge>

    return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">منخفض</Badge>
}
