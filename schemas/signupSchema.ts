import { z } from "zod";
import { NAME_REGEX, MOBILE_REGEX, isPasswordValid } from "@/lib/validators";

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .regex(NAME_REGEX, "Name can only contain letters and spaces."),
    email: z.string().min(1, "Email address is required.").email("Enter a valid email address."),
    mobile: z.string().regex(MOBILE_REGEX, "Enter a valid 10-digit mobile number."),
    password: z.string().refine(isPasswordValid, "Password does not meet all requirements."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
    role: z.enum(["student", "trainer", "recruiter", "institution"], {
      required_error: "Please select a role.",
    }),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the Terms of Use and Privacy Policy." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
