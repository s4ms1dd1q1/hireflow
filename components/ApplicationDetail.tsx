
import React, { useState } from 'react';
import { Application, Resume } from '../types';
import { X, Globe, MapPin, Building2, Briefcase, FileText, Sparkles, Send, CheckCircle2, ChevronDown, Download, Save } from 'lucide-react';
import { tailorResume } from '../services/gemini';
import { MOCK_RESUMES } from '../constants';

interface ApplicationDetailProps {
  app: Application;
  onClose: () => void;
  onUpdate: (app: Application) => void;
}

export default function ApplicationDetail({ app, onClose, onUpdate }: ApplicationDetailProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'ai' | 'notes'>('info');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [selectedResumeId, setSelectedResumeId] = useState(MOCK_RESUMES[0].id);

  const handleTailor = async () => {
    setIsAnalyzing(true);
    try {
      const resume = MOCK_RESUMES.find(r => r.id === selectedResumeId);
      if (resume) {
        const result = await tailorResume(resume.content, app.description);
        setAiSuggestions(result);
        setActiveTab('ai');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveTailored = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onUpdate({ ...app, resumeVersion: `${app.company}-Custom-V1` });
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white h-screen shadow-2xl animate-slide-in flex flex-col border-l border-slate-200">
        <header className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl shadow-sm border border-slate-100 overflow-hidden bg-slate-50 flex items-center justify-center">
              <img src={app.logoUrl} alt={app.company} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 leading-tight">{app.role}</h2>
              <div className="flex items-center gap-2 text-slate-400 text-[12px] mt-0.5 font-medium uppercase tracking-wider">
                <span className="text-indigo-600">{app.company}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>{app.stage}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
            <X size={18} />
          </button>
        </header>

        <nav className="flex px-6 pt-2 border-b border-slate-50 bg-white sticky top-24 z-10">
          {['info', 'ai', 'notes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 text-[13px] font-medium transition-all relative ${
                activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide space-y-10 bg-slate-50/20">
          {activeTab === 'info' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</label>
                  <div className="flex items-center gap-2 text-slate-700 text-[14px] font-medium">
                    <MapPin size={16} className="text-slate-300" />
                    {app.location || 'Remote'}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Salary Range</label>
                  <div className="flex items-center gap-2 text-slate-700 text-[14px] font-medium">
                    <Briefcase size={16} className="text-slate-300" />
                    {app.salaryRange || '—'}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Job Description</label>
                  <button className="text-[11px] font-bold text-indigo-600 uppercase tracking-tight hover:underline">Edit</button>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-600 text-[14px] leading-relaxed font-light">
                  {app.description}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-4">
                <button 
                  onClick={handleTailor}
                  disabled={isAnalyzing}
                  className="flex-1 bg-slate-900 text-white py-3.5 rounded-2xl text-[14px] font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-xl shadow-slate-200"
                >
                  {isAnalyzing ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Sparkles size={16} className="text-indigo-400" />
                  )}
                  {isAnalyzing ? 'Analyzing Alignment...' : 'Tailor with HireFlow AI'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-8 animate-fade-in pb-10">
              {!aiSuggestions && !isAnalyzing && (
                <div className="h-96 flex flex-col items-center justify-center text-center space-y-4 px-10 glass rounded-3xl border border-slate-100">
                  <div className="p-5 rounded-full bg-indigo-50 text-indigo-500 animate-pulse">
                    <Sparkles size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Run AI Diagnosis</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mt-2">
                      Our models will compare your base resume against the specific keywords and requirements of this role.
                    </p>
                  </div>
                  <button onClick={handleTailor} className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                    Begin Analysis
                  </button>
                </div>
              )}

              {isAnalyzing && (
                <div className="space-y-6">
                  <div className="h-40 rounded-3xl bg-white border border-slate-100 animate-pulse" />
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
              )}

              {aiSuggestions && (
                <div className="space-y-8">
                  <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                        <Target size={18} className="text-indigo-600" />
                        Job Match Score
                      </h4>
                      <span className="text-2xl font-bold text-slate-900">{aiSuggestions.matchScore}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 transition-all duration-1000 ease-out rounded-full" 
                        style={{ width: `${aiSuggestions.matchScore}%` }} 
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Strategic Advice</h4>
                    <ul className="space-y-3">
                      {aiSuggestions.suggestions.map((s: string, i: number) => (
                        <li key={i} className="flex gap-4 p-4 bg-white border border-slate-50 rounded-2xl text-sm text-slate-600 leading-relaxed shadow-sm">
                          <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Keyword Optimization</h4>
                    <div className="flex flex-wrap gap-2">
                      {aiSuggestions.keywords.map((k: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-[12px] font-semibold border border-indigo-100">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="sticky bottom-6 pt-4 border-t border-slate-100">
                    <button 
                      onClick={handleSaveTailored}
                      disabled={isSaving}
                      className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-2xl shadow-slate-200"
                    >
                      {isSaving ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Save size={16} />
                      )}
                      {isSaving ? 'Saving Version...' : 'Create Optimized Version'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6 animate-fade-in h-full flex flex-col">
              <textarea
                className="flex-1 w-full min-h-[400px] p-6 rounded-3xl bg-white border border-slate-100 shadow-sm focus:ring-2 focus:ring-indigo-100 focus:outline-none text-[14px] leading-relaxed text-slate-600 font-light resize-none"
                placeholder="Interview logs, research, follow-up strategies..."
                defaultValue={app.notes}
              />
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                Update Records
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Target = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);
