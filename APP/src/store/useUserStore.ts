import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
//import { mmkvStore,storage } from "./storage"; // Make sure this is correctly configured

export interface UserType {
    id: number; 
    name: string; 
    email: string; 
    phone?: string; 
    role?: "1" | "2" | "3" | "a"; 
    about?: string;
    img?: string;
}

type UserStoreType = {
    user: UserType | null;
    setUser: (user: UserType, token: string) => void;
    setUserOnly: (user: UserType) => void;
    //setToken: (token: string) => void;
    clearUser: () => void;
};

export const useUserStore = create<UserStoreType>()(
    //persist(
        (set) => ({
            user: null,
            setUser: (user, token) => {
                set({ user });
                //mmkvStore.set("accessToken", token); // Correct MMKV method
            },
            setUserOnly: (user) => {
                set({ user });
            },
            //setToken: (token) => {mmkvStore.set("accessToken", token);},
            clearUser: () => {
                set({ user: null });
                //mmkvStore.delete("accessToken"); // Correct MMKV method
            },
        }),
    //     {
    //         name: "user-storage",
    //         storage: createJSONStorage(() => storage), // Wrap MMKV correctly
    //     }
    // )
);
