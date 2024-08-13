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
        <div className="text-white">
            <h1>Sign Up</h1>
            <form action={dispatch}>
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <FormSubmitButton label="Register" />
                <div><a href="/signin">Already have an account?</a></div>
            </form>
        </div>
    );
}