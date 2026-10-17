import React, { useState } from 'react';
import { BookRecord, IssuedBookEntry } from '../types';

interface BooksViewProps {
  books: BookRecord[];
  issuedEntries: IssuedBookEntry[];
  onOpenIssueBook: () => void;
  onReturnBook: (entryId: string) => void;
}

export const BooksView: React.FC<BooksViewProps> = ({
  books,
  issuedEntries,
  onOpenIssueBook,
  onReturnBook,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'issued'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Pharmacology',
    'Medicinal Chemistry',
    'Pharmaceutics',
    'Pharmacognosy',
  ];

  const filteredBooks = books.filter((b) => {
    const matchesCategory =
      selectedCategory === 'All' || b.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      b.title.toLowerCase().includes(query) ||
      b.authorEdition.toLowerCase().includes(query) ||
      b.isbn.includes(query) ||
      b.rackLocation.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const filteredIssued = issuedEntries.filter((iss) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      !query ||
      iss.studentName.toLowerCase().includes(query) ||
      iss.bookTitle.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col w-full pb-16 animate-in fade-in duration-200">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f5132] bg-[#b0f1c7]/40 px-2.5 py-0.5 rounded-full">
              Institute Library &amp; Reference Catalog
            </span>
          </div>
          <h1 className="text-[28px] font-bold text-[#181c20] tracking-tight">
            Book Records &amp; Circulation
          </h1>
          <p className="text-[14px] text-[#404942]">
            Pharmaceutical standard reference textbooks, GPAT guidebooks, and scholar checkouts.
          </p>
        </div>

        <button
          onClick={onOpenIssueBook}
          className="px-4 py-2.5 rounded-xl bg-[#003820] text-white text-[13px] font-semibold hover:bg-[#0f5132] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
          Issue Textbook
        </button>
      </div>

      {/* Circulation Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#f1f4f9] rounded-xl p-4 border border-[#e0e3e8]/60">
          <span className="text-[11px] uppercase font-semibold text-[#404942]">Books Cataloged</span>
          <p className="text-[24px] font-bold text-[#181c20] mt-1">2,400</p>
          <span className="text-[11px] text-[#0f5132] font-medium">350+ reference titles</span>
        </div>
        <div className="bg-[#f1f4f9] rounded-xl p-4 border border-[#e0e3e8]/60">
          <span className="text-[11px] uppercase font-semibold text-[#404942]">Currently Issued</span>
          <p className="text-[24px] font-bold text-[#003820] mt-1">1,240</p>
          <span className="text-[11px] text-[#0f5132] font-medium">52% circulation load</span>
        </div>
        <div className="bg-[#f1f4f9] rounded-xl p-4 border border-[#e0e3e8]/60">
          <span className="text-[11px] uppercase font-semibold text-[#404942]">Due For Return</span>
          <p className="text-[24px] font-bold text-[#b6152e] mt-1">5 Copies</p>
          <span className="text-[11px] text-[#b6152e] font-medium">Aulton&apos;s Pharmaceutics</span>
        </div>
        <div className="bg-[#f1f4f9] rounded-xl p-4 border border-[#e0e3e8]/60">
          <span className="text-[11px] uppercase font-semibold text-[#404942]">On-Time Return Rate</span>
          <p className="text-[24px] font-bold text-[#181c20] mt-1">94.0%</p>
          <span className="text-[11px] text-[#0f5132] font-medium">14-day standard window</span>
        </div>
      </div>

      {/* View Switcher Tabs & Search Toolbar */}
      <div className="bg-[#f1f4f9] rounded-2xl p-4 border border-[#e0e3e8]/60 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Tab toggle */}
        <div className="flex items-center gap-1 bg-[#ebeef3] p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'catalog'
                ? 'bg-white text-[#0f5132] shadow-xs'
                : 'text-[#404942] hover:text-[#181c20]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">library_books</span>
            Reference Catalog ({books.length})
          </button>
          <button
            onClick={() => setActiveTab('issued')}
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'issued'
                ? 'bg-white text-[#0f5132] shadow-xs'
                : 'text-[#404942] hover:text-[#181c20]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
            Active Borrow Logs ({issuedEntries.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#707971] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === 'catalog'
                ? 'Search book title, author, or rack...'
                : 'Search scholar or book name...'
            }
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:ring-2 focus:ring-[#0f5132]/30 focus:border-[#0f5132]"
          />
        </div>
      </div>

      {/* Catalog View */}
      {activeTab === 'catalog' ? (
        <div>
          {/* Category tabs */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-[12px] font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === c
                    ? 'bg-[#003820] text-white shadow-xs'
                    : 'bg-white border border-[#e0e3e8] text-[#404942] hover:text-[#181c20]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBooks.map((book) => {
              const availableCopies = book.totalCopies - book.issuedCopies;
              return (
                <div
                  key={book.id}
                  className="bg-white rounded-2xl p-5 border border-[#e0e3e8]/70 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-[#0f5132] bg-[#b0f1c7]/40 px-2 py-0.5 rounded-md">
                        {book.category}
                      </span>
                      <span className="text-[11px] font-mono text-[#707971]">
                        {book.isbn}
                      </span>
                    </div>

                    <h3 className="text-[15px] font-bold text-[#181c20] leading-snug mb-1">
                      {book.title}
                    </h3>
                    <p className="text-[12px] text-[#404942] mb-3">
                      {book.authorEdition}
                    </p>

                    <div className="p-3 bg-[#f1f4f9] rounded-xl text-[12px] space-y-1.5 mb-4">
                      <div className="flex justify-between">
                        <span className="text-[#707971]">Shelf Location:</span>
                        <span className="font-semibold text-[#181c20]">
                          {book.rackLocation}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#707971]">Total Holdings:</span>
                        <span className="font-medium text-[#181c20]">
                          {book.totalCopies} copies
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#707971]">Currently Issued:</span>
                        <span className="font-bold text-[#0f5132]">
                          {book.issuedCopies} copies
                        </span>
                      </div>
                      {book.dueReturnCopies > 0 && (
                        <div className="flex justify-between text-[#b6152e] font-semibold">
                          <span>Overdue Status:</span>
                          <span>{book.dueReturnCopies} Pending Return</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#f1f4f9]">
                    <span className="text-[12px] text-[#404942]">
                      <strong className="text-[#181c20]">{availableCopies}</strong> available
                    </span>
                    <button
                      onClick={onOpenIssueBook}
                      className="px-3 py-1.5 rounded-lg bg-[#003820] hover:bg-[#0f5132] text-white text-[12px] font-semibold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                      Issue Copy
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Active Issued Borrow Logs */
        <div className="bg-white rounded-2xl border border-[#e0e3e8] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="text-[11px] uppercase text-[#707971] tracking-wider bg-[#f1f4f9] border-b border-[#e0e3e8]">
                  <th className="py-3.5 px-4 font-semibold">Book Title</th>
                  <th className="py-3.5 px-4 font-semibold">Issued To Scholar</th>
                  <th className="py-3.5 px-4 font-semibold">Issue Date</th>
                  <th className="py-3.5 px-4 font-semibold">Return Deadline</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-[#181c20] divide-y divide-[#f1f4f9]">
                {filteredIssued.map((entry) => (
                  <tr key={entry.id} className="hover:bg-[#f7f9ff] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#181c20]">
                      {entry.bookTitle}
                    </td>
                    <td className="py-3.5 px-4 text-[#404942] font-medium">
                      {entry.studentName}
                    </td>
                    <td className="py-3.5 px-4 text-[#707971]">{entry.issueDate}</td>
                    <td className="py-3.5 px-4 text-[#707971]">{entry.dueDate}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold inline-block ${
                          entry.status === 'Overdue'
                            ? 'bg-[#b6152e]/10 text-[#b6152e]'
                            : entry.status === 'Due Soon'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-[#003820]/10 text-[#003820]'
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onReturnBook(entry.id)}
                        className="px-3 py-1 rounded-lg bg-[#ebeef3] hover:bg-[#b0f1c7]/50 text-[#0f5132] text-[12px] font-semibold transition-colors cursor-pointer"
                      >
                        Mark Returned
                      </button>
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
