import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/* ─── REPS ─── */
export const reps = sqliteTable("reps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  pin: text("pin").notNull(), // 4-6 digit PIN for login
  role: text("role").notNull().default("rep"), // "admin" | "rep"
  status: text("status").notNull().default("active"), // "active" | "inactive"
  verticals: text("verticals").notNull().default("[]"), // JSON array of vertical IDs
  avatarColor: text("avatar_color").notNull().default("#f97316"), // hex color for avatar
  createdAt: text("created_at").notNull().default(""),
});

export const insertRepSchema = createInsertSchema(reps).omit({ id: true });
export type InsertRep = z.infer<typeof insertRepSchema>;
export type Rep = typeof reps.$inferSelect;

/* ─── QUIZ RESULTS ─── */
export const quizResults = sqliteTable("quiz_results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  repId: integer("rep_id").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  passed: integer("passed").notNull(), // 0 or 1
  completedAt: text("completed_at").notNull(),
});

export const insertQuizResultSchema = createInsertSchema(quizResults).omit({ id: true });
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type QuizResult = typeof quizResults.$inferSelect;

/* ─── ROLEPLAY RESULTS ─── */
export const roleplayResults = sqliteTable("roleplay_results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  repId: integer("rep_id").notNull(),
  scenarioId: text("scenario_id").notNull(),
  bestCount: integer("best_count").notNull(),
  okCount: integer("ok_count").notNull(),
  badCount: integer("bad_count").notNull(),
  outcome: text("outcome").notNull(), // "success" | "ok" | "lost"
  completedAt: text("completed_at").notNull(),
});

export const insertRoleplayResultSchema = createInsertSchema(roleplayResults).omit({ id: true });
export type InsertRoleplayResult = z.infer<typeof insertRoleplayResultSchema>;
export type RoleplayResult = typeof roleplayResults.$inferSelect;

/* ─── DAILY ACTIVITIES ─── */
export const activities = sqliteTable("activities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  repId: integer("rep_id").notNull(),
  date: text("date").notNull(), // YYYY-MM-DD
  callsMade: integer("calls_made").notNull().default(0),
  emailsSent: integer("emails_sent").notNull().default(0),
  doorsKnocked: integer("doors_knocked").notNull().default(0),
  demosBooked: integer("demos_booked").notNull().default(0),
  demosCompleted: integer("demos_completed").notNull().default(0),
  proposals: integer("proposals").notNull().default(0),
  notes: text("notes").notNull().default(""),
});

export const insertActivitySchema = createInsertSchema(activities).omit({ id: true });
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

/* ─── DEALS ─── */
export const deals = sqliteTable("deals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  repId: integer("rep_id").notNull(),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  vertical: text("vertical").notNull(),
  tier: text("tier").notNull(), // "starter" | "growth" | "scale"
  monthlyValue: integer("monthly_value").notNull(),
  setupFee: integer("setup_fee").notNull(),
  billing: text("billing").notNull().default("monthly"), // "monthly" | "annual"
  status: text("status").notNull().default("prospect"), // "prospect" | "demo_booked" | "demo_done" | "proposal" | "closed_won" | "closed_lost"
  notes: text("notes").notNull().default(""),
  createdAt: text("created_at").notNull(),
  closedAt: text("closed_at"),
});

export const insertDealSchema = createInsertSchema(deals).omit({ id: true });
export type InsertDeal = z.infer<typeof insertDealSchema>;
export type Deal = typeof deals.$inferSelect;

// Keep legacy users table for template compatibility
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
