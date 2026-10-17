import React, { useState } from 'react';
import { Student, FeeTransaction } from '../types';

interface RecordFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onAddFee: (fee: FeeTransaction) => void;
}

export const RecordFeeModal: React.FC<RecordFeeModalProps> = ({
  isOpen,
  onClose,
  students,
  onAddFee,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    students[0]?.id || ''
  );
  const [amount, setAmount] = useState<string>('25000');
  const [paymentMode, setPaymentMode] = useState<
    'UPI / GPay' | 'Bank Transfer' | 'Credit Card' | 'UPI / PhonePe' | 'Cash'
  >('UPI / GPay');
  const [remarks, setRemarks] = useState<string>('Installment #2 Tuition & Mock series');

  if (!isOpen) return null;

  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent) return;

    const parsedAmount = parseInt(amount) || 0;
    const nameParts = currentStudent.name.split(' ');
    const initials = nameParts.map((p) => p[0]).join('').toUpperCase().slice(0, 2);

    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newFee: FeeTransaction = {
      id: `fee-${Date.now()}`,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      initials,
      course: currentStudent.course,
      amount: parsedAmount,
      date: dateFormatted,
      rawDate: now.toISOString().split('T')[0],
      paymentMode,
      receiptNo: `PS-REC-2024-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Completed',
      remarks,
    };

    onAddFee(newFee);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e0e3e8]">
        {/* Modal Header */}
        <div className="p-6 bg-[#f1f4f9] border-b border-[#e0e3e8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#003820] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_card</span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#181c20]">
                Record Fee Payment
              </h3>
              <p className="text-[12px] text-[#404942]">
                Generate official transaction receipt
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Student selection */}
          <div>
            <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
              Select Enrolled Scholar *
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none cursor-pointer focus:bg-white"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.course} - {s.batch})
                </option>
              ))}
            </select>
          </div>

          {/* Amount Paid */}
          <div>
            <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
              Payment Amount (₹) *
            </label>
            <input
              type="number"
              required
              min="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[14px] font-semibold text-[#003820] outline-none focus:bg-white"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
              Payment Channel / Mode *
            </label>
            <select
              value={paymentMode}
              onChange={(e) =>
                setPaymentMode(
                  e.target.value as
                    | 'UPI / GPay'
                    | 'Bank Transfer'
                    | 'Credit Card'
                    | 'UPI / PhonePe'
                    | 'Cash'
                )
              }
              className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none cursor-pointer focus:bg-white"
            >
              <option value="UPI / GPay">UPI / Google Pay</option>
              <option value="UPI / PhonePe">UPI / PhonePe</option>
              <option value="Bank Transfer">Bank Transfer (NEFT / RTGS)</option>
              <option value="Credit Card">Credit / Debit Card</option>
              <option value="Cash">Cash at Center Desk</option>
            </select>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
              Remarks / Transaction Reference
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. UTR #4819203 or Installment 2"
              className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:bg-white"
            />
          </div>

          {/* Quick Info Box */}
          {currentStudent && (
            <div className="p-3 bg-[#ebeef3] rounded-xl text-[12px] space-y-1">
              <div className="flex justify-between text-[#404942]">
                <span>Registered Course:</span>
                <span className="font-semibold text-[#181c20]">{currentStudent.course}</span>
              </div>
              <div className="flex justify-between text-[#404942]">
                <span>Current Status:</span>
                <span className="font-semibold text-[#0f5132]">{currentStudent.feeStatus}</span>
              </div>
            </div>
          )}

          {/* Actions */}
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
              Generate Receipt &amp; Credit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
