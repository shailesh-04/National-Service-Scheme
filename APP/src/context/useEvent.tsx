import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of context data
interface EventContextType {
  eventId: string | null;
  setEventId: (id: string) => void;
  eventExpire: string | null;
  setEventExpire: (status: string) => void;
  
}
const EventContext = createContext<EventContextType | undefined>(undefined);

interface EventProviderProps {
  children: ReactNode;
}
export const EventProvider = ({ children }: EventProviderProps) => {
  const [eventId, setEventId] = useState<string | null>(null);
  const [eventExpire, setEventExpire] = useState<string | null>(null);
  return (
    <EventContext.Provider value={{ eventId, setEventId,eventExpire,setEventExpire }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};
