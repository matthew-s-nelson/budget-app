'use client'

import Button from '@/components/ui/button/page';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">Welcome to Budget MB!</h1>
        <p className="text-xl mb-8">Manage your budget efficiently and effectively</p>
        <button className='btn-primary'>Login</button>
      </div>
    </main>
  );
}