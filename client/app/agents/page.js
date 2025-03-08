"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '' });
  const [editing, setEditing] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    const res = await axios.get('http://localhost:5000/api/agents', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setAgents(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`http://localhost:5000/api/agents/${editing}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditing(null);
    } else {
      await axios.post('http://localhost:5000/api/agents', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    setFormData({ name: '', email: '', mobile: '', password: '' });
    fetchAgents();
  };

  const handleEdit = (agent) => {
    setEditing(agent._id);
    setFormData({ name: agent.name, email: agent.email, mobile: agent.mobile, password: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/agents/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchAgents();
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl">Agents Management</h1>
        <div className='md:flex md:justify-between'>
          <Link href="/dashboard">
            <p className="mr-4">Dashboard</p>
          </Link>
          <Link href="/upload">
            <p className="mr-4">Upload Leads</p>
          </Link>
          <Link href="/distribution">
            <p>Lead Distribution</p>
          </Link>
        </div>
      </nav>
      <div className="mt-8 p-8">
        <h2 className="text-2xl mb-4">{editing ? 'Edit Agent' : 'Add Agent'}</h2>
        <form onSubmit={handleSubmit} className="mb-8 text-black">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded mb-4 w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded mb-4 w-full"
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded mb-4 w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded mb-4 w-full"
            required={!editing}
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {editing ? 'Update Agent' : 'Add Agent'}
          </button>
        </form>
        <h2 className="text-2xl mb-4">Agents List</h2>
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent._id}>
                <td className="p-2 border">{agent.name}</td>
                <td className="p-2 border">{agent.email}</td>
                <td className="p-2 border">{agent.mobile}</td>
                <td className="p-2 border">
                  <button onClick={() => handleEdit(agent)} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(agent._id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
