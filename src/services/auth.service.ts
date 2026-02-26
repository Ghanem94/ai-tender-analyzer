import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { signToken } from "@/lib/auth"
import { User } from "@/types/models"

/**
 * Service class handling user authentication, including registration and login.
 */
export class AuthService {
    /**
     * Registers a new user. Assigns ADMIN role if it's the very first user in the system.
     * @param userData The parsed user registration data (name, email, password)
     * @returns The registered user object without the password field, and the JWT token
     */
    static async registerUser({ email, password, name }: Record<string, string>) {
        const existingUser = await db.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            throw new Error("EMAIL_EXISTS")
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

        return { user: userWithoutPassword, token }
    }

    /**
     * Authenticates an existing user via email and password comparisons.
     * @param credentials The parsed user login credentials (email, password)
     * @returns The authenticated user object without the password field, and the JWT token
     */
    static async loginUser({ email, password }: Record<string, string>) {
        const user = await db.user.findUnique({
            where: { email },
        })

        if (!user) {
            throw new Error("INVALID_CREDENTIALS")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new Error("INVALID_CREDENTIALS")
        }

        const { password: _, ...userWithoutPassword } = user

        // Create JWT token
        const token = await signToken(userWithoutPassword)

        return { user: userWithoutPassword, token }
    }
}
