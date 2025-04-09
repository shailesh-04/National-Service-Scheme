import { create } from "zustand";

type AlertStoreType = {
    alert: string | null;
    type: "success" | "error" | "info" | "warn";
    setAlert: (alert: string, type?: "success" | "error" | "info" | "warn") => void;
    clearAlert: () => void;
};

const useAlert = create<AlertStoreType>()((set) => ({
    alert: null,
    type: "info",
    setAlert: (alert, type = "error") => {
        set({ alert, type });
    },
    clearAlert: () => {
        set({ alert: null, type: "info" });
    },
}));

export default useAlert;
