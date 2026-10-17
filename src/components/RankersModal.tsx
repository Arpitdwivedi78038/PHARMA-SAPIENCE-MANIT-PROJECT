import React from 'react';
import { Ranker } from '../types';

interface RankersModalProps {
  isOpen: boolean;
  onClose: () => void;
  rankers: Ranker[];
}

export const RankersModal: React.FC<RankersModalProps> = ({
  isOpen,
  onClose,
  rankers,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#e0e3e8]">
        {/* Modal Header */}
        <div className="p-6 bg-[#003820] text-white flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#b0f1c7]">
              <span className="material-symbols-outlined text-[22px]">military_tech</span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold">
                Hall of Fame &bull; All-India Rankers
              </h3>
              <p className="text-[12px] text-[#b0f1c7]">
                Top 50 National Pharmacy Selections &bull; Pharma Sapience Alumni
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

        {/* Rankers List */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rankers.map((r) => (
              <div
                key={r.id}
                className="bg-[#f1f4f9] rounded-2xl p-5 border border-[#e0e3e8] flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-[#0f5132]"
                    />
                    <div>
                      <h4 className="text-[16px] font-bold text-[#181c20]">{r.name}</h4>
                      <span className="text-[12px] font-bold text-[#0f5132] block">
                        {r.rank}
                      </span>
                      <span className="text-[11px] font-bold text-[#b6152e]">
                        {r.percentile} ({r.exam} {r.year})
                      </span>
                    </div>
                  </div>

                  <p className="text-[12px] font-semibold text-[#181c20] bg-white p-2.5 rounded-xl border border-[#e0e3e8]">
                    {r.college}
                  </p>

                  {r.quote && (
                    <p className="text-[12px] text-[#404942] italic mt-2.5 leading-relaxed">
                      &ldquo;{r.quote}&rdquo;
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-[#e0e3e8] flex items-center justify-between text-[11px]">
                  <span className="text-[#707971]">Grand Mock Score:</span>
                  <span className="font-bold text-[#003820]">{r.score} / 500</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#003820] text-white text-[13px] font-semibold hover:bg-[#0f5132] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
