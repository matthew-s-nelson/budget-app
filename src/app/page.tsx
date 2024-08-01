'use client'

// import { authenticate } from '@/app/lib/actions'
import { useActionState } from "react";
import Button from '@/components/ui/button/page';
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  // const [errorMessage, formAction, isPending] = useActionState(
  //   authenticate,
  //   undefined,
  // );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Welcome to Budget MB!</h1>
        <LoginButton>
          <Button text={"Login"} />
        </LoginButton>
      </div>
    </main>
  );
}
