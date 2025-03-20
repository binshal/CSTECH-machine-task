"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function AgentDetails() {
  const { id } = useParams();
  const [leads, setLeads] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const router = useRouter();

  useEffect(() => {
    fetchLeads();
  }, [id]);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/leads/agent/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <nav className="bg-blue-500 p-4 text-white flex justify-between">
        <h1 className="text-xl">Agent Assigned Leads</h1>
        <div className="flex space-x-4">
          <Link href="/dashboard"><p>Dashboard</p></Link>
          <Link href="/agents"><p>Agents</p></Link>
          <Link href="/distribution"><p>Lead Distribution</p></Link>
        </div>
      </nav>
      <div className="mt-8 p-8">
        <h2 className="text-2xl mb-4">Assigned Leads</h2>
        {leads.length === 0 ? (
          <p>No leads assigned to this agent.</p>
        ) : (
          <table className="w-full bg-white shadow rounded">
            <thead>
              <tr>
                <th className="p-2 border">First Name</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Notes</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead._id}>
                  <td className="p-2 border">{lead.firstName}</td>
                  <td className="p-2 border">{lead.phone}</td>
                  <td className="p-2 border">{lead.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={() => router.back()} className="mt-4 bg-blue-500 text-white p-2 rounded">Go Back</button>
      </div>
    </div>
  );
}
