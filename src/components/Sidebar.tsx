import React from 'react';
import { LOGO_URL } from '../data/mockData';

interface SidebarProps {
  activeTab: 'dashboard' | 'students' | 'fees-records' | 'book-records';
  setActiveTab: (tab: 'dashboard' | 'students' | 'fees-records' | 'book-records') => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  onOpenProfile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile,
  onOpenProfile,
}) => {
  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Dashboard',
      icon: 'dashboard',
    },
    {
      id: 'students' as const,
      label: 'Students',
      icon: 'school',
    },
    {
      id: 'fees-records' as const,
      label: 'Fees Records',
      icon: 'payments',
    },
    {
      id: 'book-records' as const,
      label: 'Book Records',
      icon: 'menu_book',
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-[#f1f4f9] z-50 flex flex-col pt-6 pb-8 border-r border-[#e0e3e8]/60 transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo & Institute Header */}
        <div className="px-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#003820] p-1 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
              <img
                src={LOGO_URL}
                alt="Pharma Sapience Logo"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[19px] leading-[22px] text-[#003820] font-bold tracking-tight">
                Pharma Sapience
              </span>
              <span className="text-[10px] font-semibold text-[#404942] uppercase tracking-wider mt-0.5">
                Coaching Institute
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={() => setIsOpenMobile(false)}
            className="lg:hidden p-1.5 text-[#404942] hover:text-[#181c20] rounded-lg hover:bg-[#e5e8ee]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpenMobile(false);
                }}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all text-left text-[14px] leading-5 ${
                  isActive
                    ? 'bg-[#0f5132] text-[#84c39b] font-semibold shadow-xs'
                    : 'text-[#404942] hover:bg-[#e5e8ee] hover:text-[#181c20] font-normal'
                }`}
              >
                <span
                  className={`material-symbols-outlined mr-3 text-[22px] ${
                    isActive ? 'text-[#84c39b]' : 'text-[#404942]'
                  }`}
                >
                  {item.icon}
                </span>
                <span className={isActive ? 'text-white' : ''}>{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#84c39b]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Institute Status Widget */}
        <div className="px-5 mb-4">
          <div className="bg-[#e5e8ee]/70 border border-[#e0e3e8] rounded-xl p-3 text-xs text-[#404942]">
            <div className="flex items-center justify-between font-semibold text-[#181c20] mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Session
              </span>
              <span className="text-[11px] text-[#0f5132] font-bold">GPAT-2025</span>
            </div>
            <p className="text-[11px] text-[#404942]">
              Dr. Sharma’s Pharmacology grand mock evaluation in progress.
            </p>
          </div>
        </div>

        {/* Bottom Profile Section */}
        <div className="px-5 pt-2">
          <div
            onClick={onOpenProfile}
            className="p-3 rounded-xl bg-[#ebeef3] hover:bg-[#e0e3e8] border border-[#e0e3e8]/70 flex items-center gap-3 transition-colors cursor-pointer group"
          >
            <div className="relative">
              <img
                alt="Dr. R. Sharma"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0f5132]/30"
                src={LOGO_URL}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="flex flex-col overflow-hidden min-w-0">
              <span className="text-[14px] font-semibold text-[#181c20] truncate group-hover:text-[#0f5132]">
                Dr. R. Sharma
              </span>
              <span className="text-[12px] text-[#404942] truncate">Administrator</span>
            </div>
            <span className="material-symbols-outlined ml-auto text-[18px] text-[#707971] group-hover:translate-x-0.5 transition-transform">
              chevron_right
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
