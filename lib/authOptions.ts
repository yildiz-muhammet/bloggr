import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/zod/types";
import { JWT } from "next-auth/jwt";
import { AuthOptions, Session, User } from "next-auth";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string,
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID as string,
        //     clientSecret: process.env.GOOGLE_SECRET as string,
        // }),
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
                        where: {
                            email
                        },
                    });

                    if (!user || !user?.hashedPassword
                    ) throw new Error("Your email address or password is incorrect");

                    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

                    if (!passwordMatch) throw new Error("Your email address or password is incorrect");
                    // console.log('basarili', user)
                    return user;
                }
                throw new Error("Invalid data provided");

            }

        }),

    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {



            return { ...token, ...user };
        },
        async session({ token,
            session,
        }: { token: JWT; session: Session; })
            : Promise<Session> {

            const user = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email as string,
                },

            });
            // console.log('user', user)

            // console.log('kullanıcı giriş yaptı :', token)
            // console.log('kullanıcı giriş yaptı :', session)
            return Promise.resolve({
                id: user?.id,
                username: user?.username,
                email: session?.user?.email as string,
                image: user?.image,
                info: user?.info,
                followersIDs: user?.followersIDs,
                followingIDs: user?.followingIDs,
                savedPosts: user?.savedPosts,
                likedPosts: user?.likedPosts,

            } as any);
        },
    },
    secret: process.env.SECRET,
    session: {
        strategy: "jwt"
    },
    debug: process.env.NODE_ENV === "development",

}
