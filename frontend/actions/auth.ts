"use server";

import { registerUserService } from "@/lib/strapi";
import { FormState, SignupFormSchema } from "@/validations/auth";
import { flattenError } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieConfig = {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    httpOnly: true,
    domain : process.env.HOST || 'localhost',
    secure: process.env.NODE_ENV === "production",


}

export async function registerUserAction(prevState: FormState, data: FormData) : Promise<FormState> {
    const fields = {
        username: data.get("username") as string,
        email: data.get("email") as string,
        password: data.get("password") as string,

    }
    console.log("Registering user with data:", fields);
    const validatedFields = SignupFormSchema.safeParse(fields);

    if(!validatedFields.success) {
        const flattenedErrors = flattenError(validatedFields.error);
        console.log("Validation errors:", flattenedErrors.fieldErrors);
        return {
            success: false,
            message: "Validation failed",
            strapiErrors: null,
            zodErrors: flattenedErrors.fieldErrors,
            data : fields,
        }
    }

    const response = await registerUserService(validatedFields.data);
    if(!response || response.error) {
        return {
            success: false,
            message: "Validation failed",
            strapiErrors: response?.error,
            zodErrors: null,
            data : fields,
        }
    }
    const cookieStore = await cookies();
    cookieStore.set(
        'jwt',
        response.jwt,
        cookieConfig
    );
    redirect('/dashboard');

}