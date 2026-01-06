
import React from 'react';
import { User, Bell, Shield, Wand2, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-10 max-w-4xl mx-auto space-y-12">
      <header>
        <h1 className="text-3xl font-medium tracking-tight text-slate-900">Settings</h1>
        <p className="text-slate-400 font-light">Manage your preferences and AI configuration.</p>
      </header>

      <div className="space-y-10">
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <User size={18} className="text-slate-400" />
            <h2 className="text-lg font-medium text-slate-900">Profile</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase">Full Name</label>
              <input 
                type="text" 
                defaultValue="Alex Rivera" 
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-gray-100 focus:outline-none text-sm transition-all shadow-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase">Email Address</label>
              <input 
                type="email" 
                defaultValue="alex@rivera.design" 
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-gray-100 focus:outline-none text-sm transition-all shadow-sm" 
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Wand2 size={18} className="text-gray-900" />
            <h2 className="text-lg font-medium text-slate-900">AI Personalization</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900">Tailoring Tone</p>
                <p className="text-xs text-slate-400">Choose how AI should adjust your resume messaging.</p>
              </div>
              <select className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all shadow-sm">
                <option>Professional & Corporate</option>
                <option>Creative & Bold</option>
                <option>Technical & Concise</option>
                <option>Startup & Casual</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900">Auto-Apply Assistance</p>
                <p className="text-xs text-slate-400">AI suggests roles based on your experience daily.</p>
              </div>
              <div className="w-12 h-6 bg-gray-900 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="pt-6 flex justify-end gap-3">
        <button className="px-6 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Discard</button>
        <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-black transition-all shadow-lg shadow-slate-200">Save Changes</button>
      </div>
    </div>
  );
}
