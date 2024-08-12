export default function RegisterPage() {
    return (
        <div className="text-white">
            <h1>Sign In</h1>
            <form>
                <div className="space-y-3">
                    <label htmlFor="email">Email </label>
                    <input name="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-3">
                    <label htmlFor="password">Password </label>
                    <input name="password" type="password" placeholder="Enter your password" />
                </div>
                <div className="mt-4">
                    <button className="btn-primary">Sign In</button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don't have an account?
                    <a className="underline ml-2" href="signup">Sign Up</a>
                </div>
            </form>
        </div>
    )
}