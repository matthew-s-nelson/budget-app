import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Welcome to Budget MB!</h1>
        <a href='/dashboard'>Click here to login</a>
      </div>
    </main>
  );
}
