// Zass Education — browser-local store (v1).
// All data lives in THIS browser only: JSON in localStorage, uploaded file
// bytes in IndexedDB. There is no server and no sync between devices yet.
// A shared backend (Supabase) is the planned next step.
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_SETTINGS,
  SEED_COURSES,
  SEED_NOTES,
  SEED_PAPERS,
  SEED_SUBJECTS,
  type Booking,
  type Course,
  type Note,
  type Paper,
  type SiteSettings,
  type Subject,
} from "./types";

export const KEYS = {
  settings: "zass.settings.v1",
  subjects: "zass.subjects.v1",
  papers: "zass.papers.v1",
  notes: "zass.notes.v1",
  courses: "zass.courses.v1",
  bookings: "zass.bookings.v1",
  admin: "zass.admin.v1",
  adminSession: "zass.admin.session",
} as const;

export function uid(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
  );
}

export function formatBytes(size: number | null | undefined): string {
  if (!size && size !== 0) return "—";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) } as T;
  } catch {
    return fallback;
  }
}

function loadList<T extends { id: string }>(key: string, seed: T[]): T[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return seed;
    const parsed = JSON.parse(raw) as T[];
    return Array.isArray(parsed) ? parsed : seed;
  } catch {
    return seed;
  }
}

function saveJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full / unavailable — v1 keeps data best-effort in this browser
  }
}

// ---------------------------------------------------------------------------
// Settings (with palette applied as CSS variables on :root)
// ---------------------------------------------------------------------------

interface SettingsCtx {
  settings: SiteSettings;
  update: (patch: Partial<SiteSettings>) => void;
  updatePalette: (patch: Partial<SiteSettings["palette"]>) => void;
  reset: () => void;
}

const SettingsContext = createContext<SettingsCtx>({
  settings: DEFAULT_SETTINGS,
  update: () => {},
  updatePalette: () => {},
  reset: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  // Hydration-safe: first render uses defaults (matches SSR), then load
  // the saved settings from localStorage after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage sync after mount (see above)
    setSettings(loadJSON<SiteSettings>(KEYS.settings, DEFAULT_SETTINGS));
  }, []);

  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--zass-base", settings.palette.base);
    r.setProperty("--zass-card", settings.palette.card);
    r.setProperty("--zass-primary", settings.palette.primary);
    r.setProperty("--zass-accent", settings.palette.accent);
  }, [settings.palette]);

  const update = useCallback((patch: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveJSON(KEYS.settings, next);
      return next;
    });
  }, []);

  const updatePalette = useCallback(
    (patch: Partial<SiteSettings["palette"]>) => {
      setSettings((prev) => {
        const next = {
          ...prev,
          palette: { ...prev.palette, ...patch },
        };
        saveJSON(KEYS.settings, next);
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    saveJSON(KEYS.settings, DEFAULT_SETTINGS);
  }, []);

  const value = useMemo(
    () => ({ settings, update, updatePalette, reset }),
    [settings, update, updatePalette, reset],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsCtx {
  return useContext(SettingsContext);
}

// ---------------------------------------------------------------------------
// Collections (subjects / papers / notes / courses)
// ---------------------------------------------------------------------------

function useCollection<T extends { id: string }>(
  key: string,
  seed: T[],
): [T[], (items: T[]) => void, (item: T) => void, (id: string) => void] {
  const [items, setItems] = useState<T[]>(seed);

  // Hydration-safe: first render uses seeds (matches SSR), then load the
  // saved rows from localStorage after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage sync after mount (see above)
    setItems(loadList<T>(key, seed));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const replace = useCallback(
    (next: T[]) => {
      setItems(next);
      saveJSON(key, next);
    },
    [key],
  );

  const upsert = useCallback(
    (item: T) => {
      setItems((prev) => {
        const next = prev.some((p) => p.id === item.id)
          ? prev.map((p) => (p.id === item.id ? item : p))
          : [item, ...prev];
        saveJSON(key, next);
        return next;
      });
    },
    [key],
  );

  const remove = useCallback(
    (id: string) => {
      setItems((prev) => {
        const next = prev.filter((p) => p.id !== id);
        saveJSON(key, next);
        return next;
      });
    },
    [key],
  );

  return [items, replace, upsert, remove];
}

export function useSubjects() {
  const [items, replace, upsert, remove] = useCollection<Subject>(
    KEYS.subjects,
    SEED_SUBJECTS,
  );
  return { subjects: items, setSubjects: replace, saveSubject: upsert, deleteSubject: remove };
}

export function usePapers() {
  const [items, replace, upsert, remove] = useCollection<Paper>(
    KEYS.papers,
    SEED_PAPERS,
  );
  return { papers: items, setPapers: replace, savePaper: upsert, deletePaper: remove };
}

export function useNotes() {
  const [items, replace, upsert, remove] = useCollection<Note>(
    KEYS.notes,
    SEED_NOTES,
  );
  return { notes: items, setNotes: replace, saveNote: upsert, deleteNote: remove };
}

export function useCourses() {
  const [items, replace, upsert, remove] = useCollection<Course>(
    KEYS.courses,
    SEED_COURSES,
  );
  return { courses: items, setCourses: replace, saveCourse: upsert, deleteCourse: remove };
}

export function useBookings() {
  const [items, replace, upsert, remove] = useCollection<Booking>(
    KEYS.bookings,
    [],
  );
  return { bookings: items, setBookings: replace, saveBooking: upsert, deleteBooking: remove };
}

export function subjectName(subjects: Subject[], id: string): string {
  return subjects.find((s) => s.id === id)?.name ?? "—";
}

// ---------------------------------------------------------------------------
// Uploaded files — IndexedDB (file bytes; metadata lives in localStorage)
// ---------------------------------------------------------------------------

const DB_NAME = "zass-files";
const STORE = "files";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) {
        req.result.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveFileBlob(
  id: string,
  blob: Blob,
): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(blob, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export async function getFileBlob(id: string): Promise<Blob | null> {
  const db = await openDb();
  const blob = await new Promise<Blob | null>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(id);
    req.onsuccess = () => resolve((req.result as Blob | undefined) ?? null);
    req.onerror = () => reject(req.error);
  });
  db.close();
  return blob;
}

export async function deleteFileBlob(id: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

/** Download a stored file blob in this browser. Returns false if no file. */
export async function downloadStoredFile(
  fileId: string,
  fileName: string,
): Promise<boolean> {
  const blob = await getFileBlob(fileId);
  if (!blob) return false;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  return true;
}

export async function totalStoredBytes(): Promise<number> {
  try {
    const db = await openDb();
    const keys = await new Promise<IDBValidKey[]>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).getAllKeys();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    let total = 0;
    for (const k of keys) {
      const blob = await getFileBlob(String(k));
      if (blob) total += blob.size;
    }
    db.close();
    return total;
  } catch {
    return 0;
  }
}

// ---------------------------------------------------------------------------
// Admin auth — first-run setup with a PIN (hashed, lives only in this browser)
// ---------------------------------------------------------------------------

export interface AdminSetup {
  name: string;
  email: string;
  pinHash: string;
}

export async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function loadAdminSetup(): AdminSetup | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEYS.admin);
    return raw ? (JSON.parse(raw) as AdminSetup) : null;
  } catch {
    return null;
  }
}

export function saveAdminSetup(setup: AdminSetup) {
  saveJSON(KEYS.admin, setup);
}

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(KEYS.adminSession) === "1";
}

export function setAdminAuthed(on: boolean) {
  if (on) window.sessionStorage.setItem(KEYS.adminSession, "1");
  else window.sessionStorage.removeItem(KEYS.adminSession);
}

export async function verifyPin(pin: string): Promise<boolean> {
  const setup = loadAdminSetup();
  if (!setup) return false;
  return (await sha256Hex(pin)) === setup.pinHash;
}
