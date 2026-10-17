import React, { useState } from 'react';
import { Student } from '../types';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: Student) => void;
}

const PRESET_AVATARS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA1-iRBo9SqFC8A9urr4UnGdaH8OFMrMY3V2h4o-B4Ymw0uZUhosWMxJX8FPpxPkLif2rbCa0zif1B11gnuzeyeSz3W4Ithx108H1bsaox24X3ZDuz5fXQWIaRBX9PSUidWrWY-XngYRGABK8wGL_UTsiYeo4gWAONxb3aboB9r2u-FnA7ui_m8SHPgP2sxaPX3hBUoTb2FK15c6NTEDvnIJ-eggyx2EV01OR38Idl31s8Oqd7Y8Vrj-Q',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA51-G6MPm0B__kcoQOGOIgm0Lkv2gBziNpRt0Zp-JkV4kYxHExy9r7-7KNrvkKh1dyRLG0yKg-5Obx8UxDw9Lg29lLqcQ-FCagXU6J9M3nrWkVuM-8JCyL54njOzmg-xYYEsk9VedlPn0Fw_owBXzyi69WVP1zZ6gGncNPUsdD7k2iozTVsOsp5U0_HcudqgjOAALkLf4_YerPMQeTXOuLKufFt3hqedqZoNF5h_h-fmDJDgrButaMaw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBWlZ21hOu7jzgbnK-5brxzIhZjf6QTceNoihn5AN7bqfh4MqFTiyTh25KDvL0ZSMX1GTLh1rp0pJwFmByoqYV-tF1-dlXIrhSr5mVzNVzSKC9IzC6X82EoQQpxs_Vgod3xqyUcRggKidousrKOecwA_vwfUEqJVs5HddNMEFxFLtrAIHQYKoVoidxqt3cOXuZgZnd9688sBsaRUUDsioT5rj16ieyNQSMSsU4kyme5Px_gL5isRRRoiA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBwAbjmaAnmtp46Mn5-3yCKaoigRKqDGo-Mt8hrdEFPUQ21nx-ptiBHKEpSh8xkLygKG1mTNtm9O6aJE1zurJx64koTGJZshA0ZfGa30BOylTC9E495LLY3oVIPGBOHK-NAVjWImQJf_gP6DGa_O3N4yvMJIGml1K3SXWMIfoBufEDzIFcF-WSL0ZvX88hHpDYayhed8wZ0mz0BO6FiL08xhRWEvKgRpDEGOkZfSJbi5mE9D86OEeOYGA',
];

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onAddStudent,
}) => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('GPAT Elite 2025');
  const [batch, setBatch] = useState('Morning Batch A');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [totalFee, setTotalFee] = useState('42000');
  const [initialPayment, setInitialPayment] = useState('42000');
  const [avatar, setAvatar] = useState(PRESET_AVATARS[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const totalFeeNum = parseInt(totalFee) || 35000;
    const paidFeeNum = parseInt(initialPayment) || 0;
    const feeStatus =
      paidFeeNum >= totalFeeNum
        ? 'Paid'
        : paidFeeNum > 0
        ? 'Partial'
        : 'Pending';

    const newStudent: Student = {
      id: `std-${Date.now()}`,
      name: name.trim(),
      avatar,
      course,
      batch,
      enrolledTime: 'Just now',
      enrolledDate: new Date().toISOString().split('T')[0],
      verified: true,
      phone: phone || '+91 98000 00000',
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      attendanceRate: 100,
      mockPercentile: 95.0,
      feeStatus,
      totalFee: totalFeeNum,
      paidFee: paidFeeNum,
      issuedBooksCount: 0,
      notes: 'Newly enrolled candidate for GPAT / NIPER coaching program.',
    };

    onAddStudent(newStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e0e3e8]">
        {/* Modal Header */}
        <div className="p-6 bg-[#f1f4f9] border-b border-[#e0e3e8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#003820] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">person_add</span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#181c20]">
                Enroll New Pharmacy Scholar
              </h3>
              <p className="text-[12px] text-[#404942]">
                Register candidate into Pharma Sapience batches
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
          {/* Avatar selection */}
          <div>
            <label className="block text-[12px] font-semibold text-[#181c20] mb-2">
              Select Scholar Avatar
            </label>
            <div className="flex items-center gap-3">
              {PRESET_AVATARS.map((imgUrl, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setAvatar(imgUrl)}
                  className={`relative rounded-full p-0.5 transition-all ${
                    avatar === imgUrl ? 'ring-3 ring-[#0f5132]' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt="avatar option"
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  {avatar === imgUrl && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#0f5132] text-white flex items-center justify-center text-[9px]">
                      &check;
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Student Full Name */}
          <div>
            <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
              Full Legal Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ishaan Mukherjee"
              className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[14px] text-[#181c20] outline-none focus:bg-white focus:ring-2 focus:ring-[#0f5132]/30 focus:border-[#0f5132]"
            />
          </div>

          {/* Course & Batch Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
                Course Program *
              </label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none cursor-pointer focus:bg-white"
              >
                <option value="GPAT Elite 2025">GPAT Elite 2025</option>
                <option value="NIPER Masterclass">NIPER Masterclass</option>
                <option value="GPAT Comprehensive 2024">GPAT Comprehensive</option>
                <option value="B.Pharm Sem-VIII">B.Pharm Sem-VIII Booster</option>
                <option value="GPAT Crash Course">GPAT Crash Course</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
                Coaching Batch *
              </label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none cursor-pointer focus:bg-white"
              >
                <option value="Morning Batch A">Morning Batch A (8:00 AM - 11:30 AM)</option>
                <option value="Evening Batch B">Evening Batch B (4:30 PM - 8:00 PM)</option>
                <option value="Weekend Crash">Weekend Crash (Sat & Sun Full-Day)</option>
              </select>
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:bg-white focus:border-[#0f5132]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="candidate@gmail.com"
                className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:bg-white focus:border-[#0f5132]"
              />
            </div>
          </div>

          {/* Fee details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
                Total Annual Fees (₹)
              </label>
              <input
                type="number"
                value={totalFee}
                onChange={(e) => setTotalFee(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
                Initial Installment Paid (₹)
              </label>
              <input
                type="number"
                value={initialPayment}
                onChange={(e) => setInitialPayment(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:bg-white"
              />
            </div>
          </div>

          {/* Form Actions */}
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
              Confirm Admission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
