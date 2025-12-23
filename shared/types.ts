export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type RiskCategory = 'Operational' | 'Financial' | 'Strategic' | 'Compliance' | 'Reputational' | 'Cyber';
export type RiskStatus = 'Identified' | 'Assessed' | 'Mitigating' | 'Closed';
export type Likelihood = 1 | 2 | 3 | 4 | 5;
export type Impact = 1 | 2 | 3 | 4 | 5;
export interface Risk {
  id: string;
  title: string;
  description: string;
  category: RiskCategory;
  status: RiskStatus;
  likelihood: Likelihood;
  impact: Impact;
  score: number; // likelihood * impact
  owner: string;
  createdAt: number;
  updatedAt: number;
}
export type ControlCategory = 'Access Control' | 'Audit' | 'Incident Response' | 'Physical Security' | 'Data Protection' | 'Governance';
export type ControlStatus = 'Draft' | 'Active' | 'Retired';
export interface Control {
  id: string;
  name: string;
  category: ControlCategory;
  description: string;
  status: ControlStatus;
  owner: string;
}
export interface RiskBoard {
  id: string;
  name: string;
  risks: Risk[];
}
export interface User {
  id: string;
  name: string;
}
// Assessment Types (Phase 4)
export type AssessmentType = 'ISM' | 'ASD_E8';
export type ComplianceStatus = 'Compliant' | 'Partial' | 'Non-Compliant';
export type MaturityLevel = 1 | 2 | 3 | 4;
export interface AssessmentResponse {
  questionId: string;
  status: ComplianceStatus;
  maturity: MaturityLevel;
  comments: string;
  evidence: string;
}
export interface Assessment {
  id: string;
  type: AssessmentType;
  boardId: string;
  responses: AssessmentResponse[];
  score: number; // Overall percentage (0-100)
  createdAt: number;
  updatedAt: number;
}
export type ActiveTab = 'dashboard' | 'risk-register' | 'controls' | 'saq';