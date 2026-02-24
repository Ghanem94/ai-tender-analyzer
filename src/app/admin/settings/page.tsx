"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Webhook, Globe, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    const [settings, setSettings] = useState({
        siteName: "محلل المناقصات الذكي",
        siteDescription: "منصة تحليل المناقصات بالذكاء الاصطناعي",
        webhookTenderAnalysis: "",
        webhookCustomerResponse: "",
    })

    // Load saved settings from database
    useEffect(() => {
        async function loadSettings() {
            try {
                const response = await fetch("/api/admin/settings")
                if (response.ok) {
                    const data = await response.json()
                    setSettings((prev) => ({ ...prev, ...data }))
                }
            } catch (error) {
                console.error("Failed to load settings", error)
            }
        }
        loadSettings()
    }, [])

    async function handleSave() {
        setIsLoading(true)
        setIsSaved(false)

        try {
            const response = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            })

            if (response.ok) {
                setIsSaved(true)
                setTimeout(() => setIsSaved(false), 3000)
            }
        } catch (error) {
            console.error("Failed to save settings", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">الإعدادات العامة</h1>
                <p className="text-muted-foreground">
                    إدارة إعدادات النظام وروابط الويب هوك
                </p>
            </div>

            {/* General Settings */}
            <div className="rounded-xl border bg-card p-6 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">إعدادات الموقع</h2>
                        <p className="text-sm text-muted-foreground">تخصيص المعلومات الأساسية للمنصة</p>
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="space-y-2">
                        <Label className="block">اسم الموقع</Label>
                        <Input
                            value={settings.siteName}
                            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                            placeholder="اسم الموقع"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="block">وصف الموقع</Label>
                        <Input
                            value={settings.siteDescription}
                            onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                            placeholder="وصف مختصر للموقع"
                        />
                    </div>
                </div>
            </div>

            {/* Webhook Settings */}
            <div className="rounded-xl border bg-card p-6 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Webhook className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">روابط الويب هوك</h2>
                        <p className="text-sm text-muted-foreground">ربط النظام بخدمات الذكاء الاصطناعي الخارجية</p>
                    </div>
                </div>

                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label className="block font-medium">
                            وكيل تحليل المناقصات
                        </Label>
                        <p className="text-xs text-muted-foreground">
                            رابط الويب هوك الخاص بوكيل تحليل المناقصات بالذكاء الاصطناعي
                        </p>
                        <Input
                            value={settings.webhookTenderAnalysis}
                            onChange={(e) => setSettings({ ...settings, webhookTenderAnalysis: e.target.value })}
                            placeholder="https://example.com/webhook/tender-analysis"
                            dir="ltr"
                            className="text-left"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="block font-medium">
                            الرد على العملاء
                        </Label>
                        <p className="text-xs text-muted-foreground">
                            رابط الويب هوك الخاص بالرد الآلي على استفسارات العملاء
                        </p>
                        <Input
                            value={settings.webhookCustomerResponse}
                            onChange={(e) => setSettings({ ...settings, webhookCustomerResponse: e.target.value })}
                            placeholder="https://example.com/webhook/customer-response"
                            dir="ltr"
                            className="text-left"
                        />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-4">
                <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    حفظ الإعدادات
                </Button>
                {isSaved && (
                    <p className="text-sm text-green-500 font-medium">✓ تم حفظ الإعدادات بنجاح</p>
                )}
            </div>
        </div>
    )
}
