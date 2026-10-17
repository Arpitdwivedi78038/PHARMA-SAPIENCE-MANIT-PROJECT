/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  INITIAL_STUDENTS,
  INITIAL_FEES,
  INITIAL_BOOKS,
  INITIAL_ISSUED_ENTRIES,
  RANKERS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';
import {
  Student,
  FeeTransaction,
  BookRecord,
  IssuedBookEntry,
  InstituteNotification,
} from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { StudentsView } from './components/StudentsView';
import { FeesView } from './components/FeesView';
import { BooksView } from './components/BooksView';
import { AddStudentModal } from './components/AddStudentModal';
import { RecordFeeModal } from './components/RecordFeeModal';
import { IssueBookModal } from './components/IssueBookModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { ReceiptModal } from './components/ReceiptModal';
import { AnalyticsModal } from './components/AnalyticsModal';
import { RankersModal } from './components/RankersModal';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'students' | 'fees-records' | 'book-records'
  >('dashboard');
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  // Core application data state
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [fees, setFees] = useState<FeeTransaction[]>(INITIAL_FEES);
  const [books, setBooks] = useState<BookRecord[]>(INITIAL_BOOKS);
  const [issuedEntries, setIssuedEntries] = useState<IssuedBookEntry[]>(
    INITIAL_ISSUED_ENTRIES
  );
  const [notifications, setNotifications] = useState<InstituteNotification[]>(
    INITIAL_NOTIFICATIONS
  );

  // Modal visibility states
  const [isAddStudentOpen, setIsAddStudentOpen] = useState<boolean>(false);
  const [isRecordFeeOpen, setIsRecordFeeOpen] = useState<boolean>(false);
  const [isIssueBookOpen, setIsIssueBookOpen] = useState<boolean>(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState<boolean>(false);
  const [isRankersOpen, setIsRankersOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Active item inspection modals
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedFee, setSelectedFee] = useState<FeeTransaction | null>(null);

  // Handlers for adding and updating records
  const handleAddStudent = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);

    // If there is an initial payment recorded, create fee transaction
    if (newStudent.paidFee > 0) {
      const nameParts = newStudent.name.split(' ');
      const initials = nameParts
        .map((p) => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      const feeEntry: FeeTransaction = {
        id: `fee-${Date.now()}`,
        studentId: newStudent.id,
        studentName: newStudent.name,
        initials,
        course: newStudent.course,
        amount: newStudent.paidFee,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        rawDate: new Date().toISOString().split('T')[0],
        paymentMode: 'UPI / GPay',
        receiptNo: `PS-REC-2024-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'Completed',
        remarks: 'Admission enrollment fee payment received.',
      };
      setFees((prev) => [feeEntry, ...prev]);
    }

    // Add alert notification
    const notif: InstituteNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Scholar Admission',
      message: `${newStudent.name} admitted into ${newStudent.course} (${newStudent.batch}).`,
      timestamp: 'Just now',
      type: 'announcement',
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const handleAddFee = (newFee: FeeTransaction) => {
    setFees((prev) => [newFee, ...prev]);

    // Update student's fee paid amount
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === newFee.studentId || s.name === newFee.studentName) {
          const updatedPaid = s.paidFee + newFee.amount;
          const status =
            updatedPaid >= s.totalFee
              ? 'Paid'
              : updatedPaid > 0
              ? 'Partial'
              : 'Pending';
          return {
            ...s,
            paidFee: updatedPaid,
            feeStatus: status,
          };
        }
        return s;
      })
    );

    // Add notification
    const notif: InstituteNotification = {
      id: `notif-${Date.now()}`,
      title: 'Fee Payment Received',
      message: `₹${newFee.amount.toLocaleString(
        'en-IN'
      )} received from ${newFee.studentName} via ${newFee.paymentMode}.`,
      timestamp: 'Just now',
      type: 'fee',
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const handleIssueBook = (newEntry: IssuedBookEntry) => {
    setIssuedEntries((prev) => [newEntry, ...prev]);

    // Update book issued copies
    setBooks((prev) =>
      prev.map((b) =>
        b.id === newEntry.bookId
          ? { ...b, issuedCopies: b.issuedCopies + 1 }
          : b
      )
    );

    // Update student issued count
    setStudents((prev) =>
      prev.map((s) =>
        s.id === newEntry.studentId
          ? { ...s, issuedBooksCount: s.issuedBooksCount + 1 }
          : s
      )
    );

    // Add notification
    const notif: InstituteNotification = {
      id: `notif-${Date.now()}`,
      title: 'Textbook Checked Out',
      message: `${newEntry.bookTitle} issued to ${newEntry.studentName} (Due: ${newEntry.dueDate}).`,
      timestamp: 'Just now',
      type: 'library',
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const handleReturnBook = (entryId: string) => {
    const entry = issuedEntries.find((e) => e.id === entryId);
    if (!entry) return;

    setIssuedEntries((prev) =>
      prev.map((e) => (e.id === entryId ? { ...e, status: 'Returned' } : e))
    );

    setBooks((prev) =>
      prev.map((b) =>
        b.id === entry.bookId
          ? {
              ...b,
              issuedCopies: Math.max(0, b.issuedCopies - 1),
              dueReturnCopies: Math.max(0, b.dueReturnCopies - 1),
            }
          : b
      )
    );
  };

  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] text-[#181c20]">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
        onOpenProfile={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <div className="pl-0 lg:pl-72 transition-all duration-200">
        {/* Sticky Top Header */}
        <Header
          onToggleMobileMenu={() => setIsOpenMobile(!isOpenMobile)}
          students={students}
          fees={fees}
          books={books}
          notifications={notifications}
          onSelectStudent={(s) => setSelectedStudent(s)}
          onSelectFee={(f) => setSelectedFee(f)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onMarkNotificationsRead={handleMarkNotificationsRead}
          onNavigateTab={(tab) => setActiveTab(tab)}
        />

        {/* Dynamic Screen View */}
        <main className="relative pt-20 px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
          {activeTab === 'dashboard' && (
            <DashboardView
              students={students}
              fees={fees}
              books={books}
              rankers={RANKERS}
              onOpenAnalytics={() => setIsAnalyticsOpen(true)}
              onOpenRankers={() => setIsRankersOpen(true)}
              onOpenAddStudent={() => setIsAddStudentOpen(true)}
              onSelectStudent={(s) => setSelectedStudent(s)}
              onSelectFee={(f) => setSelectedFee(f)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'students' && (
            <StudentsView
              students={students}
              onSelectStudent={(s) => setSelectedStudent(s)}
              onOpenAddStudent={() => setIsAddStudentOpen(true)}
            />
          )}

          {activeTab === 'fees-records' && (
            <FeesView
              fees={fees}
              onSelectFee={(f) => setSelectedFee(f)}
              onOpenRecordFee={() => setIsRecordFeeOpen(true)}
            />
          )}

          {activeTab === 'book-records' && (
            <BooksView
              books={books}
              issuedEntries={issuedEntries}
              onOpenIssueBook={() => setIsIssueBookOpen(true)}
              onReturnBook={handleReturnBook}
            />
          )}
        </main>
      </div>

      {/* Interactive Modal Overlays */}
      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onAddStudent={handleAddStudent}
      />

      <RecordFeeModal
        isOpen={isRecordFeeOpen}
        onClose={() => setIsRecordFeeOpen(false)}
        students={students}
        onAddFee={handleAddFee}
      />

      <IssueBookModal
        isOpen={isIssueBookOpen}
        onClose={() => setIsIssueBookOpen(false)}
        books={books}
        students={students}
        onIssueBook={handleIssueBook}
      />

      <StudentProfileModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onOpenRecordFeeForStudent={(s) => {
          setSelectedStudent(null);
          setIsRecordFeeOpen(true);
        }}
      />

      <ReceiptModal
        fee={selectedFee}
        onClose={() => setSelectedFee(null)}
      />

      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      <RankersModal
        isOpen={isRankersOpen}
        onClose={() => setIsRankersOpen(false)}
        rankers={RANKERS}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
