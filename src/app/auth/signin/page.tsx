'use client'

import { authenticate } from "@/lib/actions"
import { useFormState, useFormStatus } from "react-dom"

export default function SignIn() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <div className="text-white">
            <h1>Sign In</h1>
            <form action={dispatch}>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <div>{errorMessage && <p>{errorMessage}</p>}</div>
                <LoginButton />
            </form>
        </div>
    )
}

function LoginButton() {
    const { pending } = useFormStatus();
    
    const handleClick = (event: any) => {
        if (pending) {
            event.preventDefault()
        }
    }

    return (
        <button aria-disabled={pending} type="submit" onClick={handleClick}>
            Login
        </button>
    )
}