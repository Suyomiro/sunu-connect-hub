// Mock data — sera remplacé par Lovable Cloud (DB) à la prochaine étape.

export type Statut = "Nouvelle" | "En traitement" | "Shortlist envoyée" | "Pourvue" | "Clôturée";
export type StatutCandidat = "Nouveau" | "Présélectionné" | "Entretien" | "Validé" | "Rejeté";

export interface Demande {
  id: string;
  reference: string;
  partenaireId: string;
  partenaire: string;
  poste: string;
  nbPostes: number;
  langues: string[];
  experience: string;
  niveau: string;
  urgence: "Basse" | "Moyenne" | "Haute";
  statut: Statut;
  dateCreation: string;
  delaiJours?: number;
}

export interface Candidat {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  poste: string;
  experience: string;
  langues: string[];
  competences: string[];
  statut: StatutCandidat;
  dateCandidature: string;
  cvUrl?: string;
}

export interface Partenaire {
  id: string;
  nom: string;
  secteur: string;
  contact: string;
  email: string;
  telephone: string;
  demandesActives: number;
  dateInscription: string;
  statut: "Actif" | "En attente" | "Suspendu";
}

export interface Recruteur {
  id: string;
  nom: string;
  email: string;
  role: "Admin" | "Recruteur";
  demandesAssignees: number;
  dateAjout: string;
  actif: boolean;
}

export const MOCK_DEMANDES: Demande[] = [
  { id: "d1", reference: "STC-2026-001", partenaireId: "p1", partenaire: "Orange Sénégal", poste: "Téléconseiller bilingue FR/EN", nbPostes: 15, langues: ["Français", "Anglais"], experience: "1-3 ans", niveau: "Bac+2", urgence: "Haute", statut: "Shortlist envoyée", dateCreation: "2026-04-22", delaiJours: 4 },
  { id: "d2", reference: "STC-2026-002", partenaireId: "p2", partenaire: "Wave", poste: "Conseiller support fintech", nbPostes: 8, langues: ["Français", "Wolof"], experience: "1-3 ans", niveau: "Bac+3", urgence: "Moyenne", statut: "En traitement", dateCreation: "2026-04-28", delaiJours: 2 },
  { id: "d3", reference: "STC-2026-003", partenaireId: "p3", partenaire: "Sonatel", poste: "Team Leader plateau", nbPostes: 2, langues: ["Français"], experience: "5-10 ans", niveau: "Bac+4", urgence: "Haute", statut: "Nouvelle", dateCreation: "2026-05-02" },
  { id: "d4", reference: "STC-2026-004", partenaireId: "p4", partenaire: "Ecobank", poste: "Chargé de relation client", nbPostes: 5, langues: ["Français", "Anglais"], experience: "3-5 ans", niveau: "Bac+3", urgence: "Moyenne", statut: "Pourvue", dateCreation: "2026-03-15", delaiJours: 12 },
  { id: "d5", reference: "STC-2026-005", partenaireId: "p1", partenaire: "Orange Sénégal", poste: "Superviseur qualité", nbPostes: 1, langues: ["Français"], experience: "5-10 ans", niveau: "Bac+4", urgence: "Basse", statut: "Clôturée", dateCreation: "2026-02-08", delaiJours: 18 },
];

export const MOCK_CANDIDATS: Candidat[] = [
  { id: "c1", prenom: "Aïssatou", nom: "Diallo", email: "aissatou.diallo@mail.com", telephone: "+221 77 123 45 67", poste: "Téléconseiller bilingue", experience: "1-3 ans", langues: ["Français", "Anglais", "Wolof"], competences: ["Service client", "CRM (Salesforce, Zendesk…)"], statut: "Présélectionné", dateCandidature: "2026-04-25" },
  { id: "c2", prenom: "Mamadou", nom: "Sow", email: "m.sow@mail.com", telephone: "+221 76 555 11 22", poste: "Support technique", experience: "3-5 ans", langues: ["Français", "Anglais"], competences: ["Support technique", "Réclamations / Litiges"], statut: "Entretien", dateCandidature: "2026-04-21" },
  { id: "c3", prenom: "Fatou", nom: "Ndiaye", email: "fatou.ndiaye@mail.com", telephone: "+221 78 998 76 54", poste: "Téléconseillère", experience: "0-1", langues: ["Français", "Wolof"], competences: ["Service client", "Vente / Téléprospection"], statut: "Nouveau", dateCandidature: "2026-05-04" },
  { id: "c4", prenom: "Cheikh", nom: "Bâ", email: "cheikh.ba@mail.com", telephone: "+221 70 222 33 44", poste: "Team Leader", experience: "5-10 ans", langues: ["Français", "Anglais"], competences: ["Team Leader", "Formateur GRC"], statut: "Validé", dateCandidature: "2026-04-12" },
  { id: "c5", prenom: "Awa", nom: "Faye", email: "awa.faye@mail.com", telephone: "+221 77 654 32 10", poste: "Conseiller fintech", experience: "1-3 ans", langues: ["Français", "Wolof"], competences: ["Service client", "Back-office"], statut: "Présélectionné", dateCandidature: "2026-04-30" },
  { id: "c6", prenom: "Ibrahima", nom: "Sarr", email: "ibrahima.sarr@mail.com", telephone: "+221 76 111 22 33", poste: "Superviseur", experience: "5-10 ans", langues: ["Français"], competences: ["Team Leader", "Service client"], statut: "Nouveau", dateCandidature: "2026-05-05" },
  { id: "c7", prenom: "Mariama", nom: "Sy", email: "mariama.sy@mail.com", telephone: "+221 78 333 44 55", poste: "Téléconseillère", experience: "1-3 ans", langues: ["Français", "Anglais"], competences: ["Service client", "CRM (Salesforce, Zendesk…)"], statut: "Rejeté", dateCandidature: "2026-04-18" },
];

export const MOCK_PARTENAIRES: Partenaire[] = [
  { id: "p1", nom: "Orange Sénégal", secteur: "Télécoms", contact: "Khady Mbaye", email: "k.mbaye@orange.sn", telephone: "+221 33 859 00 00", demandesActives: 2, dateInscription: "2026-01-12", statut: "Actif" },
  { id: "p2", nom: "Wave", secteur: "Fintech", contact: "Modou Diop", email: "m.diop@wave.com", telephone: "+221 33 800 12 34", demandesActives: 1, dateInscription: "2026-02-04", statut: "Actif" },
  { id: "p3", nom: "Sonatel", secteur: "Télécoms", contact: "Aminata Ndour", email: "a.ndour@sonatel.sn", telephone: "+221 33 839 00 00", demandesActives: 1, dateInscription: "2025-11-20", statut: "Actif" },
  { id: "p4", nom: "Ecobank", secteur: "Banque", contact: "Ousmane Kane", email: "o.kane@ecobank.sn", telephone: "+221 33 859 70 70", demandesActives: 0, dateInscription: "2025-09-08", statut: "Actif" },
  { id: "p5", nom: "Free Sénégal", secteur: "Télécoms", contact: "Bineta Diop", email: "b.diop@free.sn", telephone: "+221 33 869 00 00", demandesActives: 0, dateInscription: "2026-04-30", statut: "En attente" },
];

export const MOCK_RECRUTEURS: Recruteur[] = [
  { id: "r1", nom: "Aminata Diop", email: "a.diop@sunutraining.sn", role: "Admin", demandesAssignees: 12, dateAjout: "2025-08-01", actif: true },
  { id: "r2", nom: "Moussa Fall", email: "m.fall@sunutraining.sn", role: "Recruteur", demandesAssignees: 8, dateAjout: "2025-10-14", actif: true },
  { id: "r3", nom: "Coumba Gueye", email: "c.gueye@sunutraining.sn", role: "Recruteur", demandesAssignees: 5, dateAjout: "2026-01-22", actif: true },
  { id: "r4", nom: "Pape Sarr", email: "p.sarr@sunutraining.sn", role: "Recruteur", demandesAssignees: 0, dateAjout: "2026-04-10", actif: false },
];

// Auth mock helpers (localStorage) — sera remplacé par auth Cloud.
export const PARTNER_KEY = "sunu_partner_session";
export const ADMIN_KEY = "sunu_admin_session";

export function getPartnerSession(): { email: string; company: string } | null {
  if (typeof window === "undefined") return null;
  try { const v = localStorage.getItem(PARTNER_KEY); return v ? JSON.parse(v) : null; } catch { return null; }
}
export function setPartnerSession(s: { email: string; company: string }) {
  localStorage.setItem(PARTNER_KEY, JSON.stringify(s));
}
export function clearPartnerSession() { localStorage.removeItem(PARTNER_KEY); }

export function getAdminSession(): { email: string; name: string; role: "Admin" | "Recruteur" } | null {
  if (typeof window === "undefined") return null;
  try { const v = localStorage.getItem(ADMIN_KEY); return v ? JSON.parse(v) : null; } catch { return null; }
}
export function setAdminSession(s: { email: string; name: string; role: "Admin" | "Recruteur" }) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(s));
}
export function clearAdminSession() { localStorage.removeItem(ADMIN_KEY); }
