import z from "zod";

export const RegisterSchema = z.object({
	body: z.object({
		username: z.string().min(6, "Username must be at least 6 characters!"),
		email: z.email("Invalid email format"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		role: z.literal("user"),
	}),
});

export const LoginSchema = z.object({
	body: z.object({
		email: z.email(),
		password: z.string().min(1, "Password is required"),
	}),
});

export type RegisterInput = z.infer<typeof RegisterSchema>["body"];
export type LoginInput = z.infer<typeof LoginSchema>["body"];
