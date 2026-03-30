import {
  type User, type InsertUser, users,
  type Rep, type InsertRep, reps,
  type QuizResult, type InsertQuizResult, quizResults,
  type RoleplayResult, type InsertRoleplayResult, roleplayResults,
  type Activity, type InsertActivity, activities,
  type Deal, type InsertDeal, deals,
} from "@shared/schema";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq, desc, and, sql } from "drizzle-orm";

const sqlite = new Database("data.db");
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite);

// Create tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS reps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    pin TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'rep',
    status TEXT NOT NULL DEFAULT 'active',
    verticals TEXT NOT NULL DEFAULT '[]',
    avatar_color TEXT NOT NULL DEFAULT '#f97316',
    created_at TEXT NOT NULL DEFAULT ''
  );
  CREATE TABLE IF NOT EXISTS quiz_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rep_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    passed INTEGER NOT NULL,
    completed_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS roleplay_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rep_id INTEGER NOT NULL,
    scenario_id TEXT NOT NULL,
    best_count INTEGER NOT NULL,
    ok_count INTEGER NOT NULL,
    bad_count INTEGER NOT NULL,
    outcome TEXT NOT NULL,
    completed_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rep_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    calls_made INTEGER NOT NULL DEFAULT 0,
    emails_sent INTEGER NOT NULL DEFAULT 0,
    doors_knocked INTEGER NOT NULL DEFAULT 0,
    demos_booked INTEGER NOT NULL DEFAULT 0,
    demos_completed INTEGER NOT NULL DEFAULT 0,
    proposals INTEGER NOT NULL DEFAULT 0,
    notes TEXT NOT NULL DEFAULT ''
  );
  CREATE TABLE IF NOT EXISTS deals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rep_id INTEGER NOT NULL,
    business_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    vertical TEXT NOT NULL,
    tier TEXT NOT NULL,
    monthly_value INTEGER NOT NULL,
    setup_fee INTEGER NOT NULL,
    billing TEXT NOT NULL DEFAULT 'monthly',
    status TEXT NOT NULL DEFAULT 'prospect',
    notes TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL,
    closed_at TEXT
  );
`);

// Seed admin if no reps exist
const existingReps = db.select().from(reps).all();
if (existingReps.length === 0) {
  db.insert(reps).values({
    name: "Sherif Magd",
    email: "saa898@gmail.com",
    pin: "1234",
    role: "admin",
    status: "active",
    verticals: JSON.stringify(["home-services", "legal", "salons", "dental", "real-estate"]),
    avatarColor: "#f97316",
    createdAt: new Date().toISOString(),
  }).run();
}

export interface IStorage {
  // Users (legacy)
  getUser(id: number): User | undefined;
  getUserByUsername(username: string): User | undefined;
  createUser(user: InsertUser): User;

  // Reps
  getAllReps(): Rep[];
  getActiveReps(): Rep[];
  getRep(id: number): Rep | undefined;
  getRepByEmail(email: string): Rep | undefined;
  createRep(rep: InsertRep): Rep;
  updateRep(id: number, updates: Partial<InsertRep>): Rep | undefined;

  // Quiz Results
  getQuizResults(repId: number): QuizResult[];
  getLatestQuizResult(repId: number): QuizResult | undefined;
  createQuizResult(result: InsertQuizResult): QuizResult;

  // Roleplay Results
  getRoleplayResults(repId: number): RoleplayResult[];
  createRoleplayResult(result: InsertRoleplayResult): RoleplayResult;

  // Activities
  getActivities(repId: number): Activity[];
  getActivityByDate(repId: number, date: string): Activity | undefined;
  createActivity(activity: InsertActivity): Activity;
  updateActivity(id: number, updates: Partial<InsertActivity>): Activity | undefined;
  getAllActivities(): Activity[];

  // Deals
  getDeals(repId: number): Deal[];
  getAllDeals(): Deal[];
  getDeal(id: number): Deal | undefined;
  createDeal(deal: InsertDeal): Deal;
  updateDeal(id: number, updates: Partial<InsertDeal>): Deal | undefined;
}

export class DatabaseStorage implements IStorage {
  // Users
  getUser(id: number): User | undefined {
    return db.select().from(users).where(eq(users.id, id)).get();
  }
  getUserByUsername(username: string): User | undefined {
    return db.select().from(users).where(eq(users.username, username)).get();
  }
  createUser(insertUser: InsertUser): User {
    return db.insert(users).values(insertUser).returning().get();
  }

  // Reps
  getAllReps(): Rep[] {
    return db.select().from(reps).all();
  }
  getActiveReps(): Rep[] {
    return db.select().from(reps).where(eq(reps.status, "active")).all();
  }
  getRep(id: number): Rep | undefined {
    return db.select().from(reps).where(eq(reps.id, id)).get();
  }
  getRepByEmail(email: string): Rep | undefined {
    return db.select().from(reps).where(eq(reps.email, email)).get();
  }
  createRep(rep: InsertRep): Rep {
    return db.insert(reps).values(rep).returning().get();
  }
  updateRep(id: number, updates: Partial<InsertRep>): Rep | undefined {
    const result = db.update(reps).set(updates).where(eq(reps.id, id)).returning().get();
    return result;
  }

  // Quiz Results
  getQuizResults(repId: number): QuizResult[] {
    return db.select().from(quizResults).where(eq(quizResults.repId, repId)).all();
  }
  getLatestQuizResult(repId: number): QuizResult | undefined {
    return db.select().from(quizResults).where(eq(quizResults.repId, repId)).orderBy(desc(quizResults.id)).get();
  }
  createQuizResult(result: InsertQuizResult): QuizResult {
    return db.insert(quizResults).values(result).returning().get();
  }

  // Roleplay Results
  getRoleplayResults(repId: number): RoleplayResult[] {
    return db.select().from(roleplayResults).where(eq(roleplayResults.repId, repId)).all();
  }
  createRoleplayResult(result: InsertRoleplayResult): RoleplayResult {
    return db.insert(roleplayResults).values(result).returning().get();
  }

  // Activities
  getActivities(repId: number): Activity[] {
    return db.select().from(activities).where(eq(activities.repId, repId)).orderBy(desc(activities.date)).all();
  }
  getActivityByDate(repId: number, date: string): Activity | undefined {
    return db.select().from(activities).where(and(eq(activities.repId, repId), eq(activities.date, date))).get();
  }
  createActivity(activity: InsertActivity): Activity {
    return db.insert(activities).values(activity).returning().get();
  }
  updateActivity(id: number, updates: Partial<InsertActivity>): Activity | undefined {
    return db.update(activities).set(updates).where(eq(activities.id, id)).returning().get();
  }
  getAllActivities(): Activity[] {
    return db.select().from(activities).orderBy(desc(activities.date)).all();
  }

  // Deals
  getDeals(repId: number): Deal[] {
    return db.select().from(deals).where(eq(deals.repId, repId)).orderBy(desc(deals.id)).all();
  }
  getAllDeals(): Deal[] {
    return db.select().from(deals).orderBy(desc(deals.id)).all();
  }
  getDeal(id: number): Deal | undefined {
    return db.select().from(deals).where(eq(deals.id, id)).get();
  }
  createDeal(deal: InsertDeal): Deal {
    return db.insert(deals).values(deal).returning().get();
  }
  updateDeal(id: number, updates: Partial<InsertDeal>): Deal | undefined {
    return db.update(deals).set(updates).where(eq(deals.id, id)).returning().get();
  }
}

export const storage = new DatabaseStorage();
