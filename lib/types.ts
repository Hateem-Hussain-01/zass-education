// Zass Education - shared types, defaults and seed data (v1, browser-local).
// No backend yet: everything in this file is seed/default content stored in
// the visitor's own browser (localStorage). Nothing here is fetched from a server.

export type Level = "O Level" | "A Level";
export type Session = "Feb/Mar" | "May/June" | "Oct/Nov";

export interface Subject {
  id: string;
  name: string;
  level: Level | "Both";
  /** Cambridge syllabus code, e.g. 9709. */
  code: string;
}

export interface Paper {
  id: string;
  title: string;
  subjectId: string;
  board: string; // e.g. "Cambridge International"
  year: number;
  session: Session;
  paperNo: string; // e.g. "Paper 1"
  fileName: string | null;
  fileSize: number | null;
  /** IndexedDB key for the uploaded file blob. Null when no file uploaded. */
  fileId: string | null;
  /**
   * Direct download URL for catalogue papers (public archive link).
   * Null for admin-uploaded papers (those use fileId instead).
   */
  downloadUrl?: string | null;
  /** Where the file came from, e.g. "papers.xtremepape.rs". */
  source?: string | null;
  /** True for built-in demo rows - always shown with a "Sample" badge. */
  sample?: boolean;
  createdAt: number;
}

export interface Note {
  id: string;
  title: string;
  subjectId: string;
  body: string;
  fileName: string | null;
  fileSize: number | null;
  fileId: string | null;
  sample?: boolean;
  createdAt: number;
}

export interface Course {
  id: string;
  title: string;
  subjectId: string;
  description: string;
  /** Price in PKR. 0 = Free. */
  price: number;
  level: Level | "Both";
  image: string | null; // path under /images/
  sample?: boolean;
  createdAt: number;
}

/** A 1-to-1 session booking request, stored browser-locally (v1). */
export interface Booking {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  subjectId: string;
  preferredDay: string;
  preferredTime: string;
  message: string;
  status: "new" | "contacted" | "done";
  createdAt: number;
}

export interface Palette {
  base: string;
  card: string;
  primary: string;
  accent: string;
}

export interface SiteSettings {
  siteName: string;
  logoText: string;
  /** Uploaded logo PNG as a data URL (browser-local). Empty = use the
   *  default cap + ZASS + EDUCATION lockup drawn in code. */
  siteLogo: string;
  tagline: string;
  heroBadge: string;
  heroHeadline: string;
  heroSubtext: string;
  heroSearchPlaceholder: string;
  heroCta: string;
  statsRating: string;
  statsLearners: string;
  announcementText: string;
  announcementOn: boolean;
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string;
  socialWhatsapp: string;
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedin: string;
  socialYoutube: string;
  footerText: string;
  seoTitle: string;
  seoDescription: string;
  palette: Palette;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Zass Education",
  logoText: "Zass",
  siteLogo: "",
  tagline: "O & A Level learning, made simple.",
  heroBadge: "Learn from the best",
  heroHeadline: "Learn Anywhere, Anytime\nEmpower Your Future",
  heroSubtext:
    "Join thousands of O & A Level students getting past papers, notes and revision courses - all in one place.",
  heroSearchPlaceholder: "Search your Course...",
  heroCta: "Search",
  statsRating: "4.8",
  statsLearners: "60k+",
  announcementText: "Admissions open - new O & A Level batches starting soon.",
  announcementOn: false,
  contactEmail: "hello@zasseducation.com",
  contactPhone: "+92 300 0000000",
  contactWhatsapp: "https://wa.me/923000000000",
  socialWhatsapp: "https://wa.me/923000000000",
  socialFacebook: "",
  socialInstagram: "",
  socialLinkedin: "",
  socialYoutube: "",
  footerText:
    "Zass Education - past papers, notes and courses for O & A Level (Cambridge) students.",
  seoTitle: "Zass Education - O & A Level Learning (Cambridge)",
  seoDescription:
    "Past papers, notes, mock tests and courses for O & A Level students. Learn anywhere, anytime.",
  palette: {
    base: "#F0EDE5",
    card: "#FFFFFF",
    primary: "#004643",
    accent: "#004643",
  },
};

/** The Zass Education team, exactly as named by the founder. Names only;
 *  no roles, bios or quotes are invented for them. */
export const TEAM: { name: string }[] = [
  { name: "Zaeem Noor" },
  { name: "Shahbaz Hussain" },
  { name: "Alliya Shahbaz" },
  { name: "Sufyan Munawar" },
];

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const SEED_SUBJECTS: Subject[] = [
  // O Level (Cambridge)
  { id: "ol-mathematics", name: "Mathematics", level: "O Level", code: "4024" },
  { id: "ol-physics", name: "Physics", level: "O Level", code: "5054" },
  { id: "ol-chemistry", name: "Chemistry", level: "O Level", code: "5070" },
  { id: "ol-biology", name: "Biology", level: "O Level", code: "5090" },
  { id: "ol-english", name: "English Language", level: "O Level", code: "1123" },
  { id: "ol-urdu", name: "Urdu", level: "O Level", code: "3247" },
  { id: "ol-computer-science", name: "Computer Science", level: "O Level", code: "2210" },
  { id: "ol-business", name: "Business Studies", level: "O Level", code: "7115" },
  { id: "ol-islamiyat", name: "Islamiyat", level: "O Level", code: "2058" },
  { id: "ol-pakistan-studies", name: "Pakistan Studies", level: "O Level", code: "2059" },
  // A Level (Cambridge International AS & A Level)
  { id: "al-mathematics", name: "Mathematics", level: "A Level", code: "9709" },
  { id: "al-further-mathematics", name: "Further Mathematics", level: "A Level", code: "9231" },
  { id: "al-physics", name: "Physics", level: "A Level", code: "9702" },
  { id: "al-chemistry", name: "Chemistry", level: "A Level", code: "9701" },
  { id: "al-biology", name: "Biology", level: "A Level", code: "9700" },
  { id: "al-economics", name: "Economics", level: "A Level", code: "9708" },
  { id: "al-business", name: "Business", level: "A Level", code: "9609" },
  { id: "al-accounting", name: "Accounting", level: "A Level", code: "9706" },
  { id: "al-computer-science", name: "Computer Science", level: "A Level", code: "9618" },
  { id: "al-geography", name: "Geography", level: "A Level", code: "9696" },
];

export const SEED_PAPERS: Paper[] = [
  {
    id: "paper-sample-1",
    title: "Mathematics 9709 - Paper 1 (Pure Mathematics 1)",
    subjectId: "al-mathematics",
    board: "Cambridge International",
    year: 2024,
    session: "May/June",
    paperNo: "Paper 1",
    fileName: null,
    fileSize: null,
    fileId: null,
    sample: true,
    createdAt: 0,
  },
  {
    id: "paper-sample-2",
    title: "Physics 9702 - Paper 2 (AS Structured Questions)",
    subjectId: "al-physics",
    board: "Cambridge International",
    year: 2024,
    session: "Oct/Nov",
    paperNo: "Paper 2",
    fileName: null,
    fileSize: null,
    fileId: null,
    sample: true,
    createdAt: 0,
  },
];

export const SEED_NOTES: Note[] = [
  {
    id: "note-sample-1",
    title: "Mathematics 9709 - Functions: key definitions & worked examples",
    subjectId: "al-mathematics",
    body: "Sample note. Functions map every input to exactly one output. A function f is one-to-one if f(a) = f(b) implies a = b. Worked examples and full chapter notes can be added from the admin portal (Notes & Lessons).",
    fileName: null,
    fileSize: null,
    fileId: null,
    sample: true,
    createdAt: 0,
  },
  {
    id: "note-sample-2",
    title: "Physics 9702 - Mechanics: forces, motion & energy",
    subjectId: "al-physics",
    body: "Sample note. Mechanics is the study of motion and the forces that cause it - kinematics, Newton's laws and energy. Worked examples and full chapter notes can be added from the admin portal (Notes & Lessons).",
    fileName: null,
    fileSize: null,
    fileId: null,
    sample: true,
    createdAt: 0,
  },
  {
    id: "note-sample-3",
    title: "Chemistry 9701 - Organic Chemistry: hydrocarbons & functional groups",
    subjectId: "al-chemistry",
    body: "Sample note. Organic chemistry is the study of carbon compounds - hydrocarbons, their functional groups and their reactions. Worked examples and full chapter notes can be added from the admin portal (Notes & Lessons).",
    fileName: null,
    fileSize: null,
    fileId: null,
    sample: true,
    createdAt: 0,
  },
];

export const SEED_COURSES: Course[] = [
  {
    id: "course-maths",
    title: "Mathematics 9709 - Full Revision Course",
    subjectId: "al-mathematics",
    description:
      "Complete A Level Mathematics revision: Pure Maths 1-3, Mechanics and Statistics, with worked examples and practice questions.",
    price: 0,
    level: "A Level",
    image: "/images/1516321318423-f06f85e504b3.jpg",
    sample: true,
    createdAt: 0,
  },
  {
    id: "course-physics",
    title: "Physics 9702 - AS & A Level Masterclass",
    subjectId: "al-physics",
    description:
      "Mechanics, waves, electricity and modern physics - concept videos, notes and past-paper practice for AS & A Level.",
    price: 0,
    level: "A Level",
    image: "/images/1531482615713-2afd69097998.jpg",
    sample: true,
    createdAt: 0,
  },
  {
    id: "course-chemistry",
    title: "Chemistry 9701 - Organic & Physical Essentials",
    subjectId: "al-chemistry",
    description:
      "Physical, inorganic and organic chemistry made simple - with reaction maps, notes and exam-style questions.",
    price: 0,
    level: "A Level",
    image: "/images/1460925895917-afdab827c52f.jpg",
    sample: true,
    createdAt: 0,
  },
  {
    id: "course-biology",
    title: "Biology 9700 - Cells to Ecosystems",
    subjectId: "al-biology",
    description:
      "Cell structure, biological molecules, genetics, ecology and more - clear notes and diagrams for AS & A Level Biology.",
    price: 0,
    level: "A Level",
    image: "/images/1524995997946-a1c2e315a42f.jpg",
    sample: true,
    createdAt: 0,
  },
];
