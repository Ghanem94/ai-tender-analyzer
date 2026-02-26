import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AdminHeader() {
    return (
        <header className="flex h-20 items-center gap-4 border-b bg-background/50 backdrop-blur-xl px-8 lg:px-8 sticky top-0 z-50">
            <div className="w-full flex-1 md:w-auto md:flex-none">
                <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="بحث سريع..."
                        className="pr-10 h-10 w-[200px] lg:w-[300px] rounded-xl bg-muted/50 border-transparent focus:bg-background focus:border-primary/20 transition-all"
                    />
                </div>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background" />
                </Button>
                <div className="h-8 w-px bg-border/50 mx-2" />
                <div className="flex items-center gap-3 pl-2">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-semibold text-foreground">المشرف العام</span>
                        <span className="text-xs text-muted-foreground">admin@example.com</span>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold ring-2 ring-background shadow-lg">
                        A
                    </div>
                </div>
            </div>
        </header>
    )
}
