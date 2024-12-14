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
    }
  );

export default z
  .object({
    oldPassword: passwordValidator,
    password: passwordValidator,
    confirmPassword: passwordValidator,
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );
