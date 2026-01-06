
import React, { useState } from 'react';
import { Application, ApplicationStage } from '../types';
import { STAGE_COLORS } from '../constants';
import { Plus, MoreHorizontal, Calendar, DollarSign, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import ApplicationDetail from './ApplicationDetail';
import NewApplicationModal from './NewApplicationModal';

interface KanbanBoardProps {
  apps: Application[];
  setApps: React.Dispatch<React.SetStateAction<Application[]>>;
}

export default function KanbanBoard({ apps, setApps }: KanbanBoardProps) {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [draggedOverStage, setDraggedOverStage] = useState<ApplicationStage | null>(null);
  
  const stages = Object.values(ApplicationStage);

  const onDragStart = (e: React.DragEvent, appId: string) => {
    e.dataTransfer.setData('appId', appId);
  };

  const onDrop = (e: React.DragEvent, stage: ApplicationStage) => {
    e.preventDefault();
    const appId = e.dataTransfer.getData('appId');
    setApps(prev => prev.map(app => 
      app.id === appId ? { ...app, stage } : app
    ));
    setDraggedOverStage(null);
  };

  const onDragOver = (e: React.DragEvent, stage: ApplicationStage) => {
    e.preventDefault();
    setDraggedOverStage(stage);
  };

  const handleAddApp = (newApp: Application) => {
    setApps(prev => [newApp, ...prev]);
  };

  return (
    <div className="p-12 h-full flex flex-col bg-white">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Pipeline</h1>
          <p className="text-gray-500 text-[14px]">Visual tracking for your job search flow.</p>
        </div>
        <button 
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center gap-2 px-4 py-1.5 bg-gray-900 text-white rounded-md text-[13px] font-medium hover:bg-black transition-all shadow-sm"
        >
          <Plus size={14} />
          Add Job
        </button>
      </header>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
        {stages.map((stage) => {
          const stageApps = apps.filter(a => a.stage === stage);
          const isOver = draggedOverStage === stage;
          
          return (
            <div 
              key={stage} 
              className={`flex-shrink-0 w-72 flex flex-col rounded-xl transition-all duration-200 ${
                isOver ? 'bg-gray-50 ring-1 ring-gray-200' : 'bg-transparent'
              }`}
              onDragOver={(e) => onDragOver(e, stage)}
              onDragLeave={() => setDraggedOverStage(null)}
              onDrop={(e) => onDrop(e, stage)}
            >
              <div className="py-3 px-4 flex justify-between items-center border-b border-gray-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">
                    {stage}
                  </span>
                  <span className="text-gray-400 text-[11px] font-bold">{stageApps.length}</span>
                </div>
                <button className="text-gray-300 hover:text-gray-900">
                  <Plus size={14} />
                </button>
              </div>

              <div className="flex-1 px-1 space-y-2 overflow-y-auto scrollbar-hide pb-6 min-h-[500px]">
                {stageApps.map((app) => (
                  <div 
                    key={app.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, app.id)}
                    onClick={() => setSelectedApp(app)}
                    className="group bg-white border border-gray-100 p-4 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:border-gray-300 transition-all duration-150 cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-8 h-8 rounded bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                        <img src={app.logoUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <button className="text-gray-300 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                    
                    <h3 className="text-[13px] font-semibold text-gray-900 leading-snug truncate group-hover:underline">
                      {app.role}
                    </h3>
                    <p className="text-[12px] text-gray-500 font-normal mb-4">{app.company}</p>

                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                          {app.location && (
                            <span className="flex items-center gap-0.5">
                              <MapPin size={10} />
                              {app.location}
                            </span>
                          )}
                       </div>
                       {app.description && <Sparkles size={12} className="text-gray-200 group-hover:text-gray-400" />}
                    </div>
                  </div>
                ))}
                
                {stageApps.length === 0 && (
                   <div className={`h-24 border border-dashed border-gray-100 rounded-lg flex items-center justify-center transition-all ${isOver ? 'bg-gray-50' : ''}`}>
                      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">No entries</p>
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <NewApplicationModal 
        isOpen={isNewModalOpen} 
        onClose={() => setIsNewModalOpen(false)} 
        onAdd={handleAddApp} 
      />

      {selectedApp && (
        <ApplicationDetail 
          app={selectedApp} 
          onClose={() => setSelectedApp(null)}
          onUpdate={(updated) => setApps(prev => prev.map(a => a.id === updated.id ? updated : a))}
        />
      )}
    </div>
  );
}
