
import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "HELLO", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials: any) {
                // Do zod validation, OTP validation here

                const existingUser = await db.user.findFirst({
                    where: {
                        phone: credentials.phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.phone
                        }
                    }
                    return null;
                }

                return null
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async session({ session, token }:any) {
          // Add token ID to session user
          if (token) {
            session.user.id = token.sub as string;
          }
          return session;
        }
      
    }
}
