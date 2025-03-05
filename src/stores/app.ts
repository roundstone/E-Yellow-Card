import { atom } from "jotai";

interface AppState {
  showAuthTabs: boolean;
  openNavDrawer: boolean;
  hasSeenIntro: boolean;
  dashboardTitle: string;
  dashboardDrawerFooterContent: React.ReactNode | null;
  isProfileMdaSetup: boolean;
  isSidebarOpen: boolean;
  userEmail: string | null;
  selectedMarket: any | null;
}

export const defaultApp: AppState = {
  showAuthTabs: true,
  openNavDrawer: false,
  hasSeenIntro: false,
  dashboardTitle: "",
  dashboardDrawerFooterContent: null,
  isProfileMdaSetup: false,
  isSidebarOpen: false,
  userEmail: null,
  selectedMarket: null,
};

export const appAtom = atom(defaultApp);
export const clearAppAtom = atom(null, (_get, set) => {
  return set(appAtom, defaultApp);
});

export const showAuthTabsAtom = atom(
  (get) => get(appAtom).showAuthTabs,
  (get, set, data: boolean) => {
    const prev = get(appAtom);
    return set(appAtom, { ...prev, showAuthTabs: data });
  }
);

export const openNavDrawerAtom = atom(
  (get) => get(appAtom).openNavDrawer,
  (get, set, data: boolean) => {
    const prev = get(appAtom);
    return set(appAtom, { ...prev, openNavDrawer: data });
  }
);

export const hasSeenIntroAtom = atom(
  (get) => get(appAtom).hasSeenIntro,
  (get, set, data: boolean) => {
    const prev = get(appAtom);
    return set(appAtom, { ...prev, hasSeenIntro: data });
  }
);
