"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md text-black">
        <h2 className="text-2xl text-black mb-6 text-center">Admin Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-4" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-4" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-4" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
