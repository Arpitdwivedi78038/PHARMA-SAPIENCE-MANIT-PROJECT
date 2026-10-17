import React from 'react';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const subjectScores = [
    { name: 'Pharmacology & Toxicology', score: 94, questions: 28, target: 'High Yield' },
    { name: 'Pharmaceutics & Biopharmaceutics', score: 89, questions: 32, target: 'Core Focus' },
    { name: 'Medicinal & Pharmaceutical Chemistry', score: 85, questions: 30, target: 'Key Area' },
    { name: 'Pharmacognosy & Natural Products', score: 91, questions: 18, target: 'High Yield' },
    { name: 'Clinical Pharmacy & Drug Regulatory', score: 88, questions: 17, target: 'Practical' },
  ];

  const batchPerformances = [
    { batch: 'Morning Batch A', students: 165, avgAttendance: '98.2%', mockAvg: '94.5 %ile' },
    { batch: 'Evening Batch B', students: 185, avgAttendance: '95.6%', mockAvg: '92.1 %ile' },
    { batch: 'Weekend Crash', students: 100, avgAttendance: '91.8%', mockAvg: '89.4 %ile' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#e0e3e8]">
        {/* Modal Header */}
        <div className="p-6 bg-[#0f5132] text-white flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">insights</span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold">
                Institute Performance &amp; Analytics
              </h3>
              <p className="text-[12px] text-[#84c39b]">
                GPAT &amp; NIPER JEE Academic Benchmarks &bull; AY 2024-2025
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Analytics Body */}
        <div className="p-6 space-y-6">
          {/* Top highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#f1f4f9] p-4 rounded-xl border border-[#e0e3e8]">
              <span className="text-[11px] font-semibold uppercase text-[#707971]">
                Pharma Sapience Rate
              </span>
              <p className="text-[26px] font-bold text-[#003820] mt-1">86.4%</p>
              <span className="text-[11px] text-[#0f5132] font-semibold">
                6.1x above national avg (14.2%)
              </span>
            </div>
            <div className="bg-[#f1f4f9] p-4 rounded-xl border border-[#e0e3e8]">
              <span className="text-[11px] font-semibold uppercase text-[#707971]">
                Top 100 Ranks Produced
              </span>
              <p className="text-[26px] font-bold text-[#003820] mt-1">142</p>
              <span className="text-[11px] text-[#0f5132] font-semibold">
                Across NIPER &amp; GPAT
              </span>
            </div>
            <div className="bg-[#f1f4f9] p-4 rounded-xl border border-[#e0e3e8]">
              <span className="text-[11px] font-semibold uppercase text-[#707971]">
                Quarterly Growth
              </span>
              <p className="text-[26px] font-bold text-[#003820] mt-1">+14%</p>
              <span className="text-[11px] text-[#0f5132] font-semibold">
                Mock score progression
              </span>
            </div>
          </div>

          {/* Subject Mastery Breakdown */}
          <div>
            <h4 className="text-[14px] font-bold text-[#181c20] mb-3 flex items-center justify-between">
              <span>Subject-Wise Coaching Mastery &amp; Sectional Strength</span>
              <span className="text-[12px] text-[#0f5132] font-semibold">Target: &gt;80%</span>
            </h4>

            <div className="space-y-3 bg-[#f1f4f9] p-4 rounded-xl border border-[#e0e3e8]">
              {subjectScores.map((subj) => (
                <div key={subj.name} className="space-y-1">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="font-semibold text-[#181c20]">{subj.name}</span>
                    <span className="font-bold text-[#0f5132]">{subj.score}%</span>
                  </div>
                  <div className="w-full bg-[#e0e3e8] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#0f5132] h-full rounded-full transition-all duration-500"
                      style={{ width: `${subj.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Batch-wise comparisons */}
          <div>
            <h4 className="text-[14px] font-bold text-[#181c20] mb-3">
              Batch Performance &amp; Biometric Attendance
            </h4>
            <div className="overflow-x-auto border border-[#e0e3e8] rounded-xl">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-[#f1f4f9] text-[#707971] uppercase text-[10px] tracking-wider border-b border-[#e0e3e8]">
                  <tr>
                    <th className="py-2.5 px-3">Batch Name</th>
                    <th className="py-2.5 px-3">Candidates</th>
                    <th className="py-2.5 px-3">Biometric Attendance</th>
                    <th className="py-2.5 px-3 text-right">Mock Avg %ile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f4f9]">
                  {batchPerformances.map((b) => (
                    <tr key={b.batch}>
                      <td className="py-2.5 px-3 font-semibold text-[#181c20]">{b.batch}</td>
                      <td className="py-2.5 px-3 text-[#404942]">{b.students} Scholars</td>
                      <td className="py-2.5 px-3 font-medium text-[#0f5132]">{b.avgAttendance}</td>
                      <td className="py-2.5 px-3 font-bold text-[#003820] text-right">
                        {b.mockAvg}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Close button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#003820] text-white text-[13px] font-semibold hover:bg-[#0f5132] cursor-pointer"
            >
              Close Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
