import { Student, FeeTransaction, BookRecord, IssuedBookEntry, Ranker, InstituteNotification } from '../types';

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1XbzR-p3QYmiExT2RBkRV1vMoeYs01oM_uzaIxpi-1XDnzLntIf2hyIEL4uWodgFwDbHZrFrL0EuWinyBS_QkqfVKJnbuyO5jCsFWxeSTFJ_0ZtgeVdsSJmZDDyt_1uwHAMvFk8bw-ysG1usuzXORNPsMR77Oez8LaJgpXxW9RXfp-2nI9U2_-3dF3tAngjdqu3YFRtJ46BlNui0m5SFowF_43b7mvw62iGJzL0voXeGGFOKBYVGPpyQuriJaHxut-7BjB2yrj-dOA';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    name: 'Siddharth Rao',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1-iRBo9SqFC8A9urr4UnGdaH8OFMrMY3V2h4o-B4Ymw0uZUhosWMxJX8FPpxPkLif2rbCa0zif1B11gnuzeyeSz3W4Ithx108H1bsaox24X3ZDuz5fXQWIaRBX9PSUidWrWY-XngYRGABK8wGL_UTsiYeo4gWAONxb3aboB9r2u-FnA7ui_m8SHPgP2sxaPX3hBUoTb2FK15c6NTEDvnIJ-eggyx2EV01OR38Idl31s8Oqd7Y8Vrj-Q',
    course: 'GPAT Elite 2025',
    batch: 'Morning Batch A',
    enrolledTime: 'Enrolled 2 hrs ago',
    enrolledDate: '2024-10-24',
    verified: true,
    phone: '+91 98451 22301',
    email: 'siddharth.rao@example.com',
    attendanceRate: 98,
    mockPercentile: 96.8,
    feeStatus: 'Paid',
    totalFee: 42000,
    paidFee: 42000,
    issuedBooksCount: 2,
    notes: 'Excels in Organic & Medicinal Chemistry syntheses questions.'
  },
  {
    id: 'std-2',
    name: 'Kavya Iyer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA51-G6MPm0B__kcoQOGOIgm0Lkv2gBziNpRt0Zp-JkV4kYxHExy9r7-7KNrvkKh1dyRLG0yKg-5Obx8UxDw9Lg29lLqcQ-FCagXU6J9M3nrWkVuM-8JCyL54njOzmg-xYYEsk9VedlPn0Fw_owBXzyi69WVP1zZ6gGncNPUsdD7k2iozTVsOsp5U0_HcudqgjOAALkLf4_YerPMQeTXOuLKufFt3hqedqZoNF5h_h-fmDJDgrButaMaw',
    course: 'NIPER Masterclass',
    batch: 'Evening Batch B',
    enrolledTime: 'Enrolled yesterday',
    enrolledDate: '2024-10-23',
    verified: true,
    phone: '+91 97110 54920',
    email: 'kavya.iyer@example.com',
    attendanceRate: 95,
    mockPercentile: 98.2,
    feeStatus: 'Paid',
    totalFee: 48000,
    paidFee: 48000,
    issuedBooksCount: 1,
    notes: 'Aiming for MS (Pharm) in Pharmacology at NIPER Mohali.'
  },
  {
    id: 'std-3',
    name: 'Tanmay Kadam',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWlZ21hOu7jzgbnK-5brxzIhZjf6QTceNoihn5AN7bqfh4MqFTiyTh25KDvL0ZSMX1GTLh1rp0pJwFmByoqYV-tF1-dlXIrhSr5mVzNVzSKC9IzC6X82EoQQpxs_Vgod3xqyUcRggKidousrKOecwA_vwfUEqJVs5HddNMEFxFLtrAIHQYKoVoidxqt3cOXuZgZnd9688sBsaRUUDsioT5rj16ieyNQSMSsU4kyme5Px_gL5isRRRoiA',
    course: 'B.Pharm Sem-VIII',
    batch: 'Weekend Crash',
    enrolledTime: 'Enrolled 2 days ago',
    enrolledDate: '2024-10-22',
    verified: true,
    phone: '+91 91234 88721',
    email: 'tanmay.kadam@example.com',
    attendanceRate: 92,
    mockPercentile: 93.4,
    feeStatus: 'Partial',
    totalFee: 25000,
    paidFee: 15000,
    issuedBooksCount: 2,
    notes: 'Working on biopharmaceutics and pharmacokinetics problem sets.'
  },
  {
    id: 'std-4',
    name: 'Divya Nambiar',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwAbjmaAnmtp46Mn5-3yCKaoigRKqDGo-Mt8hrdEFPUQ21nx-ptiBHKEpSh8xkLygKG1mTNtm9O6aJE1zurJx64koTGJZshA0ZfGa30BOylTC9E495LLY3oVIPGBOHK-NAVjWImQJf_gP6DGa_O3N4yvMJIGml1K3SXWMIfoBufEDzIFcF-WSL0ZvX88hHpDYayhed8wZ0mz0BO6FiL08xhRWEvKgRpDEGOkZfSJbi5mE9D86OEeOYGA',
    course: 'GPAT Comprehensive',
    batch: 'Morning Batch A',
    enrolledTime: 'Enrolled 3 days ago',
    enrolledDate: '2024-10-21',
    verified: true,
    phone: '+91 94451 90812',
    email: 'divya.nambiar@example.com',
    attendanceRate: 99,
    mockPercentile: 97.9,
    feeStatus: 'Paid',
    totalFee: 35000,
    paidFee: 35000,
    issuedBooksCount: 3,
    notes: 'Consistently ranks in top 5% in weekly GPAT sectionals.'
  },
  {
    id: 'std-5',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    course: 'GPAT Comprehensive 2024',
    batch: 'Morning Batch A',
    enrolledTime: 'Enrolled 1 week ago',
    enrolledDate: '2024-10-18',
    verified: true,
    phone: '+91 98200 44521',
    email: 'priya.sharma@example.com',
    attendanceRate: 97,
    mockPercentile: 98.7,
    feeStatus: 'Paid',
    totalFee: 35000,
    paidFee: 35000,
    issuedBooksCount: 1,
    notes: 'Strong in Pharmacognosy morphological identification.'
  },
  {
    id: 'std-6',
    name: 'Aditya Mehta',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    course: 'NIPER Advanced Track',
    batch: 'Evening Batch B',
    enrolledTime: 'Enrolled 2 weeks ago',
    enrolledDate: '2024-10-10',
    verified: true,
    phone: '+91 99302 11099',
    email: 'aditya.mehta@example.com',
    attendanceRate: 94,
    mockPercentile: 99.1,
    feeStatus: 'Paid',
    totalFee: 45000,
    paidFee: 45000,
    issuedBooksCount: 2,
    notes: 'Focus on Pharmaceutical Biotechnology and Clinical Studies.'
  },
  {
    id: 'std-7',
    name: 'Neha Kulkarni',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    course: 'B.Pharm Sem-VI Booster',
    batch: 'Weekend Crash',
    enrolledTime: 'Enrolled 2 weeks ago',
    enrolledDate: '2024-10-08',
    verified: true,
    phone: '+91 98211 76540',
    email: 'neha.kulkarni@example.com',
    attendanceRate: 91,
    mockPercentile: 92.5,
    feeStatus: 'Paid',
    totalFee: 18500,
    paidFee: 18500,
    issuedBooksCount: 1,
    notes: 'Preparing university exams alongside GPAT prep.'
  },
  {
    id: 'std-8',
    name: 'Rohan Joshi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    course: 'GPAT Crash Course',
    batch: 'Evening Batch B',
    enrolledTime: 'Enrolled 3 weeks ago',
    enrolledDate: '2024-10-01',
    verified: true,
    phone: '+91 97654 32190',
    email: 'rohan.joshi@example.com',
    attendanceRate: 93,
    mockPercentile: 94.2,
    feeStatus: 'Paid',
    totalFee: 22000,
    paidFee: 22000,
    issuedBooksCount: 1,
    notes: 'Fast-track mock series participant.'
  }
];

export const INITIAL_FEES: FeeTransaction[] = [
  {
    id: 'fee-1',
    studentId: 'std-5',
    studentName: 'Priya Sharma',
    initials: 'PS',
    course: 'GPAT Comprehensive 2024',
    amount: 35000,
    date: 'Oct 24, 2024',
    rawDate: '2024-10-24',
    paymentMode: 'UPI / GPay',
    receiptNo: 'PS-REC-2024-1089',
    status: 'Completed',
    remarks: 'Full annual tuition and mock test access fee paid.'
  },
  {
    id: 'fee-2',
    studentId: 'std-6',
    studentName: 'Aditya Mehta',
    initials: 'AM',
    course: 'NIPER Advanced Track',
    amount: 45000,
    date: 'Oct 23, 2024',
    rawDate: '2024-10-23',
    paymentMode: 'Bank Transfer',
    receiptNo: 'PS-REC-2024-1088',
    status: 'Completed',
    remarks: 'NEFT transfer Ref: HDFC9928174'
  },
  {
    id: 'fee-3',
    studentId: 'std-7',
    studentName: 'Neha Kulkarni',
    initials: 'NK',
    course: 'B.Pharm Sem-VI Booster',
    amount: 18500,
    date: 'Oct 22, 2024',
    rawDate: '2024-10-22',
    paymentMode: 'Credit Card',
    receiptNo: 'PS-REC-2024-1087',
    status: 'Completed',
    remarks: 'POS Swipe Authorization #481029'
  },
  {
    id: 'fee-4',
    studentId: 'std-8',
    studentName: 'Rohan Joshi',
    initials: 'RJ',
    course: 'GPAT Crash Course',
    amount: 22000,
    date: 'Oct 21, 2024',
    rawDate: '2024-10-21',
    paymentMode: 'UPI / PhonePe',
    receiptNo: 'PS-REC-2024-1086',
    status: 'Completed',
    remarks: 'UPI Ref: 429583719028'
  },
  {
    id: 'fee-5',
    studentId: 'std-1',
    studentName: 'Siddharth Rao',
    initials: 'SR',
    course: 'GPAT Elite 2025',
    amount: 42000,
    date: 'Oct 20, 2024',
    rawDate: '2024-10-20',
    paymentMode: 'UPI / GPay',
    receiptNo: 'PS-REC-2024-1085',
    status: 'Completed',
    remarks: 'Batch A Registration fee + 2025 Study Material'
  },
  {
    id: 'fee-6',
    studentId: 'std-2',
    studentName: 'Kavya Iyer',
    initials: 'KI',
    course: 'NIPER Masterclass',
    amount: 48000,
    date: 'Oct 19, 2024',
    rawDate: '2024-10-19',
    paymentMode: 'Bank Transfer',
    receiptNo: 'PS-REC-2024-1084',
    status: 'Completed',
    remarks: 'IMPS Ref: SBIN002938104'
  },
  {
    id: 'fee-7',
    studentId: 'std-3',
    studentName: 'Tanmay Kadam',
    initials: 'TK',
    course: 'B.Pharm Sem-VIII',
    amount: 15000,
    date: 'Oct 18, 2024',
    rawDate: '2024-10-18',
    paymentMode: 'Cash',
    receiptNo: 'PS-REC-2024-1083',
    status: 'Completed',
    remarks: 'First installment paid at institute reception.'
  }
];

export const INITIAL_BOOKS: BookRecord[] = [
  {
    id: 'bk-1',
    title: 'Pharmacology & Toxicology',
    authorEdition: 'Rang & Dale (9th Edition)',
    category: 'Pharmacology',
    totalCopies: 65,
    issuedCopies: 42,
    dueReturnCopies: 0,
    isbn: '978-0702074486',
    rackLocation: 'Section P-02 / Shelf 3'
  },
  {
    id: 'bk-2',
    title: 'Medicinal Chemistry Compendium',
    authorEdition: "Foye's Principles (8th Ed)",
    category: 'Medicinal Chemistry',
    totalCopies: 50,
    issuedCopies: 38,
    dueReturnCopies: 0,
    isbn: '978-1496385024',
    rackLocation: 'Section MC-04 / Shelf 1'
  },
  {
    id: 'bk-3',
    title: 'Pharmaceutics & Drug Delivery',
    authorEdition: "Aulton's Pharmaceutics (6th Ed)",
    category: 'Pharmaceutics',
    totalCopies: 40,
    issuedCopies: 28,
    dueReturnCopies: 5,
    isbn: '978-0702081545',
    rackLocation: 'Section PH-01 / Shelf 2'
  },
  {
    id: 'bk-4',
    title: 'Trease & Evans Pharmacognosy',
    authorEdition: 'William Charles Evans (16th Ed)',
    category: 'Pharmacognosy',
    totalCopies: 35,
    issuedCopies: 22,
    dueReturnCopies: 1,
    isbn: '978-0702029332',
    rackLocation: 'Section PG-03 / Shelf 4'
  },
  {
    id: 'bk-5',
    title: 'Biopharmaceutics & Pharmacokinetics',
    authorEdition: 'Leon Shargel & Andrew Yu (7th Ed)',
    category: 'Pharmaceutics',
    totalCopies: 45,
    issuedCopies: 31,
    dueReturnCopies: 2,
    isbn: '978-0071830157',
    rackLocation: 'Section BP-02 / Shelf 1'
  },
  {
    id: 'bk-6',
    title: 'Goodman & Gilman Pharmacological Basis of Therapeutics',
    authorEdition: 'Brunton & Hilal-Dandan (14th Ed)',
    category: 'Pharmacology',
    totalCopies: 30,
    issuedCopies: 26,
    dueReturnCopies: 0,
    isbn: '978-1264258079',
    rackLocation: 'Reference Desk / Reserve'
  }
];

export const INITIAL_ISSUED_ENTRIES: IssuedBookEntry[] = [
  {
    id: 'iss-1',
    bookId: 'bk-3',
    bookTitle: "Pharmaceutics & Drug Delivery - Aulton's",
    studentId: 'std-3',
    studentName: 'Tanmay Kadam',
    issueDate: '2024-10-05',
    dueDate: '2024-10-19',
    status: 'Overdue'
  },
  {
    id: 'iss-2',
    bookId: 'bk-3',
    bookTitle: "Pharmaceutics & Drug Delivery - Aulton's",
    studentId: 'std-4',
    studentName: 'Divya Nambiar',
    issueDate: '2024-10-12',
    dueDate: '2024-10-26',
    status: 'Due Soon'
  },
  {
    id: 'iss-3',
    bookId: 'bk-1',
    bookTitle: 'Pharmacology & Toxicology - Rang & Dale',
    studentId: 'std-1',
    studentName: 'Siddharth Rao',
    issueDate: '2024-10-18',
    dueDate: '2024-11-01',
    status: 'Active'
  },
  {
    id: 'iss-4',
    bookId: 'bk-2',
    bookTitle: "Medicinal Chemistry Compendium - Foye's",
    studentId: 'std-2',
    studentName: 'Kavya Iyer',
    issueDate: '2024-10-15',
    dueDate: '2024-10-29',
    status: 'Active'
  }
];

export const RANKERS: Ranker[] = [
  {
    id: 'rnk-1',
    name: 'Ananya Verma',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuu84h8dP13sRDqSb2EirJn-lOnpBfTDmvv5UIkC2C7CJTTdz0hxMF9Db-qqfFgY59hPAVJHnoLZg1FzNKFciCz4qNKAjtLatCG2vJHspkAOrNiN4_JKcM-OjjO7An9_J6PrsR2V3oxudvax7JnHMCSWV6e_-NyoGiqKYBwdf3hTOCSAqWuFC8Bs5uqcYCkwJag8b_T424Lns0E_ctu1jTzcN3VAWuzGyzDfF5bwnf2ZQ6wCcYYzLOGg',
    rank: 'AIR 12 (NIPER Mohali)',
    percentile: '99.98 %ile',
    score: 418,
    exam: 'NIPER JEE',
    year: 2024,
    college: 'NIPER Mohali - M.S. (Pharm) Pharmacology & Toxicology',
    quote: 'The weekly grand mocks and Dr. Sharma’s pharmacology drills were the game changers for my AIR 12.'
  },
  {
    id: 'rnk-2',
    name: 'Rahul Deshmukh',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC155BpG_TWyaO0ja7HBo7udYxV9s8pvXJewy1IqBuVvqMsxYZtb4SGDeKMs7q3OftqQDsUQbMq0aVVy0PoI4pKvCUfdoHjlv5av1wGs_HObe7oKffEMWQ4Tat1ttQHcQ-iv7nBnL3rEspkAdmJUiCtENXciliJ6INu04bCv29B0p_eHOPRKi3JEpLQQ8iRTs1ey5DTxZcOnPnisWw7lFGx7yI9wv2uFcN_vCBd1NmLNQQfqA8aNtVqUA',
    rank: 'AIR 27 (NIPER Hyderabad)',
    percentile: '99.91 %ile',
    score: 405,
    exam: 'NIPER JEE',
    year: 2024,
    college: 'NIPER Hyderabad - M.S. (Pharm) Medicinal Chemistry',
    quote: 'The faculty’s continuous mentoring and detailed performance review helped me overcome my weak areas.'
  },
  {
    id: 'rnk-3',
    name: 'Meera Namboodiri',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rank: 'AIR 34 (GPAT National)',
    percentile: '99.85 %ile',
    score: 396,
    exam: 'GPAT',
    year: 2024,
    college: 'ICT Mumbai - M.Pharm Bioprocess Tech',
    quote: 'Pharma Sapience test series mirrors the actual GPAT examination interface and difficulty with 100% precision.'
  },
  {
    id: 'rnk-4',
    name: 'Arjun Singhania',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rank: 'AIR 48 (NIPER Ahmedabad)',
    percentile: '99.72 %ile',
    score: 388,
    exam: 'NIPER JEE',
    year: 2024,
    college: 'NIPER Ahmedabad - M.S. (Pharm) Pharmaceutics',
    quote: 'The library resources and personal doubt-solving sessions kept my preparation on track throughout 12 months.'
  }
];

export const INITIAL_NOTIFICATIONS: InstituteNotification[] = [
  {
    id: 'notif-1',
    title: 'All-India GPAT Mock #4 Scheduled',
    message: 'Online testing link and hall instructions released for Sunday 10:00 AM.',
    timestamp: '15 mins ago',
    type: 'exam',
    read: false
  },
  {
    id: 'notif-2',
    title: '5 Textbook Returns Overdue',
    message: "Aulton's Pharmaceutics borrow period expired for Batch A candidates.",
    timestamp: '1 hour ago',
    type: 'library',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Fee Collection Milestone Reached',
    message: 'Institute reached ₹24.8L collections (+8.4% above quarterly benchmark).',
    timestamp: '3 hours ago',
    type: 'fee',
    read: true
  },
  {
    id: 'notif-4',
    title: 'NIPER 2025 Comprehensive Syllabus Updated',
    message: 'Pharmacology Section IV clinical trial guidelines revised in study portal.',
    timestamp: '1 day ago',
    type: 'announcement',
    read: true
  }
];
