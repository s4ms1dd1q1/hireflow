
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Kanban, List, FileText, Settings, CreditCard, Plus, ChevronRight, Search, Bell } from 'lucide-react';
import Dashboard from './components/Dashboard';
import KanbanBoard from './components/KanbanBoard';
import ListTab from './components/ListTab';
import ResumeManager from './components/ResumeManager';
import SettingsPage from './components/SettingsPage';
import BillingPage from './components/BillingPage';
import { MOCK_APPLICATIONS, MOCK_RESUMES } from './constants';
import { Application } from './types';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: <LayoutGrid size={16} />, label: 'Dashboard', path: '/' },
    { icon: <Kanban size={16} />, label: 'Pipeline', path: '/pipeline' },
    { icon: <List size={16} />, label: 'Applications', path: '/list' },
    { icon: <FileText size={16} />, label: 'Resumes', path: '/resumes' },
  ];

  const systemItems = [
    { icon: <Settings size={16} />, label: 'Settings', path: '/settings' },
    { icon: <CreditCard size={16} />, label: 'Billing', path: '/billing' },
  ];

  return (
    <aside className="w-[240px] border-r border-gray-100 h-screen flex flex-col bg-white sticky top-0">
      <div className="px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gray-900 flex items-center justify-center text-white text-xs font-bold">H</div>
          <span className="font-semibold text-sm tracking-tight text-gray-900">HireFlow</span>
        </div>
        <button className="text-gray-400 hover:text-gray-900 transition-colors">
          <Search size={16} />
        </button>
      </div>
      
      <div className="flex-1 px-3 space-y-6">
        <div>
          <p className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Main</p>
          <nav className="space-y-0.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] transition-all duration-150 ${
                    isActive 
                      ? 'bg-gray-100 text-gray-900 font-medium' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className={isActive ? 'text-gray-900' : 'text-gray-400'}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <p className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Workspace</p>
          <nav className="space-y-0.5">
            {systemItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] transition-all duration-150 ${
                    isActive 
                      ? 'bg-gray-100 text-gray-900 font-medium' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className={isActive ? 'text-gray-900' : 'text-gray-400'}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
          <img src="https://picsum.photos/seed/user/40/40" alt="Profile" className="w-8 h-8 rounded-full border border-gray-100" />
          <div className="flex-1 overflow-hidden">
            <p className="text-[13px] font-medium text-gray-900 truncate">Alex Rivera</p>
            <p className="text-[11px] text-gray-400 truncate uppercase tracking-tighter">Personal Space</p>
          </div>
          <Bell size={14} className="text-gray-300 group-hover:text-gray-500" />
        </div>
      </div>
    </aside>
  );
};

export default function App() {
  const [apps, setApps] = useState<Application[]>(MOCK_APPLICATIONS);
  
  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden text-gray-900 font-normal bg-white">
        <Sidebar />
        <main className="flex-1 overflow-y-auto scrollbar-hide relative bg-white">
          <Routes>
            <Route path="/" element={<Dashboard apps={apps} />} />
            <Route path="/pipeline" element={<KanbanBoard apps={apps} setApps={setApps} />} />
            <Route path="/list" element={<ListTab apps={apps} setApps={setApps} />} />
            <Route path="/resumes" element={<ResumeManager resumes={MOCK_RESUMES} />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/billing" element={<BillingPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
