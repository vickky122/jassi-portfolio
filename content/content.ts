/**
 * Site content for Jassi Sharma. Sources: `final cv.pdf` and the public top card of his LinkedIn profile
 * (headline, location, school, he/him).
 *
 * Rules (from docs/PLAN-jassi.md):
 *  - Nothing is invented. Anything the CV is silent on is the string "TODO", which the site must render as a
 *    visible dashed TODO so missing copy can never pass for finished copy.
 *  - Deliberately NOT included anywhere: phone number, home address, father's name, date of birth, school
 *    percentages, CGPA (hidden by default until Jassi decides), and any SQL/SAP/ERP claim.
 *  - Domain is international business. Audit/SOX/ITGC interests from the CV objective are NOT on the site.
 *  - Japanese is decorative only (`ornaments`). Render with lang="ja" and aria-hidden. Every real word is English.
 */

export const TODO = "TODO";

export type Chapter = { number: number; slug: string; name: string; episodeTitle: string };

export type TimelineEntry = {
  /** shown large */
  year: string;
  title: string;
  place: string;
  line: string;
};

export type CaseFile = {
  slug: string;
  arc: number;
  title: string;
  org: string;
  role: string;
  dates: string;
  /** the assignment */
  assignment: string;
  /** what was checked, and against what */
  checked: string;
  /** why it matters: the control behind the task */
  control: string;
  /** the evidence trail */
  evidence: string;
  /** qualitative until real numbers are supplied */
  result: string;
  tags: string[];
};

export type Achievement = { title: string; detail: string; year?: string };

export type Skill = { name: string; line: string };

export const content = {
  name: { first: "Jassi", last: "Sharma" },
  pronouns: "he/him",

  /** Public contact only. The email is on the CV; LinkedIn is the profile Jassi shared. */
  contact: {
    email: "iamjassisharma@gmail.com",
    linkedin: "https://www.linkedin.com/in/jassi-sharma-8058a8284/",
    /** redacted copy: phone, address, father's name, DOB removed (public/Jassi-Sharma-Resume.pdf) */
    resume: "/Jassi-Sharma-Resume.pdf",
    location: "junagarh, odisha",
  },

  /**
   * Domain: INTERNATIONAL BUSINESS (confirmed on 11 Oct 2026; matches the LinkedIn headline).
   * The CV's objective still says audit and assurance, so the CV text needs rewriting to match. The specific
   * job title is not decided, so only the domain is shown.
   */
  target: {
    domain: "international business",
    role: "mba candidate, international business",
    availability: "open to opportunities",
    confirmed: true,
  },

  /** Chapter 0 (loader) is not numbered. */
  chapters: [
    { number: 1, slug: "intro", name: "intro", episodeTitle: "enter jassi" },
    { number: 2, slug: "profile", name: "character sheet", episodeTitle: "who is jassi?" },
    { number: 3, slug: "journey", name: "flashback", episodeTitle: "the road so far" },
    { number: 4, slug: "cases", name: "arcs", episodeTitle: "case files" },
    { number: 5, slug: "craft", name: "status window", episodeTitle: "skills and side quests" },
    { number: 6, slug: "contact", name: "credits", episodeTitle: "season 2 starts with you" },
  ] satisfies Chapter[],

  /**
   * Positioning line (max 10 words, no company names). Option 2 is recommended: it states the domain and is
   * backed by the export internship on the CV. `approved` stays false until Jassi signs off.
   */
  positioning: {
    options: [
      "MBA candidate building a career in international business.",
      "International Business MBA with export and trade-documentation experience.",
      "MBA in international business, grounded in trade and process detail.",
    ],
    chosen: 1,
    approved: false,
  },

  /** Three lines, first person. Restates the CV only. DRAFT, needs Jassi's approval. */
  about: {
    approved: false,
    lines: [
      "I'm an MBA candidate at Amity Global Business School, specialising in International Business.",
      "My internships put me inside real work: preparing and checking export documentation and coordinating dispatch for international consignments, after a payroll internship that taught me to follow a defined process.",
      "I'm looking for a place in international business where I can keep learning how global trade actually runs.",
    ],
  },

  /** "Previously on..." recap card, the 5-second recruiter test. */
  recap: [
    "mba candidate, amity global business school (international business), 2027",
    "export and logistics internship: documentation for international consignments",
    "best brand presentation award; team lead to runners-up at an hr conclave",
  ],

  /**
   * Dropped on 11 Oct 2026: the CV's audit interests (operating-effectiveness testing, IT general controls, SOX)
   * do not belong on an international-business site. Kept empty so nothing renders by accident.
   */
  learningGoals: [] as string[],

  /** Chapter 02: character-sheet tiles. */
  profile: [
    { label: "domain", value: "international business" },
    { label: "degree", value: "mba, international business" },
    { label: "university", value: "amity global business school, amity university, noida" },
    { label: "expected", value: "2027" },
    { label: "undergraduate", value: "bba, commerce, g.i.e.t university (2025)" },
    { label: "audio tracks", value: "english · hindi · odia · french" },
    {
      label: "strengths",
      value: "analytical and critical thinking · attention to detail · communication · adaptability · teamwork",
    },
  ],

  /**
   * Chapter 03: flashback. Years are the CV's passing years. Start years are not on the CV, so they are not
   * written. CGPA and percentages are intentionally omitted.
   */
  timeline: [
    { year: "2018", title: "10th, cbse", place: "Career Point Gurukul, Kota (Rajasthan)", line: TODO },
    { year: "2020", title: "12th, science, cbse", place: "LBS Convent School, Kota (Rajasthan)", line: TODO },
    { year: "2025", title: "bba, commerce", place: "G.I.E.T University", line: "Commerce background: accounting and business process." },
    { year: "2027", title: "mba, international business", place: "Amity Global Business School, Amity University, Noida", line: "Expected graduation." },
  ] satisfies TimelineEntry[],

  /**
   * Chapter 04: arcs. Wording follows the CV bullets. `result` restates the CV bullets as outcomes (the CV has no numbers, so none are written); needs approval.
   * The employer descriptor "one of India's largest producers of grain-based ethyl alcohol" is on the CV but NOT
   * verified: confirm it before publishing.
   */
  employer: {
    name: "The Adie Broswon Group",
    descriptor: "one of India's largest producers of grain-based ethyl alcohol",
    descriptorVerified: false,
  },

  cases: [
    {
      slug: "exports",
      arc: 1,
      title: "exports: international consignments",
      org: "The Adie Broswon Group",
      role: "intern, exports and logistics department",
      dates: "june 2026 to august 2026",
      assignment:
        "Supported export operations for international consignments across shipment documentation and dispatch coordination.",
      checked:
        "Export documentation, prepared and checked against the underlying paperwork.",
      control:
        "A manual control: a single incorrect field can hold a consignment.",
      evidence:
        "Coordinated with internal teams and logistics partners to track consignments and escalate exceptions against committed timelines.",
      // drafted from the CV bullets (no numbers): needs Jassi's approval
      result: "Export documents were checked against the underlying paperwork before dispatch, and exceptions were escalated against committed timelines.",
      tags: ["export documentation", "trade documents", "exception escalation", "coordination"],
    },
    {
      slug: "payroll",
      arc: 2,
      title: "payroll: following the process",
      org: "The Adie Broswon Group",
      role: "hr intern, payroll department",
      dates: "may 2024 to june 2024",
      assignment:
        "Supported the senior HR lead on monthly payroll processing for the Sales and Marketing function, working within a defined approval and review process.",
      checked:
        "Compensation inputs, cross-checked against source data before release.",
      control:
        "Confidential employee compensation records: first exposure to why access restriction and review controls exist.",
      evidence:
        "Statutory deductions and payroll compliance, and the documentation trail that evidences each step.",
      // drafted from the CV bullets (no numbers): needs Jassi's approval
      result: "Compensation inputs were cross-checked against source data before release, inside a defined approval and review process.",
      tags: ["payroll", "review controls", "compliance", "documentation"],
    },
  ] satisfies CaseFile[],

  /** Arc 3, the tournament arc. */
  achievements: [
    { title: "Best Brand Presentation Award", detail: "Bizz Bash, Amity University, Noida (team)" },
    { title: "Team Lead, HR Conclave", detail: "Led the team representing the college to Runners-Up in an inter-college competition" },
    { title: "3rd position, inter-university competition", detail: "NIT Rourkela, two consecutive years", year: "2024 and 2025" },
    { title: "State-level player", detail: "Badminton (Odisha) and Football (Rajasthan)" },
    { title: "Silver medal, squash", detail: "Amity Sangathan", year: "2025" },
  ] satisfies Achievement[],

  /** Chapter 05: status window. `line` is how it was used; only what the CV supports, else TODO. No percentages. */
  skills: [
    { name: "export and trade documentation", line: "Prepared and checked export documents against the underlying paperwork." },
    { name: "business process and compliance documentation", line: "Followed defined approval and review processes across both internships." },
    { name: "payroll process controls", line: "Cross-checked payroll inputs against source data before release." },
    { name: "accounting fundamentals", line: "Commerce undergraduate grounding (BBA)." },
    // drafted: describes the tools only, not a skill level; needs approval
    { name: "microsoft excel, word and powerpoint", line: "The everyday toolkit for documents, tables and presentations." },
  ] satisfies Skill[],

  behavioural: [
    "analytical and critical thinking",
    "attention to detail",
    "written and spoken communication",
    "adaptability",
    "team collaboration",
  ],

  /** "Side quests". */
  certifications: [
    { name: "Supply Chain Management: Be Global", issuer: "Macquarie University (Coursera)" },
    { name: "International Marketing Mastery: Global Success", issuer: "Udemy" },
    { name: "Person-Centred Counselling Course", issuer: "Udemy" },
  ],

  /** Credits line. Derived from the sports on the CV: CONFIRM with Jassi. */
  hobbies: "badminton, football and squash",

  /**
   * Decorative Japanese only. Render with lang="ja" and aria-hidden="true", never as body copy.
   * The first five are standard anime vocabulary; the katakana name is a best-guess transliteration:
   * have a Japanese speaker check it before it ships.
   */
  ornaments: {
    season: "第一期",
    episodes: ["第一話", "第二話", "第三話", "第四話", "第五話", "第六話"],
    recap: "前回のあらすじ",
    nextPreview: "次回予告",
    end: "終",
    international: "国際",
    trade: "貿易",
    nameKatakana: { value: "ジャッシー・シャルマ", verified: false },
  },
} as const;

export type Content = typeof content;
