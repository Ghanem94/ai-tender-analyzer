"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter as DialogFooterUI,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, UploadCloud } from "lucide-react"

export function CreateTicketDialog() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-2xl gap-3 h-14 bg-primary hover:bg-primary/80 text-white px-8 text-base font-bold shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
                    <PlusCircle className="w-5 h-5" />
                    فتح تذكرة جديدة
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[2rem] p-8" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#1A1A1A] mb-2">فتح تذكرة جديدة</DialogTitle>
                    <DialogDescription className="text-[#7D7D7D] text-base">
                        يرجى ملء النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                    <div className="space-y-3">
                        <Label htmlFor="subject" className="text-right text-sm font-bold text-[#1A1A1A]">
                            عنوان المشكلة
                        </Label>
                        <Input id="subject" placeholder="أدخل عنواناً واضحاً لمشكلتك" className="h-12 rounded-xl bg-[#F8F9FA] border-[#E6E4DF] focus-visible:ring-[#9A8D59]" />
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="category" className="text-right text-sm font-bold text-[#1A1A1A]">
                            نوع المشكلة
                        </Label>
                        <select id="category" className="flex h-12 w-full rounded-xl border border-[#E6E4DF] bg-[#F8F9FA] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A8D59] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue={""}>
                            <option value="" disabled>اختر نوع المشكلة</option>
                            <option value="technical">مشكلة تقنية</option>
                            <option value="billing">استفسار مالي</option>
                            <option value="account">إدارة الحساب</option>
                            <option value="other">أخرى</option>
                        </select>
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="description" className="text-right text-sm font-bold text-[#1A1A1A]">
                            وصف المشكلة
                        </Label>
                        <textarea
                            id="description"
                            className="flex min-h-[120px] w-full rounded-xl border border-[#E6E4DF] bg-[#F8F9FA] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A8D59] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                            placeholder="يرجى وصف المشكلة بالتفصيل لمساعدتنا في حلها بشكل أسرع..."
                        />
                    </div>
                    <div className="space-y-3 mt-4">
                        <Label htmlFor="image" className="text-right text-sm font-bold text-[#1A1A1A]">
                            إرفاق صورة (اختياري)
                        </Label>
                        <div className="relative">
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />
                            <Label
                                htmlFor="image"
                                className="flex flex-col items-center justify-center w-full min-h-[100px] border-2 border-dashed border-[#E6E4DF] hover:border-[#9A8D59] rounded-xl bg-[#F8F9FA] hover:bg-white transition-colors cursor-pointer"
                            >
                                <UploadCloud className="w-6 h-6 text-[#9A8D59] mb-2" />
                                <span className="text-sm font-medium text-[#7D7D7D]">انقر لاختيار صورة</span>
                                <span className="text-xs text-[#9A8D59] mt-1">PNG, JPG حتى 5MB</span>
                            </Label>
                        </div>
                    </div>
                </div>
                <DialogFooterUI className="sm:justify-start gap-3 flex-row-reverse">
                    <Button type="submit" className="h-12 rounded-xl bg-[#9A8D59] hover:bg-[#8A7D49] text-white font-bold px-8" onClick={() => setIsDialogOpen(false)}>
                        إرسال التذكرة
                    </Button>
                    <Button type="button" variant="outline" className="h-12 rounded-xl border-[#E6E4DF] text-[#7D7D7D] font-bold px-8 hover:bg-gray-50" onClick={() => setIsDialogOpen(false)}>
                        إلغاء
                    </Button>
                </DialogFooterUI>
            </DialogContent>
        </Dialog>
    )
}
