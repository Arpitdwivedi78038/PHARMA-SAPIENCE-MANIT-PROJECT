import React, { useState } from 'react';
import { Student } from '../types';

interface StudentsViewProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onOpenAddStudent: () => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  onSelectStudent,
  onOpenAddStudent,
}) => {
  const [filterBatch, setFilterBatch] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredStudents = students.filter((s) => {
    const matchesBatch = filterBatch === 'All' || s.batch === filterBatch;
    const matchesStatus = filterStatus === 'All' || s.feeStatus === filterStatus;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      s.name.toLowerCase().includes(query) ||
      s.course.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query) ||
      s.phone.includes(query);
    return matchesBatch && matchesStatus && matchesSearch;
  });

  const batches = ['All', 'Morning Batch A', 'Evening Batch B', 'Weekend Crash'];

  return (
    <div className="flex flex-col w-full pb-16 animate-in fade-in duration-200">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f5132] bg-[#b0f1c7]/40 px-2.5 py-0.5 rounded-full">
              Admissions &amp; Academic Roster
            </span>
          </div>
          <h1 className="text-[28px] font-bold text-[#181c20] tracking-tight">
            Enrolled Pharmacy Scholars
          </h1>
          <p className="text-[14px] text-[#404942]">
            Comprehensive student directory for GPAT, NIPER JEE &amp; University semester cohorts.
          </p>
        </div>

        <button
          onClick={onOpenAddStudent}
          className="px-4 py-2.5 rounded-xl bg-[#003820] text-white text-[13px] font-semibold hover:bg-[#0f5132] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Add New Student
        </button>
      </div>

      {/* Cohort Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#f1f4f9] rounded-xl p-4 border border-[#e0e3e8]/60">
          <span className="text-[11px] uppercase font-semibold text-[#404942]">Total Enrolled</span>
          <p className="text-[24px] font-bold text-[#181c20] mt-1">482</p>
          <span className="text-[11px] text-[#0f5132] font-medium">+28 new this month</span>
        </div>
        <div className="bg-[#f1f4f9] rounded-xl p-4 border border-[#e0e3e8]/60">
          <span className="text-[11px] uppercase font-semibold text-[#404942]">Avg Attendance</span>
          <p className="text-[24px] font-bold text-[#181c20] mt-1">95.4%</p>
          <span className="text-[11px] text-[#0f5132] font-medium">Biometric recorded</span>
        </div>
        <div className="bg-[#f1f4f9] rounded-xl p-4 border border-[#e0e3e8]/60">
          <span className="text-[11px] uppercase font-semibold text-[#404942]">GPAT Mock Target</span>
          <p className="text-[24px] font-bold text-[#181c20] mt-1">86.4%</p>
          <span className="text-[11px] text-[#0f5132] font-medium">Above qualifying cutoff</span>
        </div>
        <div className="bg-[#f1f4f9] rounded-xl p-4 border border-[#e0e3e8]/60">
          <span className="text-[11px] uppercase font-semibold text-[#404942]">Fee Clearance</span>
          <p className="text-[24px] font-bold text-[#181c20] mt-1">92.8%</p>
          <span className="text-[11px] text-[#0f5132] font-medium">On-time installment</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#f1f4f9] rounded-2xl p-4 border border-[#e0e3e8]/60 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#707971] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by scholar name, phone, or email..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:ring-2 focus:ring-[#0f5132]/30 focus:border-[#0f5132]"
          />
        </div>

        {/* Batch Chips & Views */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Batch Selector */}
          <div className="flex items-center gap-1 bg-[#ebeef3] p-1 rounded-xl">
            {batches.map((b) => (
              <button
                key={b}
                onClick={() => setFilterBatch(b)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                  filterBatch === b
                    ? 'bg-white text-[#0f5132] shadow-xs'
                    : 'text-[#404942] hover:text-[#181c20]'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Fee status dropdown */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#e0e3e8] text-[12px] font-medium text-[#181c20] outline-none cursor-pointer"
          >
            <option value="All">All Fee Status</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Pending">Pending</option>
          </select>

          {/* View mode toggle */}
          <div className="flex items-center bg-[#ebeef3] p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-[#0f5132] shadow-xs' : 'text-[#707971]'
              }`}
              title="Grid View"
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-[#0f5132] shadow-xs' : 'text-[#707971]'
              }`}
              title="Table View"
            >
              <span className="material-symbols-outlined text-[18px]">view_list</span>
            </button>
          </div>
        </div>
      </div>

      {/* Roster display */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#e0e3e8]">
          <span className="material-symbols-outlined text-[48px] text-[#707971] mb-2">
            person_search
          </span>
          <h3 className="text-[16px] font-semibold text-[#181c20]">No students found</h3>
          <p className="text-[13px] text-[#404942] mt-1 max-w-md mx-auto">
            Try adjusting your search criteria or batch filters to locate enrolled candidates.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl p-5 border border-[#e0e3e8]/70 shadow-2xs hover:shadow-md hover:border-[#0f5132]/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#e0e3e8]"
                    />
                    <div>
                      <h3 className="text-[15px] font-bold text-[#181c20] group-hover:text-[#0f5132] transition-colors">
                        {student.name}
                      </h3>
                      <p className="text-[11px] text-[#707971]">{student.enrolledTime}</p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      student.feeStatus === 'Paid'
                        ? 'bg-[#b0f1c7]/50 text-[#0f5132]'
                        : student.feeStatus === 'Partial'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {student.feeStatus}
                  </span>
                </div>

                <div className="space-y-2 py-2 text-[12px] border-t border-b border-[#f1f4f9]">
                  <div className="flex justify-between">
                    <span className="text-[#707971]">Course:</span>
                    <span className="font-semibold text-[#181c20] truncate text-right ml-2">
                      {student.course}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#707971]">Batch:</span>
                    <span className="font-medium text-[#181c20] truncate text-right ml-2">
                      {student.batch}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#707971]">Attendance:</span>
                    <span className="font-bold text-[#0f5132]">{student.attendanceRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#707971]">Mock Score:</span>
                    <span className="font-bold text-[#0f5132]">{student.mockPercentile} %ile</span>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 mt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#707971] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">menu_book</span>
                  {student.issuedBooksCount} books
                </span>
                <button
                  onClick={() => onSelectStudent(student)}
                  className="px-3 py-1.5 rounded-lg bg-[#003820]/10 hover:bg-[#003820] hover:text-white text-[#003820] text-[12px] font-semibold transition-all cursor-pointer flex items-center gap-1"
                >
                  View Profile &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e0e3e8] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="text-[11px] uppercase text-[#707971] tracking-wider bg-[#f1f4f9] border-b border-[#e0e3e8]">
                  <th className="py-3.5 px-4 font-semibold">Student Name</th>
                  <th className="py-3.5 px-4 font-semibold">Course</th>
                  <th className="py-3.5 px-4 font-semibold">Batch</th>
                  <th className="py-3.5 px-4 font-semibold">Attendance</th>
                  <th className="py-3.5 px-4 font-semibold">Mock %ile</th>
                  <th className="py-3.5 px-4 font-semibold">Fee Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-[#181c20] divide-y divide-[#f1f4f9]">
                {filteredStudents.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => onSelectStudent(s)}
                    className="hover:bg-[#f7f9ff] cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium flex items-center gap-3">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <span className="font-semibold text-[#181c20] hover:text-[#0f5132]">
                        {s.name}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#404942]">{s.course}</td>
                    <td className="py-3.5 px-4 text-[#404942]">{s.batch}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#0f5132]">
                      {s.attendanceRate}%
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#0f5132]">
                      {s.mockPercentile}%ile
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          s.feeStatus === 'Paid'
                            ? 'bg-[#b0f1c7]/50 text-[#0f5132]'
                            : s.feeStatus === 'Partial'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {s.feeStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-[#0f5132] font-semibold text-[12px] hover:underline">
                        Profile &rarr;
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
