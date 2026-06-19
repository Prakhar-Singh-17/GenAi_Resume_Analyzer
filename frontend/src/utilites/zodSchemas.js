import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().max(20, "Limit Exceded <20").min(1,"Password is required"),
  email: z.email("Please Enter a valid email").min(1,"Password is required"),
  password: z
    .string()
    .min(6, "Minimum length should be 6"),
  confirmPassword: z.string().min(1,"Confirm Password is required"),
})
.refine((data)=> data.password === data.confirmPassword,
{
    message :"Passwords do not match",
    path : ["confirmPassword"]
});

export const loginSchema = z.object({
    email : z.email("Please enter a valid email").min(1,"Email is required"),
    password : z.string().min(1,"Password is required")
})
