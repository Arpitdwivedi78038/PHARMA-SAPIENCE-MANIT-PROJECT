import React from 'react';
import { FeeTransaction } from '../types';
import { LOGO_URL } from '../data/mockData';

interface ReceiptModalProps {
  fee: FeeTransaction | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ fee, onClose }) => {
  if (!fee) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#e0e3e8]">
        {/* Modal Top Actions */}
        <div className="p-4 bg-[#f1f4f9] border-b border-[#e0e3e8] flex items-center justify-between">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#0f5132]">
            Official Fee Receipt Voucher
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#e0e3e8] hover:bg-[#ebeef3] text-[#181c20] text-[12px] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              Print Receipt
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#707971] hover:text-[#181c20] hover:bg-[#e0e3e8]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper */}
        <div className="p-8 space-y-6" id="printable-receipt">
          {/* Institute Header */}
          <div className="flex items-center justify-between border-b-2 border-[#003820] pb-5">
            <div className="flex items-center gap-3.5">
              <img
                src={LOGO_URL}
                alt="Pharma Sapience"
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#003820]"
              />
              <div>
                <h2 className="text-[20px] font-bold text-[#003820] leading-tight">
                  Pharma Sapience
                </h2>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#404942]">
                  Premier GPAT &amp; NIPER Coaching Institute
                </p>
                <p className="text-[10px] text-[#707971]">
                  Reg: PS-EDU-MH-2018/9842 &bull; Centre for Advanced Pharmacy Studies
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="px-2.5 py-1 rounded-full bg-[#003820]/10 text-[#003820] text-[11px] font-bold uppercase">
                PAID &bull; RECEIPT
              </span>
            </div>
          </div>

          {/* Receipt Meta */}
          <div className="grid grid-cols-2 gap-4 text-[13px] bg-[#f1f4f9] p-4 rounded-xl border border-[#e0e3e8]">
            <div>
              <span className="text-[11px] text-[#707971] block">Receipt Number:</span>
              <span className="font-mono font-bold text-[#181c20]">{fee.receiptNo}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#707971] block">Transaction Date:</span>
              <span className="font-semibold text-[#181c20]">{fee.date}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#707971] block">Payment Channel:</span>
              <span className="font-semibold text-[#003820]">{fee.paymentMode}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#707971] block">Accounting Status:</span>
              <span className="font-semibold text-[#0f5132] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                Verified &amp; Reconciled
              </span>
            </div>
          </div>

          {/* Scholar Particulars */}
          <div className="space-y-3 text-[13px]">
            <div className="border-b border-[#f1f4f9] pb-2 flex justify-between">
              <span className="text-[#707971]">Received From Scholar:</span>
              <span className="font-bold text-[#181c20]">{fee.studentName}</span>
            </div>
            <div className="border-b border-[#f1f4f9] pb-2 flex justify-between">
              <span className="text-[#707971]">Coaching Course Module:</span>
              <span className="font-semibold text-[#181c20]">{fee.course}</span>
            </div>
            {fee.remarks && (
              <div className="border-b border-[#f1f4f9] pb-2 flex justify-between">
                <span className="text-[#707971]">Particulars / Reference:</span>
                <span className="font-medium text-[#404942]">{fee.remarks}</span>
              </div>
            )}
          </div>

          {/* Amount Box */}
          <div className="bg-[#0f5132] text-white p-5 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#84c39b] font-bold block">
                Total Amount Received
              </span>
              <span className="text-[12px] text-white/80">
                INR (Indian Rupees)
              </span>
            </div>
            <span className="text-[28px] font-bold">
              ₹{fee.amount.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Signatures & Watermark */}
          <div className="pt-4 flex items-center justify-between text-[11px] text-[#707971] border-t border-[#e0e3e8]">
            <div>
              <p className="font-semibold text-[#181c20]">Dr. R. Sharma</p>
              <p>Administrator &bull; Pharma Sapience</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-[10px] text-[#707971] block">
                System Generated Digital Stamp
              </span>
              <span className="text-[#0f5132] font-semibold">Authorized Signatory</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Close */}
        <div className="p-4 bg-[#f1f4f9] border-t border-[#e0e3e8] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#003820] text-white text-[13px] font-semibold hover:bg-[#0f5132] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
