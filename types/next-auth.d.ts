// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "admin" | "cliente" // 👈 agrega esto
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    role: "admin" | "cliente" // 👈 agrega esto
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: "admin" | "cliente" // 👈 agrega esto
  }
}
