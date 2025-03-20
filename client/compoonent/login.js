"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl text-black mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 text-black border border-gray-300 rounded mb-4" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full text-black p-2 border border-gray-300 rounded mb-4" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        <p className="mt-4 text-gray-800 text-center">Don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
      </form>
    </div>
  );
}
