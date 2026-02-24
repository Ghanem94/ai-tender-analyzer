import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { loginSchema } from "@/lib/validations/auth"
import { signToken } from "@/lib/auth"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password } = loginSchema.parse(body)

        const user = await db.user.findUnique({
            where: { email },
        })

        if (!user) {
            return NextResponse.json(
                { message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" },
                { status: 401 }
            )
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" },
                { status: 401 }
            )
        }

        const { password: _, ...userWithoutPassword } = user

        // Create JWT token
        const token = await signToken(userWithoutPassword)

        const response = NextResponse.json(
            { message: "تم تسجيل الدخول بنجاح", user: userWithoutPassword },
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
    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json(
            { message: "حدث خطأ أثناء تسجيل الدخول" },
            { status: 500 }
        )
    }
}
