import { MMKV } from "react-native-mmkv";

export const mmkvStore = new MMKV({
  id: "my_secure_store",
  encryptionKey: "your-secret-key", // Ensure secure storage in production
});
export const storage = {
  getItem: (name: string) => {
    const value = mmkvStore.getString(name);

    if (name === "accessToken") return value; // Tokens are plain strings, no need to parse

    try {
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`MMKV JSON parse error for key "${name}":`, error, "Value:", value);
      return null; // Prevent crashing on invalid JSON
    }
  },
  setItem: (name: string, value: any) => {
    if (name === "accessToken") {
      mmkvStore.set(name, value); // Store JWT token as a raw string
    } else {
      mmkvStore.set(name, JSON.stringify(value)); // Convert to JSON before storing
    }
  },
  removeItem: (name: string) => {
    mmkvStore.delete(name);
  },
};
