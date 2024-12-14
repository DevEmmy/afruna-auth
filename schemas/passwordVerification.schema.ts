import { z } from "zod";


const passwordRegex = {
  uppercase: /[A-Z]/,
  number: /[0-9]/,
  characters: /[!@#$%^&*_()-+=[\]{}|\\:;'",./?><]/,
};


export const passwordValidator = z
  .string()
  .min(12, "Password must be at least 8 characters")
  .refine(
    (value) => {
      return Object.values(passwordRegex).every((regex) => regex.test(value));
    },
    {
      message:
        "Password must contain at least one uppercase letter, one number, and one special character",
    },
  );


export default z.object({
  token: z.string().min(6, "Must be 6 characters").max(6, "Must be 6 characters"),
  password: passwordValidator,
  confirmPassword: passwordValidator,
}).refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  }
);

