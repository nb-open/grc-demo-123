import { IndexedEntity } from "./core-utils";
import type { Risk, RiskBoard, Assessment } from "@shared/types";
import { MOCK_BOARD } from "@shared/mock-data";
export class RiskBoardEntity extends IndexedEntity<RiskBoard> {
  static readonly entityName = "risk_board";
  static readonly indexName = "risk_boards";
  static readonly initialState: RiskBoard = { id: "", name: "", risks: [] };
  static seedData = [MOCK_BOARD];
  async getBoard(): Promise<RiskBoard> {
    return this.getState();
  }
  async addRisk(risk: Risk): Promise<RiskBoard> {
    const riskWithScore = {
      ...risk,
      score: (risk.likelihood || 1) * (risk.impact || 1)
    };
    return this.mutate(s => ({
      ...s,
      risks: [...s.risks, riskWithScore],
    }));
  }
  async updateRisk(riskId: string, updates: Partial<Risk>): Promise<RiskBoard> {
    return this.mutate(s => ({
      ...s,
      risks: s.risks.map(r => {
        if (r.id !== riskId) return r;
        const nextRisk = { ...r, ...updates, updatedAt: Date.now() };
        // Recalculate score if likelihood or impact changed
        if (updates.likelihood !== undefined || updates.impact !== undefined) {
          nextRisk.score = nextRisk.likelihood * nextRisk.impact;
        }
        return nextRisk;
      }),
    }));
  }
  async deleteRisk(riskId: string): Promise<RiskBoard> {
    return this.mutate(s => ({
      ...s,
      risks: s.risks.filter(r => r.id !== riskId),
    }));
  }
}
export class AssessmentEntity extends IndexedEntity<Assessment> {
  static readonly entityName = "assessment";
  static readonly indexName = "assessments";
  static readonly initialState: Assessment = {
    id: "",
    type: "ISM",
    boardId: "default-board",
    responses: [],
    score: 0,
    createdAt: 0,
    updatedAt: 0
  };
  async getAssessment(): Promise<Assessment> {
    return this.getState();
  }
}