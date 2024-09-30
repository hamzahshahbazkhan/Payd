'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'


function SignupForm() {

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


  const [error, setError] = useState<string | null>(null)

  const router = useRouter();

  const signup = async (e: any) => {
    e.preventDefault();
    const user = {
      email,
      phone,
      password
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      console.log(response)
      if (response.status === 200) {
        router.push('/auth/signin')
      }

    } catch (error) {
      console.log("error:", error);
    }
  }
  return (
    <div>
      SignupForm
      <div>
        <form onSubmit={signup}>
          <div>
            Phone
            <input type="text" onChange={e => setPhone(e.target.value)} />
          </div>
          <div>
            Email
            <input type="text" onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            Password
            <input type="text" onChange={e => setPassword(e.target.value)} />
          </div>
          <div>
            <button type='submit'>
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupForm