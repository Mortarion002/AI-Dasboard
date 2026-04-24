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

export type ProviderStatusSnapshot = {
  provider: string;
  pageUrl: string;
  status: string;
  indicator: string;
  componentCount: number;
  degradedComponents: number;
  incidentCount: number;
  updatedAt: string;
  fetchedAt: string;
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

    CREATE TABLE IF NOT EXISTS provider_status_snapshots (
      provider TEXT PRIMARY KEY,
      page_url TEXT NOT NULL,
      status TEXT NOT NULL,
      indicator TEXT NOT NULL,
      component_count INTEGER NOT NULL,
      degraded_components INTEGER NOT NULL,
      incident_count INTEGER NOT NULL,
      updated_at TEXT NOT NULL,
      fetched_at TEXT NOT NULL
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

  const providerCount = database
    .prepare("SELECT COUNT(*) AS count FROM provider_status_snapshots")
    .get() as { count: number };

  if (providerCount.count === 0) {
    seedProviderSnapshots(database);
  }
}

function seedProviderSnapshots(database: Database.Database) {
  const fallbackRows: ProviderStatusSnapshot[] = [
    {
      provider: "Vercel",
      pageUrl: "https://www.vercel-status.com",
      status: "All Systems Operational",
      indicator: "none",
      componentCount: 64,
      degradedComponents: 0,
      incidentCount: 0,
      updatedAt: new Date().toISOString(),
      fetchedAt: new Date().toISOString(),
    },
    {
      provider: "GitHub",
      pageUrl: "https://www.githubstatus.com",
      status: "All Systems Operational",
      indicator: "none",
      componentCount: 12,
      degradedComponents: 0,
      incidentCount: 0,
      updatedAt: new Date().toISOString(),
      fetchedAt: new Date().toISOString(),
    },
    {
      provider: "OpenAI",
      pageUrl: "https://status.openai.com",
      status: "Status page data unavailable",
      indicator: "unknown",
      componentCount: 25,
      degradedComponents: 0,
      incidentCount: 0,
      updatedAt: new Date().toISOString(),
      fetchedAt: new Date().toISOString(),
    },
    {
      provider: "Anthropic",
      pageUrl: "https://status.anthropic.com",
      status: "All Systems Operational",
      indicator: "none",
      componentCount: 6,
      degradedComponents: 0,
      incidentCount: 0,
      updatedAt: new Date().toISOString(),
      fetchedAt: new Date().toISOString(),
    },
  ];

  const insert = database.prepare(`
    INSERT OR REPLACE INTO provider_status_snapshots (
      provider,
      page_url,
      status,
      indicator,
      component_count,
      degraded_components,
      incident_count,
      updated_at,
      fetched_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const transaction = database.transaction((rows: ProviderStatusSnapshot[]) => {
    for (const row of rows) {
      insert.run(
        row.provider,
        row.pageUrl,
        row.status,
        row.indicator,
        row.componentCount,
        row.degradedComponents,
        row.incidentCount,
        row.updatedAt,
        row.fetchedAt
      );
    }
  });

  transaction(fallbackRows);
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

type ProviderStatusRow = {
  provider: string;
  page_url: string;
  status: string;
  indicator: string;
  component_count: number;
  degraded_components: number;
  incident_count: number;
  updated_at: string;
  fetched_at: string;
};

function mapProviderStatus(row: ProviderStatusRow): ProviderStatusSnapshot {
  return {
    provider: row.provider,
    pageUrl: row.page_url,
    status: row.status,
    indicator: row.indicator,
    componentCount: row.component_count,
    degradedComponents: row.degraded_components,
    incidentCount: row.incident_count,
    updatedAt: row.updated_at,
    fetchedAt: row.fetched_at,
  };
}

export function getProviderStatusSnapshots() {
  const rows = getDb()
    .prepare("SELECT * FROM provider_status_snapshots ORDER BY provider ASC")
    .all() as ProviderStatusRow[];

  return rows.map(mapProviderStatus);
}

export function upsertProviderStatusSnapshot(snapshot: ProviderStatusSnapshot) {
  getDb()
    .prepare(`
      INSERT OR REPLACE INTO provider_status_snapshots (
        provider,
        page_url,
        status,
        indicator,
        component_count,
        degraded_components,
        incident_count,
        updated_at,
        fetched_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      snapshot.provider,
      snapshot.pageUrl,
      snapshot.status,
      snapshot.indicator,
      snapshot.componentCount,
      snapshot.degradedComponents,
      snapshot.incidentCount,
      snapshot.updatedAt,
      snapshot.fetchedAt
    );

  return snapshot;
}
