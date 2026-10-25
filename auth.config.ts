import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"

export default {
    providers: [
        ...(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET ? [
            GitHub({
                clientId: process.env.AUTH_GITHUB_ID,
                clientSecret: process.env.AUTH_GITHUB_SECRET,
            })
        ] : []),
        ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET ? [
            Google({
                clientId: process.env.AUTH_GOOGLE_ID,
                clientSecret: process.env.AUTH_GOOGLE_SECRET,
            })
        ] : []),
        Credentials({
            id: "guest",
            name: "Guest",
            credentials: {},
            async authorize() {
                return {
                    id: "guest-user",
                    name: "Guest Developer",
                    email: "guest@vibecode.dev",
                    image: "/placeholder.svg",
                }
            }
        })
    ]
} satisfies NextAuthConfig