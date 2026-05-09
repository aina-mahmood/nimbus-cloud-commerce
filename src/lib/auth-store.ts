import { useSyncExternalStore } from "react";

let admin = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const authStore = {
  subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); },
  get() { return admin; },
  login(email: string, password: string) {
    if (email === "admin@nimbus.io" && password === "demo") { admin = true; emit(); return true; }
    return false;
  },
  logout() { admin = false; emit(); },
};

export const useAdmin = () => useSyncExternalStore(authStore.subscribe, authStore.get, () => admin);
