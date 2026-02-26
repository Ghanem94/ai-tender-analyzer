import { NextResponse } from "next/server"
import { registerSchema } from "@/lib/validations/auth"
import { AuthService } from "@/services/auth.service"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password, name } = registerSchema.parse(body)

        try {
            const { user, token } = await AuthService.registerUser({ email, password, name })

            const response = NextResponse.json(
                { message: "تم إنشاء الحساب بنجاح", user },
                { status: 201 }
            )

            response.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24, // 1 day
            })

            return response
        } catch (innerError: any) {
            if (innerError.message === "EMAIL_EXISTS") {
                return NextResponse.json(
                    { message: "البريد الإلكتروني مسجل بالفعل" },
                    { status: 409 }
                )
            }
            throw innerError
        }
    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json(
            { message: "حدث خطأ أثناء إنشاء الحساب" },
            { status: 500 }
        )
    }
}
