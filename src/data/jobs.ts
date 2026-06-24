export interface KSA {
  title: string;
  description: string;
}

export interface JobDutySection {
  heading: string;
  items: string[];
}

export interface Job {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  qualification: string;
  experience: string;
  overview: string;
  dutySections: JobDutySection[];
  ksas: KSA[];
  qualifications: string[];
  emailjsTemplateId: string;
  keywords: string;
}

export const jobs: Job[] = [
  {
    slug: 'general-accounting-specialist',
    title: 'General Accounting Specialist',
    department: 'accounting',
    location: 'Metro Manila',
    type: 'Full-time',
    qualification: 'BS Accountancy',
    experience: '6 mos+ experience',
    overview: 'We are looking for a detail-oriented and organized General Accounting Specialist to join the DOYEN team. You will be responsible for handling accounts payable and receivable, collections, BIR/tax compliance, and general accounting tasks to ensure accurate and up-to-date financial records across the group.',
    keywords: 'general accounting specialist accounts payable receivable collections BIR tax compliance bookkeeping ledger finance',
    emailjsTemplateId: 'template_apply',
    dutySections: [
      {
        heading: 'Accounts Payable (AP)',
        items: [
          'Handle day-to-day accounts payable transactions and ensure proper documentation',
          'Process and verify invoices, bills, and payment requests',
          'Assist in preparing and processing supplier payments with complete supporting documents',
          'Ensure accuracy and proper recording of all payable transactions',
        ],
      },
      {
        heading: 'Accounts Receivable (AR)',
        items: [
          'Prepare and issue invoices to customers/clients in a timely manner',
          'Record and monitor receivables to ensure accuracy of accounting records',
          'Coordinate with internal teams regarding billing concerns and discrepancies',
        ],
      },
      {
        heading: 'Collection',
        items: [
          'Follow up with customers/clients regarding overdue accounts and outstanding balances',
          'Ensure timely collection of receivables in accordance with agreed payment terms',
          'Coordinate payment arrangements and resolve collection issues professionally',
          'Maintain updated collection reports and status of accounts',
        ],
      },
      {
        heading: 'BIR / Tax Compliance',
        items: [
          'Assist in the preparation and submission of tax-related filings in compliance with BIR regulations',
          'Ensure proper documentation and maintenance of records for tax purposes',
          'Support compliance with government reporting requirements and deadlines',
        ],
      },
      {
        heading: 'General Accounting & Administration',
        items: [
          'Maintain accurate, complete, and up-to-date financial and accounting records',
          'Coordinate with internal departments, vendors, clients, and external partners as needed',
          'Assist during internal and external audits and financial reviews',
          'Perform other accounting and administrative tasks as assigned',
        ],
      },
    ],
    ksas: [
      {
        title: 'Attention to Detail',
        description: 'High level of accuracy in processing financial transactions, preparing reports, and maintaining accounting records for AP, AR, and tax compliance',
      },
      {
        title: 'Time Management',
        description: 'Ability to prioritize multiple accounting tasks and meet deadlines for payments, collections, reporting, and month-end closing',
      },
      {
        title: 'Interpersonal & Communication Skills',
        description: 'Clear and professional communication with internal departments, vendors, clients, and external partners',
      },
      {
        title: 'Confidentiality & Integrity',
        description: 'Strong commitment to safeguarding financial data, company records, and sensitive business information while adhering to ethical accounting standards',
      },
      {
        title: 'Problem-Solving Skills',
        description: 'Ability to analyze discrepancies in accounts, resolve billing or payment issues, and support reconciliation processes',
      },
      {
        title: 'Process Improvement',
        description: 'Ability to identify inefficiencies in accounting workflows and recommend improvements in documentation, reporting, and financial processes',
      },
      {
        title: 'Knowledge of Accounting & Tax Regulations',
        description: 'Familiarity with accounting principles and Philippine tax (BIR) compliance requirements',
      },
    ],
    qualifications: [
      "Bachelor's degree in Accountancy, Accounting Technology, or related course",
      'At least 6 months of relevant experience in accounting, AP, AR, or collections',
      'Working knowledge of BIR taxation and compliance',
      'Proficient in MS Excel and basic accounting systems',
      'Detail-oriented, organized, and deadline-driven',
      'Able to work independently and handle confidential information',
    ],
  },
  {
    slug: 'chief-mechanic',
    title: 'Chief Mechanic',
    department: 'maintenance',
    location: 'Metro Manila',
    type: 'Full-time',
    qualification: 'Technical / Vocational Cert.',
    experience: '5–10 yrs experience',
    overview: 'The Chief Mechanic is responsible for overseeing the maintenance, repair, and operational readiness of HOWO trucks. The role involves supervising mechanics, diagnosing complex mechanical and electrical issues, scheduling preventive maintenance, ensuring safety compliance, and minimizing vehicle downtime.',
    keywords: 'chief mechanic maintenance HOWO Sinotruk diesel engine repair heavy duty truck ECU brake suspension hydraulic workshop supervisor',
    emailjsTemplateId: 'template_apply',
    dutySections: [
      {
        heading: 'Key Responsibilities',
        items: [
          'Supervise and lead a team of mechanics and technicians',
          'Manage the maintenance of Chinese truck brands such as Sinotruk HOWO including heavy-duty trucks',
          'Plan and implement preventive maintenance schedules to reduce breakdowns and downtime',
          'Diagnose and troubleshoot engine, transmission, brake, suspension, hydraulic, and electrical system faults',
          'Inspect trucks regularly to ensure safe operating conditions and regulatory compliance',
          'Ensure all trucks meet roadworthiness and safety standards',
          'Review and approve repair work orders and maintenance reports',
          'Ensure timely repair and servicing of equipment to minimize downtime',
        ],
      },
      {
        heading: 'Technical Core Competencies',
        items: [
          'Diesel engine overhaul and repair',
          'Electronic Diagnostics (ECU Systems)',
          'Transmission and differential maintenance',
          'Air Brake System Maintenance',
          'Hydraulic and pneumatic systems troubleshooting',
          'Electrical and electronic diagnostics',
          'Suspension and Steering Systems',
          'Fleet Maintenance Management',
        ],
      },
    ],
    ksas: [], // Chief Mechanic details in prototype do not have KSAs separate from competencies
    qualifications: [
      'Diploma or Technical Certification in Automotive, Diesel, or Heavy Equipment Mechanics',
      'Experience working with Chinese truck brands (Sinotruk HOWO or similar)',
      'Minimum 5–10 years of experience repairing heavy-duty trucks',
      'At least 2–3 years of supervisory or workshop management experience',
      'Strong knowledge of HOWO truck engines, transmissions, air brake systems, and electrical systems',
      'Ability to read technical manuals, wiring diagrams, and diagnostic reports',
      'Experience using diagnostic equipment and maintenance software',
      'Good leadership, communication, and problem-solving skills',
    ],
  },
];
