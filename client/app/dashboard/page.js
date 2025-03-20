"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl">Dashboard</h1>
        <div className="flex space-x-4">
          <Link href="/agents"><p>Agents</p></Link>
          <Link href="/upload"><p>Upload Leads</p></Link>
          <Link href="/distribution"><p>Lead Distribution</p></Link>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="p-8 text-black">
        <h2 className="text-2xl mb-4">Welcome, Admin!</h2>
        <p>Use the navigation bar to manage agents, upload leads, and view distributions.</p>
      </div>
    </div>
  );
}
