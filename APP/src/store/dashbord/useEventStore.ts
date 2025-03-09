import { create } from "zustand";

export interface EventsType {
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
    events: EventsType[];  // Store multiple events as an array
    setEvents: (events: EventsType[]) => void;
    addEvent: (event: EventsType) => void;
    getEvent : (id:number)=>EventsType | null;
    updateEvent: (id: number, field: keyof EventsType, value: any) => void;
    removeEvent: (id: number) => void;
    clearEvents: () => void;
};

export const useEventStore = create<EventStoreType>((set,get) => ({
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
     getEvent: (Id: number): EventsType | null=> {
            const state = get(); 
            return state.events.find((event) => event.id === Id) || null;
        },
    
    clearEvents: () => {
        set({ events: [] });
    },
}));
