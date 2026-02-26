import { NextResponse } from "next/server"
import { loginSchema } from "@/lib/validations/auth"
import { AuthService } from "@/services/auth.service"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password } = loginSchema.parse(body)

        try {
            const { user, token } = await AuthService.loginUser({ email, password })

            const response = NextResponse.json(
                { message: "تم تسجيل الدخول بنجاح", user },
                { status: 200 }
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
            if (innerError.message === "INVALID_CREDENTIALS") {
                return NextResponse.json(
                    { message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" },
                    { status: 401 }
                )
            }
            throw innerError
        }
    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json(
            { message: "حدث خطأ أثناء تسجيل الدخول" },
            { status: 500 }
        )
    }
}
