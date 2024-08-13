'use client'

import { authenticate } from "@/lib/actions"
import { useFormState } from "react-dom"
import { FormSubmitButton } from "@/components/form-submit-button"

export default function SignIn() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <div className="text-white">
            <h1>Sign In</h1>
            <form action={dispatch}>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <div>{errorMessage && <p>{errorMessage}</p>}</div>
                <FormSubmitButton label={"Login"}  />
                <div><a href="/signup">Don't have an account?</a></div>
            </form>
        </div>
    )
}

