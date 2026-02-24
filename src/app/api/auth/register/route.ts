import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { registerSchema } from "@/lib/validations/auth"
import { signToken } from "@/lib/auth"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password, name } = registerSchema.parse(body)

        const existingUser = await db.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { message: "البريد الإلكتروني مسجل بالفعل" },
                { status: 409 }
            )
        }

        // Check if this is the first user
        const userCount = await db.user.count()
        const role = userCount === 0 ? "ADMIN" : "USER"

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        })

        const { password: _, ...userWithoutPassword } = user

        // Create JWT token
        const token = await signToken(userWithoutPassword)

        const response = NextResponse.json(
            { message: "تم إنشاء الحساب بنجاح", user: userWithoutPassword },
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
    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json(
            { message: "حدث خطأ أثناء إنشاء الحساب" },
            { status: 500 }
        )
    }
}
