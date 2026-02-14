"use client"

import { useState, useCallback } from "react"
import { UploadCloud, FileText, X } from "lucide-react"
import { useDropzone } from "react-dropzone"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function FileUpload() {
    const [file, setFile] = useState<File | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0])
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
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
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
                        <Button onClick={removeFile} variant="outline" className="min-w-[120px]">
                            إلغاء
                        </Button>
                        <Button className="min-w-[120px]">
                            بدء التحليل
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
