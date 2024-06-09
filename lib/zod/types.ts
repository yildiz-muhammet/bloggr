import { z } from "zod";
export const signUpSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long")
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export const signInSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})


export type TSignInSchema = z.infer<typeof signInSchema>;

export type TSignUpSchema = z.infer<typeof signUpSchema>;

//  .refine(async (e) => {
//      const emails = await fetchEmails();
//      return emails.includes(e);
//  }, "This email is not in our database")
// https://stackoverflow.com/questions/75148276/email-validation-with-zod