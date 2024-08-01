"use client";

import { registerUser } from "@/app/lib/auth-action";
import { useFormState } from "react-dom";
import { ZodErrors } from "@/app/ui/errors/ZodErrors";

const INITIAL_STATE = {
    data: null,
};

export default function SignUp() {
    const [formState, formAction] = useFormState(registerUser, INITIAL_STATE);

    console.log(formState);

    return (
        <div className="text-white">
            <h1>Sign Up</h1>
            <form action={formAction}>
                <div className="space-y-3">
                    <label htmlFor="name">Name </label>
                    <input name="name" type="text" className="text-black" placeholder="Enter your name" />
                    <ZodErrors error={formState?.zodErrors?.name} />
                </div>
                <div className="space-y-3">
                    <label htmlFor="email">Email </label>
                    <input name="email" type="email" className="text-black" placeholder="Enter your email" />
                    <ZodErrors error={formState?.zodErrors?.email} />
                </div>
                <div className="space-y-3">
                    <label htmlFor="password">Password </label>
                    <input name="password" type="password" className="text-black" placeholder="Enter your password" />
                    <ZodErrors error={formState?.zodErrors?.password} />
                </div>
                <div className="mt-4">
                    <button className="btn-primary">Sign Up</button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Have an account?
                    <a className="underline ml-2" href="signin">Sign In</a>
                </div>
            </form>
        </div>
    );
}