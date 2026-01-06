
import React from 'react';
import { Application, ApplicationStage } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Sparkles, TrendingUp, Clock, Target, Plus, Search, ChevronRight, ArrowUpRight } from 'lucide-react';

const MOCK_CHART_DATA = [
  { name: 'Mon', count: 2 },
  { name: 'Tue', count: 5 },
  { name: 'Wed', count: 3 },
  { name: 'Thu', count: 8 },
  { name: 'Fri', count: 4 },
  { name: 'Sat', count: 1 },
  { name: 'Sun', count: 0 },
];

export default function Dashboard({ apps }: { apps: Application[] }) {
  const stats = {
    total: apps.length,
    interviews: apps.filter(a => a.stage === ApplicationStage.INTERVIEWING).length,
    offers: apps.filter(a => a.stage === ApplicationStage.OFFER).length,
    rate: Math.round((apps.filter(a => a.stage !== ApplicationStage.WISHLIST).length / (apps.length || 1)) * 100)
  };

  const recentApps = [...apps].sort((a, b) => (b.dateApplied || '').localeCompare(a.dateApplied || '')).slice(0, 3);

  return (
    <div className="p-12 max-w-[1200px] mx-auto space-y-16 animate-fade-in overflow-x-hidden">
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-[14px]">You have {stats.interviews} interviews scheduled for this week.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-md text-[13px] font-medium hover:bg-black transition-all shadow-sm">
            <Plus size={14} />
            Add application
          </button>
        </div>
      </header>

      {/* Stats Grid - High contrast, minimal boxes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4">
        {[
          { label: 'Total Applications', value: stats.total, trend: '+12%', isPositive: true },
          { label: 'Active Interviews', value: stats.interviews, trend: '+4', isPositive: true },
          { label: 'Offers Received', value: stats.offers, trend: '0%', isPositive: null },
          { label: 'Success Rate', value: `${stats.rate}%`, trend: '+5.4%', isPositive: true },
        ].map((stat, i) => (
          <div key={i} className="py-2 border-l border-gray-100 pl-6 first:border-l-0 first:pl-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              {stat.trend && (
                <span className={`text-[11px] font-bold ${stat.isPositive ? 'text-green-600' : stat.isPositive === false ? 'text-red-600' : 'text-gray-400'}`}>
                  {stat.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Weekly Activity - Linear/Attio style chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Application Velocity</h2>
            <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-gray-900"></div> Applications
                </span>
            </div>
          </div>
          <div className="h-64 border border-gray-100 rounded-xl p-6 bg-gray-50/30">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CHART_DATA}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 500 }} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', padding: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[2, 2, 0, 0]} barSize={40}>
                  {MOCK_CHART_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.count > 5 ? '#111827' : '#d1d5db'} 
                      className="transition-all duration-300 hover:fill-black"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Navigator - Minimalist list, no slop */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">AI Insights</h2>
          <div className="space-y-1 divide-y divide-gray-50 border-t border-gray-50">
            {[
              { text: "Your response rate is 25% higher on Tuesdays.", tag: "Efficiency" },
              { text: "Linear values 'High-Performance UI' in resumes.", tag: "Keyword" },
              { text: "Follow up with Stripe - it's been 3 days.", tag: "Action" }
            ].map((insight, i) => (
              <div key={i} className="py-4 flex flex-col gap-1 group cursor-default">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{insight.tag}</span>
                  <ArrowUpRight size={12} className="text-gray-200 group-hover:text-gray-900 transition-colors" />
                </div>
                <p className="text-[13px] leading-snug text-gray-600 group-hover:text-gray-900 transition-colors font-normal">
                  {insight.text}
                </p>
              </div>
            ))}
          </div>
          <button className="w-full py-2.5 text-[12px] font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-100 transition-all flex items-center justify-center gap-2">
            View full report
          </button>
        </div>
      </div>

      {/* Recent Activity - Fixed alignment for table columns */}
      <div className="space-y-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Recent activity</h2>
        <div className="border border-gray-100 rounded-xl overflow-hidden bg-white">
          {recentApps.map((app, i) => (
            <div 
              key={app.id} 
              className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${i !== recentApps.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-9 h-9 rounded bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                   <img src={app.logoUrl} alt="" className="w-6 h-6 object-contain" />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-medium text-gray-900 truncate">{app.role}</p>
                  <p className="text-[12px] text-gray-400 font-normal truncate">{app.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 shrink-0">
                <div className="hidden md:block w-36">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Stage</p>
                  <p className="text-[12px] font-medium text-gray-600 truncate">{app.stage}</p>
                </div>
                <div className="hidden md:block w-32">
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Applied</p>
                   <p className="text-[12px] font-medium text-gray-500">{app.dateApplied}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
