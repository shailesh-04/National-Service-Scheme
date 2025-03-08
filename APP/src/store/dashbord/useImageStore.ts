import { create } from "zustand";

export interface ImageType {
    id: number; 
    imageurl: string; 
    E_id?: number | null; 
    is_deleted: boolean; 
    created_at: string; // Assuming timestamp is stored as a string
}

type ImageStoreType = {
    images: ImageType[];  // Store multiple images as an array
    setImages: (images: ImageType[]) => void;
    addImage: (image: ImageType) => void;
    updateImage: (id: number, field: keyof ImageType, value: any) => void;
    removeImage: (id: number) => void;
    clearImages: () => void;
};

export const useImageStore = create<ImageStoreType>((set) => ({
    images: [],  // Initialize with an empty array
    
    setImages: (images) => {
        set({ images });
    },

    addImage: (image) => {
        set((state) => ({ images: [...state.images, image] }));
    },

    updateImage: (id, field, value) => {
        set((state) => ({
            images: state.images.map((img) =>
                img.id === id ? { ...img, [field]: value } : img
            ),
        }));
    },

    removeImage: (id) => {
        set((state) => ({
            images: state.images.filter((img) => img.id !== id),
        }));
    },

    clearImages: () => {
        set({ images: [] });
    },
}));
