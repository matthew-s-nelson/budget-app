'use client'

import { authenticate } from "@/lib/actions"
import { useFormState } from "react-dom"
import { FormSubmitButton } from "@/components/form-submit-button"
import { redirect } from "next/navigation";

export default function SignIn() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <div className="card">
            <h1>Sign In</h1>
            <form action={dispatch}>
                <div className="form-group">
                    <label htmlFor="email">Email </label>
                    <input className="w-full" type="email" name="email" placeholder="example@email.com" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password </label>
                    <input className="w-full" type="password" name="password" placeholder="******" required />
                </div>
                <div>{errorMessage && <p>{errorMessage}</p>}</div>
                <FormSubmitButton label={"Login"}  />
                <a href="/auth/signup/">Don't have an account?</a>
            </form>
        </div>
    )
}

