"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Distribution() {
  const [leads, setLeads] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/leads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl">Lead Distribution</h1>
        <div className='md:flex md:justify-between'>
          <Link href="/dashboard">
            <p className="mr-4">Dashboard</p>
          </Link>
          <Link href="/agents">
            <p className="mr-4">Agents</p>
          </Link>
          <Link href="/upload">
            <p>Upload Leads</p>
          </Link>
        </div>
      </nav>
      <div className="mt-8 p-8">
        <h2 className="text-2xl mb-4">Leads List</h2>
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="p-2 border">First Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Notes</th>
              <th className="p-2 border">Assigned Agent</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead._id}>
                <td className="p-2 border">{lead.firstName}</td>
                <td className="p-2 border">{lead.phone}</td>
                <td className="p-2 border">{lead.notes}</td>
                <td className="p-2 border">{lead.assignedAgent ? lead.assignedAgent.name : 'Not assigned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
