"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Distribution() {
  const [agentsData, setAgentsData] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/leads', { headers: { Authorization: `Bearer ${token}` } });
      const leadsData = res.data;
      setLeads(leadsData);
      // Group leads by assigned agent
      const agentMap = {};
      leadsData.forEach(lead => {
        if (lead.assignedAgent) {
          const id = lead.assignedAgent._id;
          if (!agentMap[id]) {
            agentMap[id] = { agent: lead.assignedAgent, count: 0 };
          }
          agentMap[id].count++;
        }
      });
      const agentsList = Object.values(agentMap);
      setAgentsData(agentsList);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <nav className="bg-blue-500 p-4 text-white flex justify-between">
        <h1 className="text-xl">Lead Distribution</h1>
        <div className="flex space-x-4">
          <Link href="/dashboard"><p>Dashboard</p></Link>
          <Link href="/agents"><p>Agents</p></Link>
          <Link href="/upload"><p>Upload Leads</p></Link>
        </div>
      </nav>
      <div className="mt-8 p-8">
        <h2 className="text-2xl mb-4">Agents and Their Assigned Leads</h2>
        {agentsData.length === 0 ? (
          <p>No leads assigned yet.</p>
        ) : (
          <table className="w-full bg-white shadow rounded">
            <thead>
              <tr>
                <th className="p-2 border">Agent Name</th>
                <th className="p-2 border">Assigned Leads Count</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agentsData.map(item => (
                <tr key={item.agent._id}>
                  <td className="p-2 border">{item.agent.name}</td>
                  <td className="p-2 border">{item.count}</td>
                  <td className="p-2 border">
                    <Link href={`/agent/${item.agent._id}`}>
                      <button className="bg-green-500 text-white p-1 rounded">View Leads</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
