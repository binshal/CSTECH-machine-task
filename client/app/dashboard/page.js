
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl">Dashboard</h1>
        <div className='md:flex md:justify-between'>
          <Link href="/agents">
            <p className="mr-4">Agents</p>
          </Link>
          <Link href="/upload">
            <p className="mr-4">Upload Leads</p>
          </Link>
          <Link href="/distribution">
            <p>Lead Distribution</p>
          </Link>
        </div>
      </div>
      <div className="p-8 text-black">
        <h2 className="text-2xl mb-4">Welcome, Admin!</h2>
        <p>Use the navigation bar to manage agents, upload leads, and view distributions.</p>
      </div>
    </div>
  );
}
