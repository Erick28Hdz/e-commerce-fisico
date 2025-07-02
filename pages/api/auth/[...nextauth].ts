// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'
import { prisma } from '@/lib/prisma'// Asegúrate de tener este cliente de Prisma
import { Role } from '@prisma/client' 

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Correo', type: 'text' },
                password: { label: 'Contraseña', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Correo y contraseña requeridos')
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })

                if (!user || !user.password) {
                    throw new Error('Usuario no encontrado')
                }

                const valid = await compare(credentials.password, user.password)
                if (!valid) {
                    throw new Error('Contraseña incorrecta')
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role as "admin" | "cliente",
                }
            }
        }),

        // (opcional) Google login
        // GoogleProvider({
        //   clientId: process.env.GOOGLE_CLIENT_ID!,
        //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        // })
    ],

    session: {
        strategy: 'jwt'
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                 token.role = (user as any).role  
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string
                session.user.role = token.role as "admin" | "cliente"
            }
            return session;
        },
    },

  pages: {
        signIn: '/login', // tu ruta personalizada
        error: '/register',  // puedes redirigir errores
    },

    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
