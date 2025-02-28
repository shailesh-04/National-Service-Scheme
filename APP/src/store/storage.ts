import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
    id: "user-storage", // Use a proper unique ID
    encryptionKey: "your-secure-key" // Consider fetching securely
});

export const mmkvStore = {
    setItem: (key: string, value: string) => {
        storage.set(key, value);
    },
    getItem: (key: string) => {
        return storage.getString(key) ?? storage.getNumber(key) ?? storage.getBoolean(key) ?? null;
    },
    removeItem: (key: string) => {
        storage.delete(key);
    }
};
