"use client";
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://localhost:5000/api/leads/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error uploading file');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <nav className="bg-blue-500 p-4 text-white flex justify-between">
        <h1 className="text-xl">Upload Leads</h1>
        <div className="flex space-x-4">
          <Link href="/dashboard"><p>Dashboard</p></Link>
          <Link href="/agents"><p>Agents</p></Link>
          <Link href="/distribution"><p>Lead Distribution</p></Link>
        </div>
      </nav>
      <div className="mt-8 p-8">
        <h2 className="text-2xl mb-4">Upload CSV File</h2>
        <form onSubmit={handleUpload}>
          <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Click here to choose file
            <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
          </label>
          <button type="submit" className="bg-blue-500 ml-4 text-white p-2 rounded">Upload</button>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
}
