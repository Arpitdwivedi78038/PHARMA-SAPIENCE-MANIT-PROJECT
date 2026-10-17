export interface Student {
  id: string;
  name: string;
  avatar: string;
  course: string;
  batch: string;
  enrolledTime: string;
  enrolledDate: string;
  verified: boolean;
  phone: string;
  email: string;
  attendanceRate: number; // e.g. 96%
  mockPercentile: number; // e.g. 98.4
  feeStatus: 'Paid' | 'Partial' | 'Pending';
  totalFee: number;
  paidFee: number;
  issuedBooksCount: number;
  notes?: string;
}

export interface FeeTransaction {
  id: string;
  studentId: string;
  studentName: string;
  initials: string;
  course: string;
  amount: number;
  date: string;
  rawDate: string;
  paymentMode: 'UPI / GPay' | 'Bank Transfer' | 'Credit Card' | 'UPI / PhonePe' | 'Cash';
  receiptNo: string;
  status: 'Completed' | 'Pending' | 'Failed';
  remarks?: string;
}

export interface BookRecord {
  id: string;
  title: string;
  authorEdition: string;
  category: 'Pharmacology' | 'Medicinal Chemistry' | 'Pharmaceutics' | 'Pharmacognosy' | 'Clinical Pharmacy';
  totalCopies: number;
  issuedCopies: number;
  dueReturnCopies: number;
  isbn: string;
  rackLocation: string;
}

export interface IssuedBookEntry {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  issueDate: string;
  dueDate: string;
  status: 'Active' | 'Due Soon' | 'Overdue' | 'Returned';
}

export interface Ranker {
  id: string;
  name: string;
  avatar: string;
  rank: string; // e.g. "AIR 12 (NIPER Mohali)"
  percentile: string; // e.g. "99.98 %ile"
  score: number;
  exam: 'NIPER JEE' | 'GPAT';
  year: number;
  college: string;
  quote?: string;
}

export interface InstituteNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'exam' | 'fee' | 'library' | 'announcement';
  read: boolean;
}
