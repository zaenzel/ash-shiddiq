import { create } from 'zustand';

export type ModalType = 
  'NAVIGATION_MODAL' | 
  // 'DELETE_CONFIRM' | 
  'ADD_FINANCIAL_RECORD' | 
  'GET_FINANCIAL_RECORD' | 
  'UPDATE_FINANCIAL_RECORD' | 
  'DELETE_FINANCIAL_RECORD' | 
  null; // Tambahkan tipe modal di sini

interface ModalStore {
  type: ModalType;
  isOpen: boolean;
  data: any;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  openModal: (type, data = {}) => set({ isOpen: true, type, data }),
  closeModal: () => set({ isOpen: false, type: null }),
}));