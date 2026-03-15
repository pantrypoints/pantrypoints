CREATE TABLE IF NOT EXISTS registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  organization TEXT,
  interest TEXT,
  lang TEXT NOT NULL DEFAULT 'en',
  created_at TEXT NOT NULL
);
