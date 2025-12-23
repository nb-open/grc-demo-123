import { Hono } from "hono";
import type { Env } from './core-utils';
import { RiskBoardEntity } from "./entities";
import { AssessmentEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
import type { Risk, Assessment } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  const DEFAULT_BOARD_ID = 'default-board';

  app.get('/api/board', async (c) => {
    await RiskBoardEntity.ensureSeed(c.env);
    const board = new RiskBoardEntity(c.env, DEFAULT_BOARD_ID);
    if (!await board.exists()) return notFound(c, 'Board not found');
    return ok(c, await board.getBoard());
  });

  app.get('/api/assessments', async (c) => {
    const { items } = await AssessmentEntity.list(c.env);
    return ok(c, items);
  });

  app.post('/api/risks', async (c) => {
    const riskData = await c.req.json() as Risk;
    if (!riskData.title) return bad(c, 'Title is required');
    const board = new RiskBoardEntity(c.env, DEFAULT_BOARD_ID);
    const risk: Risk = {
      ...riskData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    const updated = await board.addRisk(risk);
    return ok(c, updated);
  });
  app.put('/api/risks/:id', async (c) => {
    const riskId = c.req.param('id');
    const updates = await c.req.json() as Partial<Risk>;
    const board = new RiskBoardEntity(c.env, DEFAULT_BOARD_ID);
    const updated = await board.updateRisk(riskId, updates);
    return ok(c, updated);
  });
  app.delete('/api/risks/:id', async (c) => {
    const riskId = c.req.param('id');
    const board = new RiskBoardEntity(c.env, DEFAULT_BOARD_ID);
    const updated = await board.deleteRisk(riskId);
    return ok(c, updated);
  });

  app.post('/api/assessments', async (c) => {
    const data = await c.req.json() as Assessment;
    if (!data.type) return bad(c, 'Assessment type required');
    
    const assessment: Assessment = {
      ...data,
      id: `${DEFAULT_BOARD_ID}:${data.type}`,
      boardId: DEFAULT_BOARD_ID,
      updatedAt: Date.now(),
      createdAt: data.createdAt || Date.now()
    };

    // Recalculate server-side score for integrity
    const compliantCount = assessment.responses.filter(r => r.status === 'Compliant').length;
    assessment.score = assessment.responses.length > 0 ? Math.round((compliantCount / assessment.responses.length) * 100) : 0;

    const result = await AssessmentEntity.create(c.env, assessment);
    return ok(c, result);
  });
}