import React, { createContext, useContext, useState, ReactNode } from "react";

interface Event {
    id: number;
    name: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    numOFUser: number;
    image: string;
    created_by: number;
}

interface EventContextType {
    event: Event | null;
    setEventData: (event: Event) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

interface EventProviderProps {
    children: ReactNode;
}

export const EventProvider = ({ children }: EventProviderProps) => {
    const [event, setEvent] = useState<Event | null>(null);

    const setEventData = (event: Event) => {
        setEvent(event);
    };

    return (
        <EventContext.Provider value={{ event, setEventData }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvent = (): EventContextType => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEvent must be used within an EventProvider");
    }
    return context;
};
