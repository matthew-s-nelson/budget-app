'use client'

import Button from '@/components/ui/button/page';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">Welcome to Budget MB!</h1>
        <p className="text-xl mb-8">Manage your budget efficiently and effectively</p>
        <div>
          <a className='btn-primary' href='/auth/signin'>Login</a>
          <span> or </span>
          <a className='btn-primary' href='/auth/signup'>Register</a>
        </div>
      </div>
    </main>
  );
}