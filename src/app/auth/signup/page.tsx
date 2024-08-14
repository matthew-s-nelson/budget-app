"use client";

import { register } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { ZodErrors } from "@/app/ui/errors/ZodErrors";
import { FormSubmitButton } from "@/components/form-submit-button";

const INITIAL_STATE = {
    data: null,
};

export default function SignUp() {
    const [errorMessage, dispatch] = useFormState(register, undefined);

    return (
        <div className="card">
            <h1>Sign Up</h1>
            <form action={dispatch}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="w-full" type="text" name="name" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="w-full" type="email" name="email" placeholder="example@email.com" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="w-full" type="password" name="password" placeholder="******" required />
                </div>
                <FormSubmitButton label="Register" />
                <div><a href="/signin">Already have an account?</a></div>
            </form>
        </div>
    );
}