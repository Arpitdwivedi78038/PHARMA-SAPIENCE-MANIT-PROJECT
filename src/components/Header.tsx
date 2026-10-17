import React, { useState, useRef, useEffect } from 'react';
import { Student, FeeTransaction, BookRecord, InstituteNotification } from '../types';

interface HeaderProps {
  onToggleMobileMenu: () => void;
  students: Student[];
  fees: FeeTransaction[];
  books: BookRecord[];
  notifications: InstituteNotification[];
  onSelectStudent: (student: Student) => void;
  onSelectFee: (fee: FeeTransaction) => void;
  onOpenSettings: () => void;
  onMarkNotificationsRead: () => void;
  onNavigateTab: (tab: 'dashboard' | 'students' | 'fees-records' | 'book-records') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileMenu,
  students,
  fees,
  books,
  notifications,
  onSelectStudent,
  onSelectFee,
  onOpenSettings,
  onMarkNotificationsRead,
  onNavigateTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const notifContainerRef = useRef<HTMLDivElement>(null);

  // Close popups on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowSearchResults(false);
      }
      if (
        notifContainerRef.current &&
        !notifContainerRef.current.contains(e.target as Node)
      ) {
        setShowNotifMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const filteredStudents = trimmedQuery
    ? students
        .filter(
          (s) =>
            s.name.toLowerCase().includes(trimmedQuery) ||
            s.course.toLowerCase().includes(trimmedQuery) ||
            s.batch.toLowerCase().includes(trimmedQuery)
        )
        .slice(0, 3)
    : [];

  const filteredFees = trimmedQuery
    ? fees
        .filter(
          (f) =>
            f.studentName.toLowerCase().includes(trimmedQuery) ||
            f.receiptNo.toLowerCase().includes(trimmedQuery) ||
            f.course.toLowerCase().includes(trimmedQuery)
        )
        .slice(0, 3)
    : [];

  const filteredBooks = trimmedQuery
    ? books
        .filter(
          (b) =>
            b.title.toLowerCase().includes(trimmedQuery) ||
            b.authorEdition.toLowerCase().includes(trimmedQuery) ||
            b.category.toLowerCase().includes(trimmedQuery)
        )
        .slice(0, 3)
    : [];

  const totalResults =
    filteredStudents.length + filteredFees.length + filteredBooks.length;

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#f7f9ff]/90 backdrop-blur-xl border-b border-[#e0e3e8]/70 shadow-[0_1px_8px_rgba(0,0,0,0.03)] z-40 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left: Mobile hamburger + Universal Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-[#404942] hover:bg-[#e5e8ee] transition-colors"
          title="Open Menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <div className="relative w-full max-w-md" ref={searchContainerRef}>
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#ebeef3] hover:bg-[#e5e8ee] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0f5132]/30 focus-within:border-[#0f5132] border border-transparent transition-all">
            <span className="material-symbols-outlined text-[#707971] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search students, fees, or books..."
              className="bg-transparent border-none outline-none text-[14px] text-[#181c20] placeholder:text-[#707971] w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#707971] hover:text-[#181c20] p-0.5"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}
          </div>

          {/* Live Search Results Dropdown */}
          {showSearchResults && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[#e0e3e8] overflow-hidden z-50 animate-in fade-in duration-150">
              <div className="p-2 border-b border-[#f1f4f9] text-[11px] font-semibold text-[#707971] uppercase tracking-wider px-3">
                Quick Search Results
              </div>

              {totalResults === 0 ? (
                <div className="p-5 text-center text-[#707971] text-[13px]">
                  No matching students, fee records, or books found for &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto divide-y divide-[#f1f4f9]">
                  {/* Students section */}
                  {filteredStudents.length > 0 && (
                    <div className="p-2">
                      <div className="text-[10px] uppercase font-bold text-[#0f5132] tracking-wider px-2 py-1">
                        Students ({filteredStudents.length})
                      </div>
                      {filteredStudents.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => {
                            onSelectStudent(s);
                            setShowSearchResults(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f1f4f9] cursor-pointer transition-colors"
                        >
                          <img
                            src={s.avatar}
                            alt={s.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-semibold text-[#181c20] truncate">
                              {s.name}
                            </p>
                            <p className="text-[11px] text-[#707971] truncate">
                              {s.course} &bull; {s.batch}
                            </p>
                          </div>
                          <span className="text-[11px] font-medium text-[#0f5132] bg-[#b0f1c7]/40 px-2 py-0.5 rounded-full">
                            {s.feeStatus}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Fees section */}
                  {filteredFees.length > 0 && (
                    <div className="p-2">
                      <div className="text-[10px] uppercase font-bold text-[#0f5132] tracking-wider px-2 py-1">
                        Fee Transactions ({filteredFees.length})
                      </div>
                      {filteredFees.map((f) => (
                        <div
                          key={f.id}
                          onClick={() => {
                            onSelectFee(f);
                            setShowSearchResults(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-[#f1f4f9] cursor-pointer transition-colors"
                        >
                          <div>
                            <p className="text-[13px] font-semibold text-[#181c20]">
                              {f.studentName}
                            </p>
                            <p className="text-[11px] text-[#707971]">
                              {f.receiptNo} &bull; {f.date}
                            </p>
                          </div>
                          <span className="text-[13px] font-bold text-[#0f5132]">
                            ₹{f.amount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Books section */}
                  {filteredBooks.length > 0 && (
                    <div className="p-2">
                      <div className="text-[10px] uppercase font-bold text-[#0f5132] tracking-wider px-2 py-1">
                        Library Books ({filteredBooks.length})
                      </div>
                      {filteredBooks.map((b) => (
                        <div
                          key={b.id}
                          onClick={() => {
                            onNavigateTab('book-records');
                            setShowSearchResults(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-[#f1f4f9] cursor-pointer transition-colors"
                        >
                          <div className="min-w-0 pr-2">
                            <p className="text-[13px] font-semibold text-[#181c20] truncate">
                              {b.title}
                            </p>
                            <p className="text-[11px] text-[#707971] truncate">
                              {b.authorEdition} &bull; {b.rackLocation}
                            </p>
                          </div>
                          <span className="text-[11px] font-medium text-[#404942] bg-[#ebeef3] px-2 py-0.5 rounded-full whitespace-nowrap">
                            {b.issuedCopies} Issued
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Notification and Settings Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification Bell */}
        <div className="relative" ref={notifContainerRef}>
          <button
            onClick={() => {
              setShowNotifMenu(!showNotifMenu);
              if (!showNotifMenu) {
                onMarkNotificationsRead();
              }
            }}
            className="w-10 h-10 rounded-full hover:bg-[#ebeef3] flex items-center justify-center text-[#404942] transition-colors relative"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotifCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#b6152e] ring-2 ring-white" />
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#e0e3e8] overflow-hidden z-50">
              <div className="px-4 py-3 bg-[#f1f4f9] border-b border-[#e0e3e8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[14px] text-[#181c20]">
                    Institute Notifications
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0f5132]/10 text-[#0f5132]">
                    Recent
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifMenu(false)}
                  className="text-xs text-[#707971] hover:text-[#181c20]"
                >
                  Close
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#f1f4f9]">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3.5 hover:bg-[#f7f9ff] transition-colors flex gap-3 items-start"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        n.type === 'exam'
                          ? 'bg-[#b0f1c7]/40 text-[#0f5132]'
                          : n.type === 'fee'
                          ? 'bg-amber-100 text-amber-800'
                          : n.type === 'library'
                          ? 'bg-rose-100 text-[#b6152e]'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {n.type === 'exam'
                          ? 'quiz'
                          : n.type === 'fee'
                          ? 'payments'
                          : n.type === 'library'
                          ? 'menu_book'
                          : 'campaign'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#181c20] leading-tight">
                        {n.title}
                      </p>
                      <p className="text-[12px] text-[#404942] mt-0.5 leading-snug">
                        {n.message}
                      </p>
                      <span className="text-[10px] text-[#707971] mt-1 inline-block">
                        {n.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="w-10 h-10 rounded-full hover:bg-[#ebeef3] flex items-center justify-center text-[#404942] transition-colors"
          title="Institute Settings"
        >
          <span className="material-symbols-outlined text-[22px]">settings</span>
        </button>
      </div>
    </header>
  );
};
