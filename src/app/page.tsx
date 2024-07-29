import Image from "next/image";
import { authenticate } from '@/app/lib/actions'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Welcome to Budget MB!</h1>
        <form action={authenticate}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <a href='/dashboard'>Click here to login</a>
      </div>
    </main>
  );
}
