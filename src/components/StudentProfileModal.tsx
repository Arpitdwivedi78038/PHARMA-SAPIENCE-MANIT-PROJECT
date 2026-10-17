import React from 'react';
import { Student } from '../types';

interface StudentProfileModalProps {
  student: Student | null;
  onClose: () => void;
  onOpenRecordFeeForStudent?: (student: Student) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  onClose,
  onOpenRecordFeeForStudent,
}) => {
  if (!student) return null;

  const feePercentage = Math.round((student.paidFee / (student.totalFee || 1)) * 100);
  const remainingFee = Math.max(0, student.totalFee - student.paidFee);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#e0e3e8]">
        {/* Header Banner */}
        <div className="p-6 bg-[#0f5132] text-white relative overflow-hidden rounded-t-2xl">
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-4">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-16 h-16 rounded-full object-cover ring-3 ring-white/30"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[20px] font-bold text-white">{student.name}</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-[#b0f1c7] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">verified</span> Verified Scholar
                  </span>
                </div>
                <p className="text-[13px] text-[#84c39b] mt-0.5">{student.course}</p>
                <p className="text-[11px] text-white/70 mt-0.5">{student.batch}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Performance Metrics Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#f1f4f9] rounded-xl p-3.5 border border-[#e0e3e8]">
              <span className="text-[11px] font-semibold text-[#707971] uppercase">
                Attendance Rate
              </span>
              <p className="text-[20px] font-bold text-[#0f5132] mt-0.5">
                {student.attendanceRate}%
              </p>
              <p className="text-[10px] text-[#404942]">Regular biometric verified</p>
            </div>
            <div className="bg-[#f1f4f9] rounded-xl p-3.5 border border-[#e0e3e8]">
              <span className="text-[11px] font-semibold text-[#707971] uppercase">
                GPAT Mock Standing
              </span>
              <p className="text-[20px] font-bold text-[#003820] mt-0.5">
                {student.mockPercentile} %ile
              </p>
              <p className="text-[10px] text-[#0f5132]">Top 5% candidate tier</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-xl p-4 border border-[#e0e3e8] space-y-2 text-[13px]">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#707971] mb-2">
              Contact &amp; Admission Info
            </h4>
            <div className="flex justify-between">
              <span className="text-[#707971]">Registered Phone:</span>
              <span className="font-semibold text-[#181c20]">{student.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#707971]">Student Email:</span>
              <span className="font-semibold text-[#181c20]">{student.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#707971]">Enrollment Date:</span>
              <span className="font-medium text-[#181c20]">{student.enrolledDate}</span>
            </div>
          </div>

          {/* Fee Payment Breakdown */}
          <div className="bg-[#f1f4f9] rounded-xl p-4 border border-[#e0e3e8]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#707971]">
                Fee Ledger Clearance
              </h4>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  student.feeStatus === 'Paid'
                    ? 'bg-[#b0f1c7]/60 text-[#0f5132]'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {student.feeStatus}
              </span>
            </div>

            <div className="w-full bg-[#e0e3e8] h-2.5 rounded-full overflow-hidden mb-3">
              <div
                className="bg-[#0f5132] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, feePercentage)}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[12px]">
              <div>
                <span className="text-[10px] text-[#707971]">Total Course Fee</span>
                <p className="font-bold text-[#181c20]">
                  ₹{student.totalFee.toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-[#707971]">Amount Paid</span>
                <p className="font-bold text-[#0f5132]">
                  ₹{student.paidFee.toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-[#707971]">Pending Due</span>
                <p className="font-bold text-[#b6152e]">
                  ₹{remainingFee.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          {/* Academic Notes */}
          {student.notes && (
            <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl text-[12px]">
              <span className="font-semibold text-amber-900 block mb-0.5">
                Faculty Mentor Remarks:
              </span>
              <p className="text-amber-800">{student.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#e0e3e8]">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#ebeef3] hover:bg-[#e0e3e8] text-[#404942] text-[13px] font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
            {onOpenRecordFeeForStudent && remainingFee > 0 && (
              <button
                onClick={() => {
                  onClose();
                  onOpenRecordFeeForStudent(student);
                }}
                className="px-4 py-2 rounded-xl bg-[#003820] hover:bg-[#0f5132] text-white text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">payments</span>
                Record Fee Installment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
