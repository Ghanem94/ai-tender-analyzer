import { db } from "@/lib/db"

/**
 * Service class handling dynamic application settings stored in the database.
 */
export class SettingsService {
    /**
     * Retrieves all system settings and formats them as a key-value dictionary.
     * @returns Record of setting keys and their corresponding values
     */
    static async getAllSettings(): Promise<Record<string, string>> {
        const settings = await db.setting.findMany()

        const result: Record<string, string> = {}
        for (const s of settings) {
            result[s.key] = s.value
        }

        return result
    }

    /**
     * Creates or updates multiple settings at once.
     * @param body A dictionary of keys and values to upsert
     */
    static async updateSettings(body: Record<string, string>) {
        const keys = Object.keys(body)
        for (const key of keys) {
            await db.setting.upsert({
                where: { key },
                update: { value: body[key] },
                create: { key, value: body[key] },
            })
        }
        return { message: "تم حفظ الإعدادات بنجاح" }
    }
}
