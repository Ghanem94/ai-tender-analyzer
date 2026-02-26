"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter as DialogFooterUI,
} from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"

interface DeleteTicketDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

export function DeleteTicketDialog({ isOpen, onClose, onConfirm }: DeleteTicketDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent dir="rtl" className="sm:max-w-[400px] overflow-hidden p-0 rounded-[2rem] border-none shadow-2xl bg-white">
                <div className="bg-red-50 py-8 px-6 flex flex-col items-center justify-center border-b border-red-100">
                    <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4 shadow-sm border border-red-200">
                        <AlertTriangle className="w-10 h-10 text-red-600" strokeWidth={2.5} />
                    </div>
                    <DialogTitle className="text-center text-xl font-bold text-red-600">تأكيد الحذف</DialogTitle>
                </div>
                <div className="p-8 pt-6">
                    <DialogHeader>
                        <DialogDescription className="text-center text-[#4A4A4A] text-base leading-relaxed font-medium">
                            هل أنت متأكد من رغبتك في حذف تذكرة الدعم هذه؟
                            <br />
                            <span className="text-destructive font-medium block mt-2">لا يمكن التراجع عن هذا الإجراء وسيتم مسح جميع تفاصيل التذكرة.</span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooterUI className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-center">
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto h-12 rounded-xl border-[#E6E4DF] text-[#7D7D7D] font-bold hover:bg-gray-50 bg-white"
                            onClick={onClose}
                        >
                            تراجع
                        </Button>
                        <Button
                            variant="destructive"
                            className="w-full sm:w-auto h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transition-shadow"
                            onClick={onConfirm}
                        >
                            نعم، تأكيد الحذف
                        </Button>
                    </DialogFooterUI>
                </div>
            </DialogContent>
        </Dialog>
    )
}
