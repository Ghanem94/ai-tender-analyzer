import { AdminSidebar } from "./components/admin-sidebar"
import { AdminHeader } from "./components/admin-header"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="grid h-screen w-full overflow-hidden md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <AdminSidebar className="hidden border-r bg-muted/40 md:block overflow-y-auto" />
            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader />
                <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-muted/10 gap-4 lg:gap-6 flex flex-col">
                    {children}
                </main>
            </div>
        </div>
    )
}
