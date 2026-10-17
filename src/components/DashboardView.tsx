import React, { useState } from 'react';
import { Student, FeeTransaction, BookRecord, Ranker } from '../types';

interface DashboardViewProps {
  students: Student[];
  fees: FeeTransaction[];
  books: BookRecord[];
  rankers: Ranker[];
  onOpenAnalytics: () => void;
  onOpenRankers: () => void;
  onOpenAddStudent: () => void;
  onSelectStudent: (student: Student) => void;
  onSelectFee: (fee: FeeTransaction) => void;
  onNavigateTab: (tab: 'dashboard' | 'students' | 'fees-records' | 'book-records') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  fees,
  books,
  rankers,
  onOpenAnalytics,
  onOpenRankers,
  onOpenAddStudent,
  onSelectStudent,
  onSelectFee,
  onNavigateTab,
}) => {
  const [selectedBatchFilter, setSelectedBatchFilter] = useState<string>('All Batches');

  const filteredEnrollments = selectedBatchFilter === 'All Batches'
    ? students.slice(0, 4)
    : students.filter((s) => s.batch.toLowerCase().includes(selectedBatchFilter.toLowerCase())).slice(0, 4);

  const topRankers = rankers.slice(0, 2);

  return (
    <div className="flex flex-col w-full pb-16 animate-in fade-in duration-200">
      {/* Top Banner / Welcome Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Main Welcome Card */}
        <div className="lg:col-span-8 bg-[#0f5132] rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between text-[#84c39b] shadow-sm">
          {/* Ambient background bloom */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#003820]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#84c39b]/90 font-bold mb-2 inline-block">
                Academic Year 2024-2025
              </span>
              <h1 className="text-[26px] sm:text-[32px] font-semibold text-white tracking-tight leading-tight">
                GPAT &amp; NIPER Excellence Portal
              </h1>
              <p className="text-[14px] sm:text-[15px] text-white/90 mt-2 max-w-xl leading-relaxed">
                Welcome back, Dr. Sharma. Institute performance is up by 14% this quarter with 142 top-tier pharmacy selections recorded so far.
              </p>
            </div>

            {/* Next Major Mock Test banner card */}
            <div className="flex flex-col items-start md:items-end gap-1.5 bg-[#003820]/60 backdrop-blur-md px-5 py-4 rounded-xl border border-white/10 shrink-0">
              <span className="text-[12px] text-white/70 font-medium">Next Major Mock Test</span>
              <span className="text-[18px] sm:text-[20px] text-white font-bold">All-India GPAT Mock #4</span>
              <span className="text-[13px] text-[#b0f1c7] flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[16px]">schedule</span> Sunday, 10:00 AM
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar at Bottom */}
          <div className="relative z-10 mt-8 pt-6 border-t border-[#84c39b]/20 flex flex-wrap gap-6 sm:gap-8 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-[#003820] flex items-center justify-center font-bold text-[14px] shadow-xs">
                98%
              </div>
              <div>
                <div className="text-[14px] text-white font-semibold">Attendance Rate</div>
                <div className="text-[12px] text-[#84c39b]">Across all batches this week</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-[#003820] flex items-center justify-center font-bold text-[14px] shadow-xs">
                450
              </div>
              <div>
                <div className="text-[14px] text-white font-semibold">Active Scholars</div>
                <div className="text-[12px] text-[#84c39b]">Enrolled in Pharma &amp; Clinical tracks</div>
              </div>
            </div>

            <button
              onClick={onOpenAnalytics}
              className="px-5 py-2.5 rounded-xl bg-white text-[#0f5132] font-semibold text-[14px] hover:bg-[#f7f9ff] active:scale-[0.98] transition-all shadow-sm cursor-pointer ml-auto sm:ml-0"
            >
              View Analytics
            </button>
          </div>
        </div>

        {/* Quick Highlights / Success Metric Card */}
        <div className="lg:col-span-4 bg-[#f1f4f9] rounded-2xl p-6 flex flex-col justify-between shadow-xs border border-[#e0e3e8]/50 relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] uppercase tracking-wider text-[#404942] font-semibold">
                Success Highlight
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#003820]/10 text-[#003820] text-[11px] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#0f5132]">verified</span> Top Results
              </span>
            </div>
            <h3 className="text-[20px] text-[#181c20] font-semibold mb-2">NIPER JEE 2024 Rankers</h3>
            <p className="text-[13px] text-[#404942] mb-5 leading-normal">
              Our classroom coaching produced 3 students in the national Top 50.
            </p>

            {/* Ranker Avatars / Mini list */}
            <div className="space-y-3">
              {topRankers.map((ranker) => (
                <div
                  key={ranker.id}
                  onClick={onOpenRankers}
                  className="flex items-center justify-between p-3 rounded-xl bg-white shadow-2xs border border-[#e0e3e8]/60 hover:border-[#0f5132]/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <img
                      className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-[#e0e3e8]"
                      alt={ranker.name}
                      src={ranker.avatar}
                    />
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-[#181c20] group-hover:text-[#0f5132] truncate">
                        {ranker.name}
                      </div>
                      <div className="text-[11px] text-[#404942] truncate">
                        {ranker.rank}
                      </div>
                    </div>
                  </div>
                  <span className="text-[#003820] font-bold text-[13px] shrink-0">
                    {ranker.percentile}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenRankers}
            className="mt-4 text-[#003820] text-[13px] font-semibold flex items-center gap-1 hover:underline cursor-pointer group"
          >
            Explore all rankers
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Key Metrics Grid (4 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric 1 */}
        <div className="bg-[#f1f4f9] rounded-2xl p-6 shadow-xs border border-[#e0e3e8]/50 flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] uppercase tracking-wider text-[#404942] font-medium">
              Total Students
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#003820]/10 text-[#003820] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
          </div>
          <div>
            <div className="text-[30px] font-bold text-[#181c20] tracking-tight">482</div>
            <div className="text-[12px] text-[#404942] mt-1 flex items-center gap-1">
              <span className="text-[#003820] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[15px]">trending_up</span> +12%
              </span>
              vs last month
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#f1f4f9] rounded-2xl p-6 shadow-xs border border-[#e0e3e8]/50 flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] uppercase tracking-wider text-[#404942] font-medium">
              Fees Collected
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#003820]/10 text-[#003820] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
          </div>
          <div>
            <div className="text-[30px] font-bold text-[#181c20] tracking-tight">₹24.8L</div>
            <div className="text-[12px] text-[#404942] mt-1 flex items-center gap-1">
              <span className="text-[#003820] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[15px]">trending_up</span> +8.4%
              </span>
              this quarter
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#f1f4f9] rounded-2xl p-6 shadow-xs border border-[#e0e3e8]/50 flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] uppercase tracking-wider text-[#404942] font-medium">
              Books Issued
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#003820]/10 text-[#003820] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>
          </div>
          <div>
            <div className="text-[30px] font-bold text-[#181c20] tracking-tight">1,240</div>
            <div className="text-[12px] text-[#404942] mt-1 flex items-center gap-1">
              <span>94% return rate on-time</span>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#f1f4f9] rounded-2xl p-6 shadow-xs border border-[#e0e3e8]/50 flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] uppercase tracking-wider text-[#404942] font-medium">
              GPAT Conversion
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#003820]/10 text-[#003820] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">insights</span>
            </div>
          </div>
          <div>
            <div className="text-[30px] font-bold text-[#181c20] tracking-tight">86.4%</div>
            <div className="text-[12px] text-[#404942] mt-1 flex items-center gap-1">
              <span className="text-[#003820] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[15px]">trending_up</span> +4.2%
              </span>
              national average
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Split: Recent Fee Submissions & Library Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Fee Submissions Table (8 cols) */}
        <div className="lg:col-span-8 bg-[#f1f4f9] rounded-2xl p-6 shadow-xs border border-[#e0e3e8]/50 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-[20px] text-[#181c20] font-bold">Recent Fee Submissions</h2>
              <p className="text-[13px] text-[#404942]">
                Latest transactions recorded across all pharmacy coaching batches.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('fees-records')}
              className="px-4 py-2 rounded-xl bg-[#003820] text-white text-[13px] font-semibold hover:bg-[#0f5132] active:scale-[0.98] transition-all self-start sm:self-auto cursor-pointer"
            >
              View All Records
            </button>
          </div>

          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="text-[11px] uppercase text-[#404942] tracking-wider bg-[#ebeef3]/60">
                  <th className="py-3 px-4 rounded-l-xl font-semibold">Student Name</th>
                  <th className="py-3 px-4 font-semibold">Course</th>
                  <th className="py-3 px-4 font-semibold">Amount</th>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 rounded-r-xl font-semibold">Payment Mode</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-[#181c20] divide-y divide-[#ebeef3]">
                {fees.slice(0, 4).map((fee) => (
                  <tr
                    key={fee.id}
                    onClick={() => onSelectFee(fee)}
                    className="hover:bg-[#ebeef3]/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-medium flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#003820]/10 text-[#003820] flex items-center justify-center font-semibold text-[11px] shrink-0">
                        {fee.initials}
                      </div>
                      <span className="group-hover:text-[#0f5132] font-semibold">
                        {fee.studentName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#404942]">{fee.course}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#003820]">
                      ₹{fee.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-[#404942]">{fee.date}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium inline-block ${
                          fee.paymentMode.includes('Bank')
                            ? 'bg-[#e0e3e8] text-[#181c20]'
                            : fee.paymentMode.includes('Credit')
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-[#003820]/10 text-[#003820]'
                        }`}
                      >
                        {fee.paymentMode}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Summary Widget: Issued Books (4 cols) */}
        <div className="lg:col-span-4 bg-[#f1f4f9] rounded-2xl p-6 shadow-xs border border-[#e0e3e8]/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[20px] text-[#181c20] font-bold">Book Inventory</h3>
              <span className="text-[12px] text-[#003820] font-semibold bg-[#003820]/10 px-2.5 py-0.5 rounded-full">
                Library Status
              </span>
            </div>
            <p className="text-[13px] text-[#404942] mb-5">
              Recent textbook &amp; pharmacology compendium checkouts.
            </p>

            <div className="space-y-3.5">
              {books.slice(0, 3).map((book, idx) => {
                const isDueReturn = idx === 2;
                return (
                  <div
                    key={book.id}
                    onClick={() => onNavigateTab('book-records')}
                    className="p-3.5 rounded-xl bg-white flex items-center justify-between shadow-2xs border border-[#e0e3e8]/50 hover:border-[#0f5132]/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-10 h-10 rounded-lg bg-[#ebeef3] flex items-center justify-center text-[#003820] shrink-0 group-hover:bg-[#003820]/10 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">menu_book</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[13px] font-semibold text-[#181c20] truncate group-hover:text-[#0f5132]">
                          {book.title}
                        </h4>
                        <p className="text-[11px] text-[#404942] truncate">
                          {book.authorEdition}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 ${
                        isDueReturn
                          ? 'bg-[#b6152e]/10 text-[#b6152e]'
                          : 'bg-[#003820]/10 text-[#003820]'
                      }`}
                    >
                      {isDueReturn ? '5 Due Return' : `${book.issuedCopies} Issued`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#e0e3e8]">
            <button
              onClick={() => onNavigateTab('book-records')}
              className="w-full py-2.5 rounded-xl bg-[#ebeef3] hover:bg-[#e0e3e8] active:scale-[0.99] flex items-center justify-center gap-2 text-[#181c20] font-semibold text-[13px] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">library_books</span>
              Manage Library Records
            </button>
          </div>
        </div>
      </div>

      {/* Recent Student Enrollments Grid */}
      <div className="bg-[#f1f4f9] rounded-2xl p-6 shadow-xs border border-[#e0e3e8]/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-[20px] text-[#181c20] font-bold">Recent Student Enrollments</h2>
            <p className="text-[13px] text-[#404942]">
              New candidates admitted into pharmacy coaching programs this week.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedBatchFilter}
              onChange={(e) => setSelectedBatchFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#ebeef3] hover:bg-[#e0e3e8] text-[#181c20] text-[13px] font-medium outline-none border-none transition-colors cursor-pointer"
            >
              <option value="All Batches">All Batches</option>
              <option value="Morning">Morning Batch A</option>
              <option value="Evening">Evening Batch B</option>
              <option value="Weekend">Weekend Crash</option>
            </select>
            <button
              onClick={onOpenAddStudent}
              className="px-4 py-2 rounded-xl bg-[#003820] text-white text-[13px] font-semibold hover:bg-[#0f5132] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">add</span> Add Student
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEnrollments.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl p-5 flex flex-col justify-between shadow-2xs border border-[#e0e3e8]/60 hover:shadow-sm transition-all group"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#e0e3e8]/60 shrink-0"
                    alt={student.name}
                    src={student.avatar}
                  />
                  <div className="min-w-0">
                    <h4 className="text-[14px] font-semibold text-[#181c20] truncate group-hover:text-[#0f5132]">
                      {student.name}
                    </h4>
                    <p className="text-[11px] text-[#404942] truncate">{student.enrolledTime}</p>
                  </div>
                </div>

                <div className="space-y-1.5 mb-4 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-[#404942]">Course:</span>
                    <span className="font-medium text-[#181c20] truncate ml-2 text-right">
                      {student.course}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#404942]">Batch:</span>
                    <span className="font-medium text-[#181c20] truncate ml-2 text-right">
                      {student.batch}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#ebeef3] flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#003820]/10 text-[#003820] text-[11px] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span> Verified
                </span>
                <button
                  onClick={() => onSelectStudent(student)}
                  className="text-[#003820] text-[13px] font-semibold cursor-pointer hover:underline flex items-center gap-0.5"
                >
                  Profile &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
