import { create } from 'zustand';

type DockNavigationState = {
    activeSection: string;
    setActiveSection: (value: string) => void;
};

export const useDockNavigationStore = create<DockNavigationState>((set) => ({
    activeSection: 'businesses',
    setActiveSection: (value) => set({ activeSection: value })
}));
