
import React from 'react';
import { Application } from '../types';
import { STAGE_COLORS } from '../constants';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

export default function ListTab({ apps, setApps }: { apps: Application[], setApps: any }) {
  return (
    <div className="p-10 max-w-7xl mx-auto space-y-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-slate-900">Application List</h1>
          <p className="text-slate-400 text-[14px]">View all {apps.length} records in a compact table.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search companies..." 
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-white text-[13px] w-64 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg bg-white text-slate-500 hover:bg-slate-50">
            <Filter size={18} />
          </button>
        </div>
      </header>

      <div className="glass rounded-2xl overflow-hidden shadow-sm border border-slate-200">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600 transition-colors">
                  Stage
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date Applied</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {apps.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <img src={app.logoUrl} alt="" className="w-8 h-8 rounded-lg border border-slate-100" />
                    <span className="text-[14px] font-medium text-slate-900">{app.company}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-[14px] text-slate-600 font-light">{app.role}</span>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-2 py-1 rounded text-[11px] font-semibold tracking-wide ${STAGE_COLORS[app.stage]}`}>
                    {app.stage}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-[13px] text-slate-400 font-light">
                    {app.dateApplied ? new Date(app.dateApplied).toLocaleDateString() : '—'}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="text-indigo-600 hover:text-indigo-800 text-[13px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
