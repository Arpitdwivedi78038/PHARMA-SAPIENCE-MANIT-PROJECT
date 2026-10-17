import React, { useState } from 'react';
import { FeeTransaction } from '../types';

interface FeesViewProps {
  fees: FeeTransaction[];
  onSelectFee: (fee: FeeTransaction) => void;
  onOpenRecordFee: () => void;
}

export const FeesView: React.FC<FeesViewProps> = ({
  fees,
  onSelectFee,
  onOpenRecordFee,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFees = fees.filter((fee) => {
    const matchesMethod =
      selectedMethod === 'All' || fee.paymentMode.toLowerCase().includes(selectedMethod.toLowerCase());
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      fee.studentName.toLowerCase().includes(query) ||
      fee.receiptNo.toLowerCase().includes(query) ||
      fee.course.toLowerCase().includes(query);
    return matchesMethod && matchesSearch;
  });

  const totalCollectedAmount = fees.reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="flex flex-col w-full pb-16 animate-in fade-in duration-200">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f5132] bg-[#b0f1c7]/40 px-2.5 py-0.5 rounded-full">
              Finance &amp; Collections Ledger
            </span>
          </div>
          <h1 className="text-[28px] font-bold text-[#181c20] tracking-tight">
            Fee Records &amp; Accounts
          </h1>
          <p className="text-[14px] text-[#404942]">
            Detailed tracking of all tuition installments, mock registration fees, and receipts.
          </p>
        </div>

        <button
          onClick={onOpenRecordFee}
          className="px-4 py-2.5 rounded-xl bg-[#003820] text-white text-[13px] font-semibold hover:bg-[#0f5132] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">add_card</span>
          Record Fee Payment
        </button>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#f1f4f9] rounded-xl p-4 border border-[#e0e3e8]/60">
          <span className="text-[11px] uppercase font-semibold text-[#404942]">Total Collected</span>
          <p className="text-[24px] font-bold text-[#003820] mt-1">
            ₹{(totalCollectedAmount / 100000).toFixed(1)}L
          </p>
          <span className="text-[11px] text-[#0f5132] font-medium">+8.4% this quarter</span>
        </div>
        <div className="bg-[#f1f4f9] rounded-xl p-4 border border-[#e0e3e8]/60">
          <span className="text-[11px] uppercase font-semibold text-[#404942]">Pending Dues</span>
          <p className="text-[24px] font-bold text-[#b6152e] mt-1">₹3.40L</p>
          <span className="text-[11px] text-[#707971] font-medium">14 pending installments</span>
        </div>
        <div className="bg-[#f1f4f9] rounded-xl p-4 border border-[#e0e3e8]/60">
          <span className="text-[11px] uppercase font-semibold text-[#404942]">Verified Receipts</span>
          <p className="text-[24px] font-bold text-[#181c20] mt-1">{fees.length} Total</p>
          <span className="text-[11px] text-[#0f5132] font-medium">100% reconciled</span>
        </div>
        <div className="bg-[#f1f4f9] rounded-xl p-4 border border-[#e0e3e8]/60">
          <span className="text-[11px] uppercase font-semibold text-[#404942]">Mode Dominance</span>
          <p className="text-[24px] font-bold text-[#181c20] mt-1">UPI (68%)</p>
          <span className="text-[11px] text-[#707971] font-medium">Instant auto-credit</span>
        </div>
      </div>

      {/* Toolbar Filter */}
      <div className="bg-[#f1f4f9] rounded-2xl p-4 border border-[#e0e3e8]/60 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#707971] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student, course, or receipt #..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:ring-2 focus:ring-[#0f5132]/30 focus:border-[#0f5132]"
          />
        </div>

        {/* Method filter chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['All', 'UPI', 'Bank', 'Credit', 'Cash'].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMethod(m)}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                selectedMethod === m
                  ? 'bg-[#003820] text-white shadow-xs'
                  : 'bg-white border border-[#e0e3e8] text-[#404942] hover:text-[#181c20]'
              }`}
            >
              {m === 'Bank' ? 'Bank Transfer' : m === 'Credit' ? 'Credit Card' : m}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-[#e0e3e8] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="text-[11px] uppercase text-[#707971] tracking-wider bg-[#f1f4f9] border-b border-[#e0e3e8]">
                <th className="py-3.5 px-4 font-semibold">Receipt #</th>
                <th className="py-3.5 px-4 font-semibold">Scholar Name</th>
                <th className="py-3.5 px-4 font-semibold">Course Module</th>
                <th className="py-3.5 px-4 font-semibold">Amount Paid</th>
                <th className="py-3.5 px-4 font-semibold">Transaction Date</th>
                <th className="py-3.5 px-4 font-semibold">Payment Mode</th>
                <th className="py-3.5 px-4 font-semibold text-right">Receipt Action</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-[#181c20] divide-y divide-[#f1f4f9]">
              {filteredFees.map((fee) => (
                <tr
                  key={fee.id}
                  onClick={() => onSelectFee(fee)}
                  className="hover:bg-[#f7f9ff] cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4 font-mono text-[12px] text-[#707971]">
                    {fee.receiptNo}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#181c20] group-hover:text-[#0f5132] flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#003820]/10 text-[#003820] flex items-center justify-center font-bold text-[10px]">
                      {fee.initials}
                    </div>
                    {fee.studentName}
                  </td>
                  <td className="py-3.5 px-4 text-[#404942]">{fee.course}</td>
                  <td className="py-3.5 px-4 font-bold text-[#003820]">
                    ₹{fee.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-[#707971]">{fee.date}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium inline-block ${
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
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectFee(fee);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#f1f4f9] hover:bg-[#e0e3e8] text-[#0f5132] text-[12px] font-semibold transition-colors inline-flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[15px]">receipt_long</span>
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
