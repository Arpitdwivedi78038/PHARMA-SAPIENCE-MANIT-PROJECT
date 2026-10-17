import React, { useState } from 'react';
import { BookRecord, Student, IssuedBookEntry } from '../types';

interface IssueBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: BookRecord[];
  students: Student[];
  onIssueBook: (entry: IssuedBookEntry) => void;
}

export const IssueBookModal: React.FC<IssueBookModalProps> = ({
  isOpen,
  onClose,
  books,
  students,
  onIssueBook,
}) => {
  const [selectedBookId, setSelectedBookId] = useState<string>(books[0]?.id || '');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');

  const today = new Date();
  const returnDate = new Date();
  returnDate.setDate(today.getDate() + 14);

  const [issueDate, setIssueDate] = useState<string>(
    today.toISOString().split('T')[0]
  );
  const [dueDate, setDueDate] = useState<string>(
    returnDate.toISOString().split('T')[0]
  );

  if (!isOpen) return null;

  const currentBook = books.find((b) => b.id === selectedBookId) || books[0];
  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBook || !currentStudent) return;

    const newEntry: IssuedBookEntry = {
      id: `iss-${Date.now()}`,
      bookId: currentBook.id,
      bookTitle: `${currentBook.title} - ${currentBook.authorEdition}`,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      issueDate,
      dueDate,
      status: 'Active',
    };

    onIssueBook(newEntry);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e0e3e8]">
        {/* Modal Header */}
        <div className="p-6 bg-[#f1f4f9] border-b border-[#e0e3e8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#003820] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">bookmark_add</span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#181c20]">
                Issue Reference Textbook
              </h3>
              <p className="text-[12px] text-[#404942]">
                Institute library circulation checkout
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
          {/* Select Book */}
          <div>
            <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
              Select Textbook Title *
            </label>
            <select
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none cursor-pointer focus:bg-white"
            >
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title} ({b.authorEdition}) - {b.totalCopies - b.issuedCopies} Available
                </option>
              ))}
            </select>
          </div>

          {/* Select Student */}
          <div>
            <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
              Scholar / Borrower *
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

          {/* Issue & Due Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
                Checkout Date
              </label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#181c20] mb-1">
                Return Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f1f4f9] border border-[#e0e3e8] text-[13px] text-[#181c20] outline-none focus:bg-white"
              />
            </div>
          </div>

          {/* Location details */}
          {currentBook && (
            <div className="p-3 bg-[#ebeef3] rounded-xl text-[12px] space-y-1">
              <div className="flex justify-between text-[#404942]">
                <span>Shelf Location:</span>
                <span className="font-semibold text-[#181c20]">{currentBook.rackLocation}</span>
              </div>
              <div className="flex justify-between text-[#404942]">
                <span>Subject Category:</span>
                <span className="font-semibold text-[#0f5132]">{currentBook.category}</span>
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
              Confirm Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
