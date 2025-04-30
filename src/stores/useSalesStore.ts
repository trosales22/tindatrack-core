import { create } from 'zustand';

type SalesState = {
    openCreateBusinessSales: boolean;
    openEditBusinessSales: boolean;
    selectedSalesId?: string | null;
    setOpenCreateBusinessSales: (open: boolean) => void;
    setOpenEditBusinessSales: (open: boolean) => void;
    setSelectedSalesId: (value?: string | null) => void;
};

export const useSalesStore = create<SalesState>((set) => ({
    openCreateBusinessSales: false,
    openEditBusinessSales: false,
    selectedSalesId: null,
    setOpenCreateBusinessSales: (open) => set({ openCreateBusinessSales: open }),
    setOpenEditBusinessSales: (open) => set({ openEditBusinessSales: open }),
    setSelectedSalesId: (value) =>  set({ selectedSalesId: value })
}));
