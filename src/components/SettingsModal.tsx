import React, { useState } from 'react';
import { LOGO_URL } from '../data/mockData';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [instituteName, setInstituteName] = useState('Pharma Sapience Coaching Institute');
  const [adminName, setAdminName] = useState('Dr. R. Sharma');
  const [academicYear, setAcademicYear] = useState('2024-2025');
  const [nextMock, setNextMock] = useState('All-India GPAT Mock #4 (Sunday, 10:00 AM)');
  const [centerPhone, setCenterPhone] = useState('+91 98451 00234');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e0e3e8]">
        {/* Modal Header */}
        <div className="p-6 bg-[#f1f4f9] border-b border-[#e0e3e8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#003820] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">settings</span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#181c20]">
                Institute Configuration
              </h3>
              <p className="text-[12px] text-[#404942]">
                Admin parameters &amp; session schedule
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#707971] hover:text-[#181c20] hover:bg-[#e0e3e8]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-[#ebeef3] rounded-xl border border-[#e0e3e8]">
            <img
              src={LOGO_URL}
              alt="Logo"
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#003820]"
            />
            <div>
              <p className="text-[14px] font-bold text-[#003820]">Official Institute Logo</p>
              <p className="text-[11px] text-[#404942]">
                Pharma Sapience Botanical &amp; Medical Insignia
              </p>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
              Institute Name
            </label>
            <input
              type="text"
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
                Lead Administrator
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
                Active Academic Year
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
              Next Scheduled Mock Exam
            </label>
            <input
              type="text"
              value={nextMock}
              onChange={(e) => setNextMock(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
              Helpdesk &amp; Admissions Hotline
            </label>
            <input
              type="text"
              value={centerPhone}
              onChange={(e) => setCenterPhone(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:bg-white"
            />
          </div>

          {savedSuccess && (
            <div className="p-2.5 rounded-xl bg-[#b0f1c7]/50 text-[#003820] text-[12px] font-bold text-center">
              Settings updated successfully!
            </div>
          )}

          <div className="pt-4 border-t border-[#e0e3e8] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#ebeef3] hover:bg-[#e0e3e8] text-[#404942] text-[13px] font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#003820] hover:bg-[#0f5132] text-white text-[13px] font-semibold transition-all cursor-pointer shadow-xs"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
