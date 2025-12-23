import { AssessmentType, MaturityLevel } from './types';
export interface QuestionSchema {
  id: string;
  category: string;
  title: string;
  description: string;
}
export const ISM_SCHEMA: QuestionSchema[] = [
  { id: 'ISM-01', category: 'Governance', title: 'Cyber Security Strategy', description: 'Does the organization have a documented and approved cyber security strategy?' },
  { id: 'ISM-02', category: 'Governance', title: 'Incident Response Plan', description: 'Is there a tested cyber security incident response plan in place?' },
  { id: 'ISM-03', category: 'Personnel', title: 'Security Awareness Training', description: 'Are employees provided with regular cyber security awareness training?' },
  { id: 'ISM-04', category: 'Access Control', title: 'Privileged Access Management', description: 'Is access to privileged accounts strictly controlled and audited?' },
  { id: 'ISM-05', category: 'Data Protection', title: 'Data Encryption', description: 'Is sensitive data encrypted at rest and in transit?' },
  { id: 'ISM-06', category: 'Physical Security', title: 'Facility Access Control', description: 'Is physical access to server rooms and media restricted?' },
  { id: 'ISM-07', category: 'Cyber Security', title: 'Vulnerability Disclosure', description: 'Does the organization have a vulnerability disclosure policy?' },
  { id: 'ISM-08', category: 'Governance', title: 'Risk Management Framework', description: 'Is a formal risk management framework applied to all IT systems?' },
  { id: 'ISM-09', category: 'Network', title: 'Network Segmentation', description: 'Are critical network segments isolated from public-facing infrastructure?' },
  { id: 'ISM-10', category: 'Software', title: 'Patch Management', description: 'Are security patches for operating systems applied within 48 hours for critical vulnerabilities?' },
  { id: 'ISM-11', category: 'Access Control', title: 'Multi-Factor Authentication', description: 'Is MFA required for all remote access and privileged accounts?' },
  { id: 'ISM-12', category: 'Audit', title: 'Audit Logging', description: 'Are system logs collected, centralized, and reviewed regularly?' },
  { id: 'ISM-13', category: 'Cryptography', title: 'Key Management', description: 'Are cryptographic keys managed through their entire lifecycle securely?' },
  { id: 'ISM-14', category: 'Operations', title: 'Backup Policy', description: 'Are critical datasets backed up and stored offline or in a separate failure domain?' },
  { id: 'ISM-15', category: 'Operations', title: 'Business Continuity', description: 'Has the business continuity plan been tested in the last 12 months?' }
];
export const ESSENTIAL_8_SCHEMA: QuestionSchema[] = [
  { id: 'E8-01', category: 'Prevention', title: 'Application Control', description: 'Prevent execution of unapproved/malicious programs.' },
  { id: 'E8-02', category: 'Prevention', title: 'Patch Applications', description: 'Update applications to address security vulnerabilities.' },
  { id: 'E8-03', category: 'Prevention', title: 'Configure Microsoft Office Macros', description: 'Block macros from the internet and only allow signed macros.' },
  { id: 'E8-04', category: 'Prevention', title: 'User Application Hardening', description: 'Configure web browsers to block Flash, Java, and other vulnerabilities.' },
  { id: 'E8-05', category: 'Limitation', title: 'Restrict Administrative Privileges', description: 'Limit admin access based on user roles and requirements.' },
  { id: 'E8-06', category: 'Limitation', title: 'Patch Operating Systems', description: 'Update OS versions to address security vulnerabilities.' },
  { id: 'E8-07', category: 'Limitation', title: 'Multi-Factor Authentication', description: 'Require MFA for all users when accessing sensitive data.' },
  { id: 'E8-08', category: 'Recovery', title: 'Daily Backups', description: 'Maintain daily backups of important data and configurations.' }
];