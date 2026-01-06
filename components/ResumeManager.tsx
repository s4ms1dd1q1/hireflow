
import React, { useState } from 'react';
import { Resume, Application } from '../types';
import { FileText, Plus, MoreHorizontal, Download, Eye, Clock, Sparkles, ShieldCheck, Target, X, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { performATSCheck, tailorResume } from '../services/gemini';
import { MOCK_APPLICATIONS } from '../constants';

export default function ResumeManager({ resumes }: { resumes: Resume[] }) {
  const [isUploading, setIsUploading] = useState(false);
  const [analyzingResume, setAnalyzingResume] = useState<Resume | null>(null);
  const [analysisMode, setAnalysisMode] = useState<'ats' | 'match' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [selectedJobId, setSelectedJobId] = useState<string>(MOCK_APPLICATIONS[0].id);

  const handleATSCheck = async (resume: Resume) => {
    setAnalyzingResume(resume);
    setAnalysisMode('ats');
    setAnalysisResult(null);
    setIsProcessing(true);
    
    try {
      const result = await performATSCheck(resume.content);
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMatchCheck = async (resume: Resume) => {
    setAnalyzingResume(resume);
    setAnalysisMode('match');
    setAnalysisResult(null);
    setIsProcessing(true);

    try {
      const job = MOCK_APPLICATIONS.find(a => a.id === selectedJobId);
      if (job) {
        const result = await tailorResume(resume.content, job.description);
        setAnalysisResult(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const closeAnalysis = () => {
    setAnalyzingResume(null);
    setAnalysisMode(null);
    setAnalysisResult(null);
  };

  return (
    <div className="p-12 max-w-[1200px] mx-auto space-y-12 animate-fade-in relative">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Resume Library</h1>
          <p className="text-gray-500 text-[14px]">Manage your baseline documents and AI variants.</p>
        </div>
        <label className="cursor-pointer px-4 py-1.5 bg-gray-900 text-white rounded-md text-[13px] font-medium hover:bg-black transition-all shadow-sm flex items-center gap-2">
          <Plus size={14} />
          Upload new
          <input type="file" className="hidden" onChange={() => {
            setIsUploading(true);
            setTimeout(() => setIsUploading(false), 2000);
          }} />
        </label>
      </header>

      {isUploading && (
        <div className="p-12 border border-dashed border-gray-200 bg-gray-50 rounded-xl flex flex-col items-center justify-center text-gray-500 gap-3">
          <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-[11px] font-bold uppercase tracking-widest">Uploading document</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <div key={resume.id} className="group border border-gray-100 p-6 rounded-xl hover:border-gray-300 transition-all duration-200 bg-white shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
                  <FileText size={20} />
                </div>
                <div className="flex gap-2">
                   <button 
                    onClick={() => handleATSCheck(resume)}
                    className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all" 
                    title="ATS Compatibility Check"
                   >
                     <ShieldCheck size={18} />
                   </button>
                   <button 
                    onClick={() => handleMatchCheck(resume)}
                    className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all" 
                    title="Check Job Match"
                   >
                     <Target size={18} />
                   </button>
                   <button className="p-1.5 text-gray-300 hover:text-gray-900">
                     <MoreHorizontal size={16} />
                   </button>
                </div>
              </div>

              <div>
                <h3 className="text-[15px] font-semibold text-gray-900 mb-1">{resume.name}</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{resume.version}</p>
              </div>

              <div className="p-4 rounded-lg bg-gray-50/50 border border-gray-50 line-clamp-2 text-[12px] leading-relaxed text-gray-500 font-normal italic">
                "{resume.content}"
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <Clock size={12} />
                {new Date(resume.updatedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors" title="Preview">
                  <Eye size={16} />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors" title="Download">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        <button className="h-full min-h-[220px] border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all group">
          <Plus size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-bold uppercase tracking-widest">New template</span>
        </button>
      </div>

      {/* Analysis Side Panel */}
      {analyzingResume && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-sm" onClick={closeAnalysis} />
          <div className="relative w-full max-w-lg bg-white h-screen shadow-2xl animate-slide-in flex flex-col border-l border-gray-100">
            <header className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-900 text-white">
                  {analysisMode === 'ats' ? <ShieldCheck size={20} /> : <Target size={20} />}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {analysisMode === 'ats' ? 'ATS Integrity Check' : 'Job Alignment Analysis'}
                  </h2>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{analyzingResume.name}</p>
                </div>
              </div>
              <button onClick={closeAnalysis} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
              {analysisMode === 'match' && (
                <div className="space-y-4">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Target Application</p>
                  <select 
                    value={selectedJobId}
                    onChange={(e) => {
                      setSelectedJobId(e.target.value);
                      handleMatchCheck(analyzingResume);
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-gray-100 outline-none shadow-sm transition-all"
                  >
                    {MOCK_APPLICATIONS.map(app => (
                      <option key={app.id} value={app.id}>{app.company} — {app.role}</option>
                    ))}
                  </select>
                </div>
              )}

              {isProcessing ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-4">
                  <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm font-medium text-gray-400 animate-pulse uppercase tracking-widest text-[10px]">Processing content...</p>
                </div>
              ) : analysisResult ? (
                <div className="space-y-12 animate-fade-in">
                  {/* Overall Score - Fixed Alignment */}
                  <div className="p-10 border border-gray-100 rounded-[32px] bg-white shadow-sm flex flex-col items-center text-center space-y-6">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                        <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-100" />
                        <circle 
                          cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="6" fill="transparent" 
                          className="text-gray-900" 
                          strokeDasharray={452.4} 
                          strokeDashoffset={452.4 - (452.4 * (analysisMode === 'ats' ? analysisResult.atsScore : analysisResult.matchScore)) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-gray-900 tracking-tighter">
                          {analysisMode === 'ats' ? analysisResult.atsScore : analysisResult.matchScore}%
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Score</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-widest mb-1">
                        {analysisMode === 'ats' ? 'ATS Compliance' : 'Job Alignment'}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">
                        {analysisMode === 'ats' ? analysisResult.readabilityRating : 'Based on job requirements'}
                      </p>
                    </div>
                  </div>

                  {/* ATS Specific Content */}
                  {analysisMode === 'ats' && (
                    <div className="space-y-8">
                      <section className="space-y-4">
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Critical Issues</h4>
                        <div className="space-y-2">
                          {analysisResult.criticalIssues.length > 0 ? analysisResult.criticalIssues.map((issue: string, i: number) => (
                            <div key={i} className="flex gap-3 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] text-gray-600 leading-relaxed">
                              <AlertCircle size={16} className="shrink-0 mt-0.5 text-gray-400" />
                              {issue}
                            </div>
                          )) : <div className="p-4 bg-gray-900 text-white rounded-2xl text-[13px] flex items-center gap-2">
                              <CheckCircle2 size={16} /> No critical issues found.
                            </div>}
                        </div>
                      </section>
                      <section className="space-y-4">
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Formatting Optimization</h4>
                        <div className="grid gap-2">
                          {analysisResult.formattingTips.map((tip: string, i: number) => (
                            <div key={i} className="flex gap-3 p-4 bg-white border border-gray-50 rounded-2xl text-[13px] text-gray-600 shadow-sm">
                              <CheckCircle2 size={16} className="text-gray-400 shrink-0 mt-0.5" />
                              {tip}
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  )}

                  {/* Job Match Specific Content */}
                  {analysisMode === 'match' && (
                    <div className="space-y-8">
                      <section className="space-y-4">
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Missing Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.keywords.map((k: string, i: number) => (
                            <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-900 rounded-lg text-[11px] font-bold uppercase tracking-widest">
                              {k}
                            </span>
                          ))}
                        </div>
                      </section>
                      <section className="space-y-4">
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Actionable Suggestions</h4>
                        <div className="space-y-3">
                          {analysisResult.suggestions.map((s: string, i: number) => (
                            <div key={i} className="flex gap-3 p-4 bg-white border border-gray-100 rounded-2xl text-[13px] text-gray-600 shadow-sm">
                              <Sparkles size={16} className="text-gray-900 shrink-0 mt-0.5 opacity-30" />
                              {s}
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                   <div className="p-6 bg-gray-50 rounded-full text-gray-300">
                      {analysisMode === 'ats' ? <ShieldCheck size={48} /> : <Target size={48} />}
                   </div>
                   <h3 className="text-lg font-semibold text-gray-900">Analysis Pending</h3>
                   <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
                     Click the run button to begin the AI evaluation of this resume variant.
                   </p>
                   <button 
                    onClick={() => analysisMode === 'ats' ? handleATSCheck(analyzingResume) : handleMatchCheck(analyzingResume)}
                    className="mt-4 px-8 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-xl shadow-gray-200"
                   >
                     Run Analysis
                   </button>
                </div>
              )}
            </div>

            <footer className="p-6 border-t border-gray-100 bg-gray-50/50">
              <button 
                onClick={closeAnalysis}
                className="w-full py-4 bg-white border border-gray-200 text-gray-900 rounded-2xl text-sm font-bold hover:bg-gray-50 transition-all"
              >
                Close Analysis
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
