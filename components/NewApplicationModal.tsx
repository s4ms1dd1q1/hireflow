
import React, { useState } from 'react';
import { X, Building2, Briefcase, MapPin, AlignLeft, Sparkles } from 'lucide-react';
import { Application, ApplicationStage } from '../types';

interface NewApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (app: Application) => void;
}

export default function NewApplicationModal({ isOpen, onClose, onAdd }: NewApplicationModalProps) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    description: '',
    salaryRange: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp: Application = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      stage: ApplicationStage.WISHLIST,
      notes: '',
      logoUrl: `https://picsum.photos/seed/${formData.company.toLowerCase()}/40/40`,
      dateApplied: new Date().toISOString().split('T')[0]
    };
    onAdd(newApp);
    onClose();
    setFormData({ company: '', role: '', location: '', description: '', salaryRange: '' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white/90 border border-white/40 shadow-2xl rounded-3xl overflow-hidden animate-slide-in">
        <header className="p-6 border-b border-slate-100/50 flex items-center justify-between bg-white/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <PlusIcon size={18} />
            </div>
            <h2 className="text-lg font-medium text-slate-900">New Application</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={18} className="text-slate-400" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Company</label>
              <div className="relative">
                <Building2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  required
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  placeholder="e.g. Linear"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Role</label>
              <div className="relative">
                <Briefcase size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  required
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  placeholder="e.g. Product Designer"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Location</label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  placeholder="Remote / SF"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Salary</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-sm">$</span>
                <input 
                  value={formData.salaryRange}
                  onChange={e => setFormData({...formData, salaryRange: e.target.value})}
                  placeholder="Range"
                  className="w-full pl-8 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Job Description</label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Paste the job description here for AI analysis..."
              className="w-full p-4 bg-white border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none"
            />
          </div>

          <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-slate-200 mt-2">
            Add to Pipeline
            <Sparkles size={14} className="text-indigo-400 group-hover:rotate-12 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}

const PlusIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
