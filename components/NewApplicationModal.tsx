
import React, { useState } from 'react';
import { X, Building2, Briefcase, MapPin, Sparkles, Plus, Link as LinkIcon, Loader2 } from 'lucide-react';
import { Application, ApplicationStage } from '../types';
import { extractJobDetailsFromUrl } from '../services/gemini';

interface NewApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (app: Application) => void;
}

export default function NewApplicationModal({ isOpen, onClose, onAdd }: NewApplicationModalProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [jobUrl, setJobUrl] = useState('');
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    description: '',
    salaryRange: ''
  });

  if (!isOpen) return null;

  const handleAutofill = async () => {
    if (!jobUrl) return;
    
    setIsFetching(true);
    try {
      const details = await extractJobDetailsFromUrl(jobUrl);
      if (details) {
        setFormData({
          company: details.company || '',
          role: details.role || '',
          location: details.location || '',
          description: details.description || '',
          salaryRange: details.salaryRange || ''
        });
      }
    } catch (error) {
      console.error("Failed to autofill:", error);
    } finally {
      setIsFetching(false);
    }
  };

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
    setJobUrl('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white border border-gray-100 shadow-2xl rounded-[32px] overflow-hidden animate-slide-in">
        <header className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 rounded-lg text-white">
              <Plus size={18} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 tracking-tight">New Application</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </header>

        <div className="px-8 pt-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Autofill from Link</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                <input 
                  type="url"
                  value={jobUrl}
                  onChange={e => setJobUrl(e.target.value)}
                  placeholder="Paste job posting URL (LinkedIn, Indeed, etc.)"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                />
              </div>
              <button 
                type="button"
                onClick={handleAutofill}
                disabled={isFetching || !jobUrl}
                className="px-4 py-2.5 bg-gray-100 text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isFetching ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                Autofill
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Company</label>
              <div className="relative">
                <Building2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                <input 
                  required
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  placeholder="e.g. Linear"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Role</label>
              <div className="relative">
                <Briefcase size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                <input 
                  required
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  placeholder="e.g. Product Designer"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Location</label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                <input 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  placeholder="Remote / SF"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Salary</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm">$</span>
                <input 
                  value={formData.salaryRange}
                  onChange={e => setFormData({...formData, salaryRange: e.target.value})}
                  placeholder="Range"
                  className="w-full pl-8 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Job Description</label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Paste the job description here for AI analysis..."
              className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-100 outline-none transition-all resize-none"
            />
          </div>

          <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-2xl text-sm font-bold hover:bg-black transition-all flex items-center justify-center gap-2 group shadow-xl shadow-gray-100 mt-2">
            Create Application
            <Sparkles size={14} className="opacity-50 group-hover:rotate-12 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
