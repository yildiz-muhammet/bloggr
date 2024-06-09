import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prismadb"; // Prisma bağlantısını doğru yapılandırdığınızdan emin olun
import { AuthOptions } from "next-auth";
import { signInSchema } from "@/lib/zod/types";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "muhammet@gmail.com" },
                password: { label: "Password", type: "password" },
                username: { label: "Username", type: "text" },
            },
            async authorize(credentials) {
                const result = signInSchema.safeParse(credentials);
                if (result.success) {
                    const { email, password } = result.data;
                    if (!email || !password) throw new Error("Please enter your email and password");

                    const user = await prisma.user.findUnique({
                        where: { email },
                    });
                    if (!user || !user?.hashedPassword) throw new Error("Your email address or password is incorrect");

                    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
                    if (!passwordMatch) throw new Error("Your email address or password is incorrect");

                    return user;
                }
                throw new Error("Invalid data provided");
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ token, session }) {
            const user = await prisma.user.findUnique({
                where: { email: session?.user?.email as string },
            });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user?.id,
                    username: user?.username,
                    image: user?.image,
                    info: user?.info,
                    followersIDs: user?.followersIDs,
                    followingIDs: user?.followingIDs,
                    savedPosts: user?.savedPosts,
                    likedPosts: user?.likedPosts,
                }
            };
        },
    },
    secret: 'SDQWDQWD.dqwdqwd',
    session: {
        strategy: "jwt"
    },
    debug: false
};