import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatWithAI, getDealCoaching } from "./ai";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ─── AUTH ───
  app.post("/api/auth/login", (req, res) => {
    const { email, pin } = req.body;
    if (!email || !pin) return res.status(400).json({ error: "Email and PIN required" });

    const rep = storage.getRepByEmail(email);
    if (!rep) return res.status(401).json({ error: "Rep not found" });
    if (rep.pin !== pin) return res.status(401).json({ error: "Invalid PIN" });
    if (rep.status !== "active") return res.status(403).json({ error: "Account inactive" });

    // Return rep data (no session needed for this simple app)
    const { pin: _, ...safeRep } = rep;
    res.json(safeRep);
  });

  // ─── REPS ───
  app.get("/api/reps", (_req, res) => {
    const allReps = storage.getAllReps();
    // Strip PINs
    const safe = allReps.map(({ pin, ...rest }) => rest);
    res.json(safe);
  });

  app.get("/api/reps/active", (_req, res) => {
    const activeReps = storage.getActiveReps();
    const safe = activeReps.map(({ pin, ...rest }) => rest);
    res.json(safe);
  });

  app.get("/api/reps/:id", (req, res) => {
    const rep = storage.getRep(Number(req.params.id));
    if (!rep) return res.status(404).json({ error: "Rep not found" });
    const { pin, ...safe } = rep;
    res.json(safe);
  });

  app.post("/api/reps", (req, res) => {
    try {
      const { name, email, pin, role, verticals, avatarColor } = req.body;
      if (!name || !email || !pin) return res.status(400).json({ error: "Name, email, and PIN required" });

      const existing = storage.getRepByEmail(email);
      if (existing) return res.status(409).json({ error: "Email already exists" });

      const rep = storage.createRep({
        name,
        email,
        pin,
        role: role || "rep",
        status: "active",
        verticals: verticals || "[]",
        avatarColor: avatarColor || "#f97316",
        createdAt: new Date().toISOString(),
      });

      const { pin: _, ...safe } = rep;
      res.json(safe);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/reps/:id", (req, res) => {
    const id = Number(req.params.id);
    const rep = storage.updateRep(id, req.body);
    if (!rep) return res.status(404).json({ error: "Rep not found" });
    const { pin, ...safe } = rep;
    res.json(safe);
  });

  // ─── QUIZ RESULTS ───
  app.get("/api/quiz-results/:repId", (req, res) => {
    const results = storage.getQuizResults(Number(req.params.repId));
    res.json(results);
  });

  app.get("/api/quiz-results/:repId/latest", (req, res) => {
    const result = storage.getLatestQuizResult(Number(req.params.repId));
    res.json(result || null);
  });

  app.post("/api/quiz-results", (req, res) => {
    try {
      const result = storage.createQuizResult({
        ...req.body,
        completedAt: new Date().toISOString(),
      });
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─── ROLEPLAY RESULTS ───
  app.get("/api/roleplay-results/:repId", (req, res) => {
    const results = storage.getRoleplayResults(Number(req.params.repId));
    res.json(results);
  });

  app.post("/api/roleplay-results", (req, res) => {
    try {
      const result = storage.createRoleplayResult({
        ...req.body,
        completedAt: new Date().toISOString(),
      });
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─── ACTIVITIES ───
  app.get("/api/activities/:repId", (req, res) => {
    const acts = storage.getActivities(Number(req.params.repId));
    res.json(acts);
  });

  app.get("/api/activities", (_req, res) => {
    const acts = storage.getAllActivities();
    res.json(acts);
  });

  app.post("/api/activities", (req, res) => {
    try {
      const { repId, date } = req.body;
      // Check if activity exists for this date
      const existing = storage.getActivityByDate(repId, date);
      if (existing) {
        // Update instead
        const updated = storage.updateActivity(existing.id, req.body);
        return res.json(updated);
      }
      const activity = storage.createActivity(req.body);
      res.json(activity);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/activities/:id", (req, res) => {
    const activity = storage.updateActivity(Number(req.params.id), req.body);
    if (!activity) return res.status(404).json({ error: "Activity not found" });
    res.json(activity);
  });

  // ─── DEALS ───
  app.get("/api/deals", (_req, res) => {
    const allDeals = storage.getAllDeals();
    res.json(allDeals);
  });

  app.get("/api/deals/rep/:repId", (req, res) => {
    const repDeals = storage.getDeals(Number(req.params.repId));
    res.json(repDeals);
  });

  app.post("/api/deals", (req, res) => {
    try {
      const deal = storage.createDeal({
        ...req.body,
        createdAt: new Date().toISOString(),
      });
      res.json(deal);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/deals/:id", (req, res) => {
    const deal = storage.updateDeal(Number(req.params.id), req.body);
    if (!deal) return res.status(404).json({ error: "Deal not found" });
    res.json(deal);
  });

  // ─── AI ASSISTANT ───
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array required" });
      }
      const response = await chatWithAI(messages);
      res.json({ response });
    } catch (err: any) {
      console.error("AI chat error:", err.message);
      res.status(500).json({ error: "AI service unavailable" });
    }
  });

  app.post("/api/ai/deal-coach", async (req, res) => {
    try {
      const coaching = await getDealCoaching(req.body);
      res.json({ coaching });
    } catch (err: any) {
      console.error("Deal coaching error:", err.message);
      res.status(500).json({ error: "AI service unavailable" });
    }
  });

  // ─── LEADERBOARD ───
  app.get("/api/leaderboard", (_req, res) => {
    const allReps = storage.getActiveReps();
    const allDeals = storage.getAllDeals();
    const allActivities = storage.getAllActivities();

    const leaderboard = allReps.map((rep) => {
      const repDeals = allDeals.filter((d) => d.repId === rep.id);
      const closedDeals = repDeals.filter((d) => d.status === "closed_won");
      const repActivities = allActivities.filter((a) => a.repId === rep.id);

      const totalRevenue = closedDeals.reduce((sum, d) => sum + d.monthlyValue, 0);
      const totalCalls = repActivities.reduce((sum, a) => sum + a.callsMade, 0);
      const totalDemos = repActivities.reduce((sum, a) => sum + a.demosCompleted, 0);

      const latestQuiz = storage.getLatestQuizResult(rep.id);
      const certified = latestQuiz ? latestQuiz.passed === 1 : false;

      return {
        id: rep.id,
        name: rep.name,
        avatarColor: rep.avatarColor,
        role: rep.role,
        dealsWon: closedDeals.length,
        totalDeals: repDeals.length,
        monthlyRevenue: totalRevenue,
        totalCalls,
        totalDemos,
        certified,
        quizScore: latestQuiz ? latestQuiz.score : null,
      };
    });

    // Sort by deals won, then revenue
    leaderboard.sort((a, b) => b.dealsWon - a.dealsWon || b.monthlyRevenue - a.monthlyRevenue);
    res.json(leaderboard);
  });

  return httpServer;
}
