import { create } from 'zustand';

type ProductState = {
    openCreateBusinessProduct: boolean;
    openEditBusinessProduct: boolean;
    openDeleteBusinessProduct: boolean;
    selectedProductId?: string | null;
    setOpenCreateBusinessProduct: (open: boolean) => void;
    setOpenEditBusinessProduct: (open: boolean) => void;
    setOpenDeleteBusinessProduct: (open: boolean) => void;
    setSelectedProductId: (value?: string | null) => void;
};

export const useProductStore = create<ProductState>((set) => ({
    openCreateBusinessProduct: false,
    openEditBusinessProduct: false,
    openDeleteBusinessProduct: false,
    selectedProductId: null,
    setOpenCreateBusinessProduct: (open) => set({ openCreateBusinessProduct: open }),
    setOpenEditBusinessProduct: (open) => set({ openEditBusinessProduct: open }),
    setOpenDeleteBusinessProduct: (open) => set({ openDeleteBusinessProduct: open }),
    setSelectedProductId: (value) =>  set({ selectedProductId: value })
}));
