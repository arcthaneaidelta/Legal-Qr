import React, { useState } from 'react';
import { mockOrders } from '@/lib/mockData';
import { Link } from 'wouter';
import { Search, Filter, Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.profileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full flex flex-col bg-bg min-h-[90vh]">
      <div className="container mx-auto px-6 md:px-12 py-12">
        
        <header className="mb-8">
          <h1 className="text-3xl font-serif text-text-primary mb-2">Admin Dashboard</h1>
          <p className="text-text-secondary">Overview of platform orders and profiles.</p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="legacy-card p-6">
            <h3 className="text-sm font-medium text-text-secondary mb-1">Total Orders</h3>
            <p className="text-3xl font-serif text-text-primary">47</p>
          </motion.div>
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: 0.1}} className="legacy-card p-6">
            <h3 className="text-sm font-medium text-text-secondary mb-1">Total Revenue</h3>
            <p className="text-3xl font-serif text-text-primary">£4,230</p>
          </motion.div>
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: 0.2}} className="legacy-card p-6">
            <h3 className="text-sm font-medium text-text-secondary mb-1">Live Profiles</h3>
            <p className="text-3xl font-serif text-text-primary">39</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID, Customer, or Profile..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border-subtle rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 bg-surface border border-border-subtle rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="legacy-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg border-b border-border-subtle">
                  <th className="py-4 px-6 font-medium text-xs text-text-secondary uppercase tracking-wider">Order ID</th>
                  <th className="py-4 px-6 font-medium text-xs text-text-secondary uppercase tracking-wider">Customer</th>
                  <th className="py-4 px-6 font-medium text-xs text-text-secondary uppercase tracking-wider">Profile Name</th>
                  <th className="py-4 px-6 font-medium text-xs text-text-secondary uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 font-medium text-xs text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 font-medium text-xs text-text-secondary uppercase tracking-wider text-center">QR</th>
                  <th className="py-4 px-6 font-medium text-xs text-text-secondary uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, i) => (
                    <motion.tr 
                      key={order.id} 
                      initial={{opacity:0}} 
                      animate={{opacity:1}} 
                      transition={{delay: i * 0.05}}
                      className="hover:bg-bg/50 transition-colors"
                    >
                      <td className="py-4 px-6 text-sm font-mono text-text-secondary">{order.id}</td>
                      <td className="py-4 px-6 text-sm font-medium text-text-primary">{order.customer}</td>
                      <td className="py-4 px-6 text-sm text-text-primary">{order.profileName}</td>
                      <td className="py-4 px-6 text-sm text-text-secondary">{order.date}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Paid' ? 'bg-success/10 text-success' : 'bg-accent-ember/10 text-accent-ember'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button className="text-text-secondary hover:text-accent-primary transition-colors p-1" title="Download QR">
                          <Download size={16} />
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link href="/memorial" className="inline-flex items-center gap-1 text-sm text-accent-primary hover:underline">
                          View
                          <ExternalLink size={14} />
                        </Link>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-sm text-text-secondary">
                      No orders found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
