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
  {
    slug: 'accounting-supervisor',
    title: 'Accounting Supervisor',
    department: 'accounting',
    location: 'Metro Manila',
    type: 'Full-time',
    qualification: 'BS Accountancy / Finance',
    experience: '3+ yrs leadership',
    overview:
      'We are seeking an experienced Accounting Supervisor to lead and manage our accounting team. You will oversee financial reporting, general ledger operations, month/year-end closings, and ensure compliance with accounting standards and tax regulations across the DOYEN Group.',
    keywords:
      'accounting supervisor lead financial reports income statement balance sheet cash flow ledger journal entries audit tax compliance internal controls',
    emailjsTemplateId: 'template_apply',
    dutySections: [
      {
        heading: 'Key Responsibilities',
        items: [
          'Lead and manage the accounting team',
          'Prepare and review financial reports (Income Statement, Balance Sheet, Cash Flow)',
          'Oversee general ledger, journal entries, and month/year-end closing',
          'Ensure compliance with accounting standards and tax regulations',
          'Manage audits and coordinate with external auditors',
          'Monitor cash flow and oversee bank reconciliations',
          'Strengthen internal controls and improve accounting processes',
        ],
      },
    ],
    ksas: [
      {
        title: 'Leadership & Team Management',
        description:
          'Proven ability to lead, mentor, and manage accounting staff while maintaining high performance standards',
      },
      {
        title: 'Financial Reporting',
        description:
          'Deep expertise in preparing and reviewing Income Statements, Balance Sheets, and Cash Flow reports',
      },
      {
        title: 'Regulatory Compliance',
        description:
          'Strong understanding of accounting standards, Philippine tax regulations, and BIR compliance requirements',
      },
      {
        title: 'Audit Coordination',
        description:
          'Experience managing internal and external audits, ensuring thorough documentation and timely completion',
      },
    ],
    qualifications: [
      "Bachelor's Degree in Accountancy, Finance, or related field",
      'Proven leadership experience in accounting',
      'Strong background in financial reporting, taxation, and compliance',
      'Proficient in accounting systems and Microsoft Excel',
    ],
  },
  {
    slug: 'tireman',
    title: 'Tireman',
    department: 'maintenance',
    location: 'Metro Manila',
    type: 'Full-time',
    qualification: 'Vocational / High School',
    experience: '1+ yr experience',
    overview:
      'We are looking for a skilled Tireman to join our maintenance team. You will be responsible for inspecting, installing, repairing, and replacing tires on cars, trucks, and other vehicles. Working alongside mechanics and service specialists, you will ensure tires are safe, reliable, and operating in harmony with other vehicle systems.',
    keywords:
      'tireman tire technician mounting balancing oil change wheel alignment brake repair vehicle maintenance automotive',
    emailjsTemplateId: 'template_apply',
    dutySections: [
      {
        heading: 'Duties & Responsibilities',
        items: [
          'Perform vehicle balancing, tire mounting, and replacement',
          'Conduct oil changes and basic fluid checks',
          'Perform wheel alignment and brake repairs',
          'Learn and apply new techniques through formal training sessions',
          'Inform store management about mechanical repair problems',
          'Maintain clean and organized service bays',
        ],
      },
    ],
    ksas: [
      {
        title: 'Technical Proficiency',
        description:
          'Hands-on experience with tire mounting, balancing equipment, and basic automotive repair tools',
      },
      {
        title: 'Safety Awareness',
        description:
          'Strong commitment to workplace safety practices when handling tires, jacks, and heavy equipment',
      },
      {
        title: 'Teamwork',
        description:
          'Ability to collaborate effectively with mechanics and service specialists in a fast-paced shop environment',
      },
      {
        title: 'Continuous Learning',
        description:
          'Willingness to stay up-to-date with new tire technologies and repair techniques through ongoing training',
      },
    ],
    qualifications: [
      'Experience in tire servicing or automotive repair',
      'Knowledge of tire mounting, balancing, and alignment procedures',
      'Ability to perform basic vehicle maintenance (oil changes, brake inspections)',
      'Physically fit and able to lift heavy tires and equipment',
      'Team-oriented with strong work ethic',
    ],
  },
  {
    slug: 'sales-executive',
    title: 'Sales Executive',
    department: 'sales',
    location: 'Metro Manila',
    type: 'Full-time',
    qualification: 'Business / Marketing Degree',
    experience: '1+ yr in sales',
    overview:
      'We are hiring a driven Sales Executive to identify and secure new customers, maintain strong client relationships, and consistently achieve sales targets. You will promote our products and services, negotiate contracts, and collaborate with internal teams to deliver an exceptional customer experience.',
    keywords:
      'sales executive business development client relationship negotiation prospecting networking customer service tires batteries revenue targets',
    emailjsTemplateId: 'template_apply',
    dutySections: [
      {
        heading: 'Key Responsibilities',
        items: [
          'Develop and maintain strong relationships with clients to generate sales opportunities',
          'Identify and engage potential customers through prospecting, networking, and referrals',
          'Present and promote products/services to meet client needs and maximize sales',
          'Negotiate contracts and close agreements to ensure customer satisfaction and business profitability',
          'Conduct follow-ups on leads, inquiries, and client concerns in a timely manner',
          'Maintain accurate records of sales activities, customer interactions, and transactions',
          'Collaborate with internal teams to enhance customer experience and ensure seamless service delivery',
          'Stay updated on market trends, competitor activities, and industry developments',
          'Consistently meet or exceed assigned sales targets and contribute to overall business success',
        ],
      },
    ],
    ksas: [
      {
        title: 'Relationship Building',
        description:
          'Strong ability to build rapport with clients, maintain long-term partnerships, and generate repeat business',
      },
      {
        title: 'Negotiation & Closing',
        description:
          'Proven skill in contract negotiation and closing deals that balance customer satisfaction with profitability',
      },
      {
        title: 'Market Awareness',
        description:
          'Keen understanding of market trends, competitor strategies, and industry dynamics in tires and batteries',
      },
      {
        title: 'Results-Driven',
        description:
          'Self-motivated with a track record of meeting and exceeding sales targets in competitive environments',
      },
    ],
    qualifications: [
      'A degree in Business, Marketing, or a related field is a plus',
      'Proven experience in sales, customer service, or a related field, with a strong background in tires and batteries',
      'Strong interpersonal, communication, and negotiation skills',
      'Self-motivated, results-driven, and able to work independently',
      'Ability to manage multiple clients and prioritize tasks efficiently',
      'Proficiency in Microsoft Office is an advantage',
      'Ability to work in a fast-paced, target-driven environment',
    ],
  },
  {
    slug: 'trailer-truck-driver',
    title: 'Trailer Truck Driver',
    department: 'logistics',
    location: 'Metro Manila',
    type: 'Full-time',
    qualification: 'License Code 1238',
    experience: '1+ yr trailer driving',
    overview:
      'We are looking for a responsible and experienced Trailer Truck Driver to ensure the safe and timely transportation of goods to designated destinations. You will comply with traffic laws and company safety standards, conduct routine vehicle inspections, and report any mechanical issues or incidents.',
    keywords:
      'trailer truck driver HOWO Sinotruk heavy vehicle transport delivery logistics license long distance hauling cargo',
    emailjsTemplateId: 'template_apply',
    dutySections: [
      {
        heading: 'Key Responsibilities',
        items: [
          'Safely transport goods to designated destinations on schedule',
          'Comply with all traffic laws and company safety standards at all times',
          'Conduct routine pre-trip and post-trip vehicle inspections',
          'Report any mechanical issues, incidents, or irregularities promptly',
          'Maintain accurate delivery logs and transport documentation',
          'Coordinate with dispatchers and logistics personnel for route planning',
        ],
      },
    ],
    ksas: [
      {
        title: 'Safe Driving',
        description:
          'Excellent driving record with demonstrated commitment to road safety and regulatory compliance',
      },
      {
        title: 'Route Navigation',
        description:
          'Strong familiarity with major transport routes and ability to adapt to changing road conditions',
      },
      {
        title: 'Vehicle Maintenance Awareness',
        description:
          'Basic knowledge of truck maintenance to conduct inspections and identify mechanical issues early',
      },
      {
        title: 'Reliability & Discipline',
        description:
          'Dependable with a strong work ethic, able to handle long-distance assignments with minimal supervision',
      },
    ],
    qualifications: [
      "Valid Driver's License with Restriction Code 1, 2, 3, and 8 (1238)",
      'At least 1 year of experience driving a trailer truck',
      'SSS, PhilHealth, Pag-IBIG (HDMF), and TIN numbers',
      'NBI Clearance and Barangay Clearance',
      'Medical Certificate with Fit-to-Work result',
      'Drug Test result',
      'Experience driving HOWO Sinotruk units is an advantage',
      'Physically fit and capable of long-distance driving',
      'Knowledgeable in road safety regulations and basic vehicle maintenance',
    ],
  },
  {
    slug: 'truck-helper',
    title: 'Truck Helper',
    department: 'logistics',
    location: 'Metro Manila',
    type: 'Full-time',
    qualification: 'High School Diploma',
    experience: 'Entry-level',
    overview:
      'We are hiring a hardworking Truck Helper to assist drivers with loading and unloading cargo. You will ensure goods are properly handled and secured during transport, assist with route operations, and help maintain the cleanliness and safety of the vehicle.',
    keywords:
      'truck helper assistant loader unloader cargo delivery transport logistics warehouse loading dock',
    emailjsTemplateId: 'template_apply',
    dutySections: [
      {
        heading: 'Key Responsibilities',
        items: [
          'Assist the driver in loading and unloading cargo at pickup and delivery points',
          'Ensure cargo is properly handled, organized, and secured during transport',
          'Assist with route operations and delivery coordination',
          'Help maintain the cleanliness, orderliness, and safety of the vehicle',
          'Perform other duties as assigned to support efficient delivery operations',
        ],
      },
    ],
    ksas: [
      {
        title: 'Physical Fitness',
        description:
          'Able to perform heavy lifting, loading, and unloading tasks throughout the workday',
      },
      {
        title: 'Teamwork',
        description:
          'Works well with drivers and logistics personnel to ensure smooth and efficient deliveries',
      },
      {
        title: 'Reliability',
        description:
          'Punctual, dependable, and willing to work flexible hours including early mornings and weekends',
      },
      {
        title: 'Safety Consciousness',
        description:
          'Aware of proper cargo handling procedures and vehicle safety practices',
      },
    ],
    qualifications: [
      'Experience as a Truck Helper or related role is an advantage',
      'SSS, PhilHealth, Pag-IBIG (HDMF), and TIN numbers',
      'NBI Clearance and Barangay Clearance',
      'Medical Certificate with Fit-to-Work result',
      'Drug Test result',
      'Willing to travel and work flexible hours',
      'Hardworking, reliable, and able to work well with a team',
    ],
  },
];
