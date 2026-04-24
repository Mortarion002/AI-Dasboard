import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

export type OperatorProfile = {
  id: string;
  fullName: string;
  role: string;
  email: string;
  operationalNote: string;
  ssoDomain: string;
  mfaMethod: string;
  lastSignIn: string;
  updatedAt: string;
};

let db: Database.Database | null = null;

function getDbPath() {
  return process.env.SQLITE_DB_PATH ?? path.join(process.cwd(), "data", "aiops-command.db");
}

export function getDb() {
  if (!db) {
    mkdirSync(path.dirname(getDbPath()), { recursive: true });
    db = new Database(getDbPath());
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    migrate(db);
  }

  return db;
}

function migrate(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS operator_profiles (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL,
      email TEXT NOT NULL,
      operational_note TEXT NOT NULL,
      sso_domain TEXT NOT NULL,
      mfa_method TEXT NOT NULL,
      last_sign_in TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  const existing = database
    .prepare("SELECT id FROM operator_profiles WHERE id = ?")
    .get("default");

  if (!existing) {
    database
      .prepare(`
        INSERT INTO operator_profiles (
          id,
          full_name,
          role,
          email,
          operational_note,
          sso_domain,
          mfa_method,
          last_sign_in,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .run(
        "default",
        "Morgan Lee",
        "Platform Owner",
        "admin@aiops.com",
        "Owns production routing, model governance, and incident response for Core Systems.",
        "core-systems.io",
        "Authenticator app active",
        "Today at 02:18",
        new Date().toISOString()
      );
  }
}

type ProfileRow = {
  id: string;
  full_name: string;
  role: string;
  email: string;
  operational_note: string;
  sso_domain: string;
  mfa_method: string;
  last_sign_in: string;
  updated_at: string;
};

function mapProfile(row: ProfileRow): OperatorProfile {
  return {
    id: row.id,
    fullName: row.full_name,
    role: row.role,
    email: row.email,
    operationalNote: row.operational_note,
    ssoDomain: row.sso_domain,
    mfaMethod: row.mfa_method,
    lastSignIn: row.last_sign_in,
    updatedAt: row.updated_at,
  };
}

export function getOperatorProfile(id = "default") {
  const row = getDb()
    .prepare("SELECT * FROM operator_profiles WHERE id = ?")
    .get(id) as ProfileRow | undefined;

  if (!row) {
    throw new Error(`Operator profile ${id} was not found.`);
  }

  return mapProfile(row);
}

export function updateOperatorProfile(profile: Pick<OperatorProfile, "fullName" | "role" | "email" | "operationalNote">) {
  const updatedAt = new Date().toISOString();

  getDb()
    .prepare(`
      UPDATE operator_profiles
      SET full_name = ?,
          role = ?,
          email = ?,
          operational_note = ?,
          updated_at = ?
      WHERE id = 'default'
    `)
    .run(profile.fullName, profile.role, profile.email, profile.operationalNote, updatedAt);

  return getOperatorProfile();
}
