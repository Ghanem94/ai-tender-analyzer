"use client"

import { useState, useCallback } from "react"
import { UploadCloud, FileText, X, Loader2, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useRouter } from "next/navigation"

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
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
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

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('https://biliteral-penni-thriftily.ngrok-free.dev/webhook-test/get_file', {
                method: 'POST',
                body: formData,
            })

            response.json().then(data => {
                console.log("============= | Data | =============");
                console.log(data)
            })




            if (!response.ok) {
                throw new Error('فشل رفع الملف. يرجى المحاولة مرة أخرى.')
            }

            // Ensure we handle response if needed, but for now redirect
            // const data = await response.json() 
            // In a real scenario, use data.id or similar for the redirect

            router.push('/results/1')
        } catch (error) {
            console.error('Upload error:', error)
            setUploadError('حدث خطأ أثناء رفع الملف. يرجى التأكد من الاتصال ومحاولة مرة أخرى.')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto space-y-4">
            {uploadError && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>خطأ</AlertTitle>
                    <AlertDescription>
                        {uploadError}
                    </AlertDescription>
                </Alert>
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
