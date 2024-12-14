import { z } from "zod";

const passwordRegex = {
  uppercase: /[A-Z]/,
  number: /[0-9]/,
  characters: /[!@#$%^&*_()-+=[\]{}|\\:;'",./?><]/,
};

export const passwordValidator = z
  .string()
  .min(8, "Password must be at least 8 characters")
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
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z.string().min(11, "Phone number must be 11 characters").max(11, "Phone number must be 11 characters"),
  email: z.string().email(),
  password: passwordValidator,
  agree_to_terms: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must agree to the terms and conditions",
    }),
});


