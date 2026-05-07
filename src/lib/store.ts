// Centralized in-memory store, persisted to localStorage.
// Provides full CRUD for candidats, demandes, partenaires, recruteurs.
// Will be replaced by Lovable Cloud (DB) at the next step.

import { useSyncExternalStore } from "react";
import {
  MOCK_CANDIDATS,
  MOCK_DEMANDES,
  MOCK_PARTENAIRES,
  MOCK_RECRUTEURS,
  type Candidat,
  type Demande,
  type Partenaire,
  type Recruteur,
} from "@/lib/mock-data";

const KEY = "sunu_store_v1";

interface State {
  candidats: Candidat[];
  demandes: Demande[];
  partenaires: Partenaire[];
  recruteurs: Recruteur[];
}

let state: State = load();
const listeners = new Set<() => void>();

function load(): State {
  if (typeof window === "undefined") {
    return {
      candidats: MOCK_CANDIDATS,
      demandes: MOCK_DEMANDES,
      partenaires: MOCK_PARTENAIRES,
      recruteurs: MOCK_RECRUTEURS,
    };
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as State;
  } catch {
    // ignore
  }
  const seed: State = {
    candidats: [...MOCK_CANDIDATS],
    demandes: [...MOCK_DEMANDES],
    partenaires: [...MOCK_PARTENAIRES],
    recruteurs: [...MOCK_RECRUTEURS],
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(seed));
  } catch {
    // ignore
  }
  return seed;
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(state),
  );
}

export function getState(): State {
  return state;
}

function uid(prefix: string) {
  return prefix + Math.random().toString(36).slice(2, 9);
}

// ===== Candidats =====
export const candidatsApi = {
  add(c: Omit<Candidat, "id" | "dateCandidature" | "statut"> & Partial<Pick<Candidat, "statut" | "dateCandidature">>): Candidat {
    const newC: Candidat = {
      id: uid("c"),
      dateCandidature: new Date().toISOString().slice(0, 10),
      statut: "Nouveau",
      ...c,
    } as Candidat;
    state = { ...state, candidats: [newC, ...state.candidats] };
    emit();
    return newC;
  },
  update(id: string, patch: Partial<Candidat>) {
    state = { ...state, candidats: state.candidats.map((x) => (x.id === id ? { ...x, ...patch } : x)) };
    emit();
  },
  remove(id: string) {
    state = { ...state, candidats: state.candidats.filter((x) => x.id !== id) };
    emit();
  },
};

// ===== Demandes =====
export const demandesApi = {
  add(d: Omit<Demande, "id" | "reference" | "dateCreation" | "statut"> & Partial<Pick<Demande, "statut">>): Demande {
    const num = String(state.demandes.length + 1).padStart(3, "0");
    const newD: Demande = {
      id: uid("d"),
      reference: `STC-${new Date().getFullYear()}-${num}`,
      dateCreation: new Date().toISOString().slice(0, 10),
      statut: "Nouvelle",
      ...d,
    } as Demande;
    state = { ...state, demandes: [newD, ...state.demandes] };
    emit();
    return newD;
  },
  update(id: string, patch: Partial<Demande>) {
    state = { ...state, demandes: state.demandes.map((x) => (x.id === id ? { ...x, ...patch } : x)) };
    emit();
  },
  remove(id: string) {
    state = { ...state, demandes: state.demandes.filter((x) => x.id !== id) };
    emit();
  },
};

// ===== Partenaires =====
export const partenairesApi = {
  add(p: Omit<Partenaire, "id" | "dateInscription" | "demandesActives" | "statut"> & Partial<Pick<Partenaire, "statut">>): Partenaire {
    const newP: Partenaire = {
      id: uid("p"),
      dateInscription: new Date().toISOString().slice(0, 10),
      demandesActives: 0,
      statut: "Actif",
      ...p,
    } as Partenaire;
    state = { ...state, partenaires: [newP, ...state.partenaires] };
    emit();
    return newP;
  },
  update(id: string, patch: Partial<Partenaire>) {
    state = { ...state, partenaires: state.partenaires.map((x) => (x.id === id ? { ...x, ...patch } : x)) };
    emit();
  },
  remove(id: string) {
    state = { ...state, partenaires: state.partenaires.filter((x) => x.id !== id) };
    emit();
  },
};

// ===== Recruteurs =====
export const recruteursApi = {
  add(r: Omit<Recruteur, "id" | "dateAjout" | "demandesAssignees" | "actif"> & Partial<Pick<Recruteur, "actif">>): Recruteur {
    const newR: Recruteur = {
      id: uid("r"),
      dateAjout: new Date().toISOString().slice(0, 10),
      demandesAssignees: 0,
      actif: true,
      ...r,
    } as Recruteur;
    state = { ...state, recruteurs: [newR, ...state.recruteurs] };
    emit();
    return newR;
  },
  update(id: string, patch: Partial<Recruteur>) {
    state = { ...state, recruteurs: state.recruteurs.map((x) => (x.id === id ? { ...x, ...patch } : x)) };
    emit();
  },
  remove(id: string) {
    state = { ...state, recruteurs: state.recruteurs.filter((x) => x.id !== id) };
    emit();
  },
};

export function resetStore() {
  state = {
    candidats: [...MOCK_CANDIDATS],
    demandes: [...MOCK_DEMANDES],
    partenaires: [...MOCK_PARTENAIRES],
    recruteurs: [...MOCK_RECRUTEURS],
  };
  emit();
}
