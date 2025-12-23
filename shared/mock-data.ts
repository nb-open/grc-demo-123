import type { Risk, RiskBoard, Control } from './types';
export const MOCK_RISKS: Risk[] = [
  {
    id: 'r1',
    title: 'Data Breach in Customer Database',
    description: 'Potential unauthorized access to PII due to legacy firewall vulnerabilities.',
    category: 'Cyber',
    status: 'Mitigating',
    likelihood: 4,
    impact: 5,
    score: 20,
    owner: 'Security Team',
    createdAt: Date.now() - 1000000,
    updatedAt: Date.now()
  },
  {
    id: 'r2',
    title: 'Supply Chain Disruption',
    description: 'Logistics delays in Southeast Asia affecting hardware availability.',
    category: 'Operational',
    status: 'Assessed',
    likelihood: 3,
    impact: 4,
    score: 12,
    owner: 'Operations Dept',
    createdAt: Date.now() - 2000000,
    updatedAt: Date.now()
  },
  {
    id: 'r3',
    title: 'Compliance Audit Failure',
    description: 'Risk of non-compliance with new GDPR amendments.',
    category: 'Compliance',
    status: 'Identified',
    likelihood: 2,
    impact: 5,
    score: 10,
    owner: 'Legal Team',
    createdAt: Date.now() - 3000000,
    updatedAt: Date.now()
  },
  {
    id: 'r4',
    title: 'Market Volatility',
    description: 'Fluctuations in exchange rates affecting quarterly profits.',
    category: 'Financial',
    status: 'Mitigating',
    likelihood: 5,
    impact: 3,
    score: 15,
    owner: 'Finance Dept',
    createdAt: Date.now() - 500000,
    updatedAt: Date.now()
  }
];
export const MOCK_BOARD: RiskBoard = {
  id: 'default-board',
  name: 'Global Enterprise Risk Board',
  risks: MOCK_RISKS
};
export const MOCK_CONTROLS: Control[] = [
  { id: 'CTRL-001', name: 'Multi-Factor Authentication', category: 'Access Control', status: 'Active', owner: 'IT Ops', description: 'Mandatory MFA for all cloud resources.' },
  { id: 'CTRL-002', name: 'Annual Risk Assessment', category: 'Governance', status: 'Active', owner: 'GRC Team', description: 'Comprehensive annual review of organizational risk.' },
  { id: 'CTRL-003', name: 'Quarterly Access Reviews', category: 'Audit', status: 'Active', owner: 'Identity Team', description: 'Recertification of user access rights every 90 days.' },
  { id: 'CTRL-004', name: 'Endpoint Protection', category: 'Incident Response', status: 'Active', owner: 'SecOps', description: 'Deployment of EDR on all company-issued laptops.' },
  { id: 'CTRL-005', name: 'Data Loss Prevention', category: 'Data Protection', status: 'Draft', owner: 'Compliance', description: 'Monitoring and blocking sensitive data exfiltration.' },
  { id: 'CTRL-006', name: 'Incident Response Plan', category: 'Incident Response', status: 'Active', owner: 'SecOps', description: 'Formalized procedures for security incidents.' },
  { id: 'CTRL-007', name: 'Employee Security Training', category: 'Governance', status: 'Active', owner: 'HR/Compliance', description: 'Mandatory cybersecurity awareness training for all staff.' },
  { id: 'CTRL-008', name: 'Encryption at Rest', category: 'Data Protection', status: 'Active', owner: 'Cloud Arch', description: 'AES-256 encryption for all database volumes.' },
  { id: 'CTRL-009', name: 'Disaster Recovery Drill', category: 'Physical Security', status: 'Draft', owner: 'IT Infra', description: 'Simulated recovery of critical business functions.' },
  { id: 'CTRL-010', name: 'Vendor Risk Management', category: 'Governance', status: 'Active', owner: 'Procurement', description: 'Security vetting process for all third-party vendors.' },
  { id: 'CTRL-011', name: 'Firewall Audit', category: 'Audit', status: 'Active', owner: 'Network Team', description: 'Bi-annual review of firewall rule sets.' },
  { id: 'CTRL-012', name: 'Physical Badge Access', category: 'Physical Security', status: 'Active', owner: 'Facilities', description: 'Biometric and badge entry for data centers.' },
  { id: 'CTRL-013', name: 'Vulnerability Management', category: 'Incident Response', status: 'Active', owner: 'SecOps', description: 'Weekly scanning and patching of server infrastructure.' },
  { id: 'CTRL-014', name: 'Password Policy', category: 'Access Control', status: 'Retired', owner: 'IT Ops', description: 'Complexity requirements for local accounts.' },
  { id: 'CTRL-015', name: 'Change Management Board', category: 'Governance', status: 'Active', owner: 'Eng Ops', description: 'Formal review process for all production deployments.' },
  { id: 'CTRL-016', name: 'Log Retention Policy', category: 'Data Protection', status: 'Active', owner: 'Legal', description: 'Retention of audit logs for 7 years minimum.' },
  { id: 'CTRL-017', name: 'Shadow IT Detection', category: 'Access Control', status: 'Draft', owner: 'Security Team', description: 'CASB monitoring for unauthorized SaaS apps.' },
  { id: 'CTRL-018', name: 'Business Continuity Plan', category: 'Governance', status: 'Active', owner: 'Exec Leadership', description: 'High-level strategy for sustained operations during crises.' },
  { id: 'CTRL-019', name: 'Mobile Device Management', category: 'Access Control', status: 'Active', owner: 'IT Ops', description: 'Enrollment of mobile devices in corporate MDM.' },
  { id: 'CTRL-020', name: 'Audit Log Monitoring', category: 'Audit', status: 'Active', owner: 'SIEM Admin', description: 'Real-time alerting on suspicious log events.' }
];