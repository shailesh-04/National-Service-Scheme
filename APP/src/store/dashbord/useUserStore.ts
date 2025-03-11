import { create } from "zustand";

export interface UserType {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role?: "1" | "2" | "3" | "a";
    about?: string;
    password:string;
    is_deleted?: boolean;
    img?: string;
}

type UserStoreType = {
    users: UserType[];
    setUsers: (users: UserType[]) => void;
    addUser: (user: UserType) => void;
    updateUser: (id: number, field: keyof UserType, value: any) => void;
    removeUser: (id: number) => void;  // ✅ Ensure `removeUser` is in the type de
    getUser:(userId:number)=>UserType|null;
    clearUsers: () => void;
};

export const useUserStore = create<UserStoreType>((set,get) => ({
    users: [],
    setUsers: (users) => {
        set(() => ({ users }));
    },

    addUser: (user) => {
        set((state) => {
            if (state.users.some((u) => u.id === user.id)) return state;
            return { users: [...state.users, user] };
        });
    },

    updateUser: (id, field, value) => {
        set((state) => ({
            users: state.users.map((user) =>
                user.id === id ? { ...user, [field]: value } : user
            ),
        }));
    },

    removeUser: (id) => {  // ✅ Corrected function definition
        set((state) => ({
            users: state.users.filter((user) => user.id !== id),
        }));
    },
    getUser: (userId: number): UserType | null=> {
        const state = get(); 
        console.log(state.users.find((user) => user.id == userId) || null)
        return state.users.find((user) => user.id == userId) || null;
    },

    clearUsers: () => {
        set(() => ({ users: [] }));
    },
}));
