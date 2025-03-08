import { create } from "zustand";

export interface EventType {
    id: number;
    name: string;
    description?: string;
    location?: string;
    start_time: string; 
    end_time: string;
    numOFUser?: number;
    image?: string;
    created_by?: number;
    is_deleted?: boolean;
}

type EventStoreType = {
    events: EventType[];  // Store multiple events as an array
    setEvents: (events: EventType[]) => void;
    addEvent: (event: EventType) => void;
    updateEvent: (id: number, field: keyof EventType, value: any) => void;
    removeEvent: (id: number) => void;
    clearEvents: () => void;
};

export const useEventStore = create<EventStoreType>((set) => ({
    events: [],
    
    setEvents: (events) => {
        set({ events });
    },

    addEvent: (event) => {
        set((state) => ({ events: [...state.events, event] }));
    },

    updateEvent: (id, field, value) => {
        set((state) => ({
            events: state.events.map((event) =>
                event.id === id ? { ...event, [field]: value } : event
            ),
        }));
    },

    removeEvent: (id) => {
        set((state) => ({
            events: state.events.filter((event) => event.id !== id),
        }));
    },

    clearEvents: () => {
        set({ events: [] });
    },
}));
