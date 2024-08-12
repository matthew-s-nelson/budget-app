'use client'

// import { authenticate } from '@/app/lib/actions'
import { useActionState } from "react";
import Button from '@/components/ui/button/page';

export default function Home() {
  // const [errorMessage, formAction, isPending] = useActionState(
  //   authenticate,
  //   undefined,
  // );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Welcome to Budget MB!</h1>
          <Button text={"Login"} />
      </div>
    </main>
  );
}
