
import React, { useState } from 'react';
import { Resume } from '../types';
import { FileText, Plus, MoreHorizontal, Download, Eye, Clock, Sparkles } from 'lucide-react';

export default function ResumeManager({ resumes }: { resumes: Resume[] }) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="p-12 max-w-[1200px] mx-auto space-y-12 animate-fade-in">
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
                <button className="text-gray-300 hover:text-gray-900">
                  <MoreHorizontal size={16} />
                </button>
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
    </div>
  );
}
