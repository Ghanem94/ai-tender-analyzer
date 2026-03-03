import { NextResponse } from "next/server"
import { AdminService } from "@/services/admin.service"

export async function GET() {
    try {
        const invoices = await AdminService.getAllInvoices()
        return NextResponse.json(invoices)
    } catch (error) {
        console.error("[ADMIN_INVOICES_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
