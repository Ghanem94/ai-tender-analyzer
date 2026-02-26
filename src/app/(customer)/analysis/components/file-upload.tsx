"use client"

import { useState, useCallback } from "react"
import { UploadCloud, FileText, X, Loader2, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useRouter } from "next/navigation"
import { PDFDocument } from 'pdf-lib'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function FileUpload() {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0])
            setUploadError(null)
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            'application/pdf': ['.pdf'],
        }
    })

    const removeFile = () => {
        setFile(null)
        setUploadError(null)
    }

    const handleUpload = async () => {
        if (!file) return

        setIsUploading(true)
        setUploadError(null)

        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdfDoc = await PDFDocument.load(arrayBuffer)
            const pageCount = pdfDoc.getPageCount()

            if (pageCount > 100) {
                setUploadError('حجم الملف يتجاوز الحد المسموح به (100 صفحة).')
                setIsUploading(false)
                return
            }

            const formData = new FormData()
            formData.append('file', file)
            formData.append('fileName', file.name)
            formData.append('fileType', file.type)
            formData.append('pageCount', pageCount.toString())

            const response = await fetch('/api/analysis', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'فشل رفع الملف. يرجى المحاولة مرة أخرى.')
            }

            if (!data.status) {
                throw new Error(data.message || 'فشل رفع الملف.')
            }

            router.push(`/results/${data.analysisId}`)
        } catch (error: any) {
            console.error('Upload error:', error)
            setUploadError(error.message || 'حدث خطأ أثناء رفع الملف. يرجى التأكد من الاتصال ومحاولة مرة أخرى.')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto space-y-4">
            {uploadError && (
                <div className="flex items-start gap-4 p-5 relative overflow-hidden rounded-[32px] bg-red-50/80 border border-red-100 shadow-sm dark:bg-red-950/20 dark:border-red-900/30 transition-all animate-in fade-in slide-in-from-top-4">
                    <div className="absolute top-0 right-0 w-2 h-full bg-red-500" />
                    <div className="flex shrink-0 items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm border border-red-100 text-red-500 dark:bg-red-900/50 dark:border-red-800 dark:text-red-400">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div className="flex-1 pt-1">
                        <h4 className="text-lg font-bold text-red-900 dark:text-red-200 mb-1">
                            عذراً  !                        </h4>
                        <p className="text-sm font-medium text-red-600 dark:text-red-400 leading-relaxed">
                            {uploadError}
                        </p>
                    </div>
                    <button
                        onClick={() => setUploadError(null)}
                        className="shrink-0 flex items-center justify-center w-10 h-10 text-red-400 hover:text-red-600 hover:bg-white dark:hover:bg-red-900/50 rounded-xl transition-all shadow-sm border border-transparent hover:border-red-100 dark:hover:border-red-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}

            {!file ? (
                <div
                    {...getRootProps()}
                    className={cn(
                        "relative flex flex-col items-center justify-center w-full min-h-[400px] p-12 border-2 border-dashed rounded-[40px] cursor-pointer transition-all duration-200 ease-in-out bg-card hover:bg-accent/50",
                        isDragActive ? "border-primary bg-accent/50" : "border-border",
                    )}
                >
                    <input {...getInputProps()} />

                    <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                        <UploadCloud className="w-10 h-10" />
                    </div>

                    <h3 className="mb-2 text-2xl font-bold text-foreground">اضغط هنا لاختيار الملف</h3>
                    <p className="text-muted-foreground">أو قم بسحب وإفلات الملف هنا</p>
                </div>
            ) : (
                <div className="relative flex flex-col items-center justify-center w-full min-h-[400px] p-12 border-2 border-primary/20 rounded-[40px] bg-card">
                    <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-primary/10 text-primary">
                        <FileText className="w-10 h-10" />
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-foreground ltr">{file.name}</h3>
                    <p className="text-sm text-muted-foreground mb-8">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>

                    <div className="flex gap-4">
                        <Button onClick={removeFile} variant="outline" className="min-w-[120px]" disabled={isUploading}>
                            إلغاء
                        </Button>
                        <Button onClick={handleUpload} className="min-w-[120px]" disabled={isUploading}>
                            {isUploading ? (
                                <>
                                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                    جاري التحليل...
                                </>
                            ) : (
                                "بدء التحليل"
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
