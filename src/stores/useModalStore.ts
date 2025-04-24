import { create } from 'zustand';

type ModalState = {
    openCreateBusiness: boolean;
    openEditBusiness: boolean;
    openDeleteBusiness: boolean;
    openLogout: boolean;
    setOpenCreateBusiness: (open: boolean) => void;
    setOpenEditBusiness: (open: boolean) => void;
    setOpenDeleteBusiness: (open: boolean) => void;
    setOpenLogout: (open: boolean) => void;
};

export const useModalStore = create<ModalState>((set) => ({
    openCreateBusiness: false,
    openEditBusiness: false,
    openDeleteBusiness: false,
    openLogout: false,
    setOpenCreateBusiness: (open) => set({ openCreateBusiness: open }),
    setOpenEditBusiness: (open) => set({ openEditBusiness: open }),
    setOpenDeleteBusiness: (open) => set({ openDeleteBusiness: open }),
    setOpenLogout: (open) => set({ openLogout: open })
}));
