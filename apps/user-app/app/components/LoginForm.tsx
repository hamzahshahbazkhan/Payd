'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button, Card } from '@repo/ui';
import { Input } from '@repo/ui'
import { Label } from '@repo/ui'



function LoginForm() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        phone,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError("Unexpected error occurred.");
    }
  };

  return (
    <div className='flex items-center justify-center h-full'>
      <Card className='p-4'>

        <div>
          <div>
            LOGIN FORM
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <Label>Input</Label>
                <Input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <Label>Password </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button variant='default' type="submit">Sign In</Button>
          </form>
        </div>
        {error && (
          <div>
            <p className='text-red-600'>{error}</p>
          </div>
        )}

      </Card>
    </div>
  );
}

export default LoginForm;
