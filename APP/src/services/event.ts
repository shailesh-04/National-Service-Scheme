import { api } from "./apiinterceptors";
import { EventsType } from "@store/dashbord/useEventStore";
export interface EventType {
    id: number;
    name: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    numOFUser: number;
    image: string;
    created_by: string;
}
const handleRequest = async <T>(endpoint: string, res: (data: T[], error: string) => void): Promise<void> => {
    try {
        const response = await api.get<T[]>(endpoint);
        res(response.data, '');
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || "Check Your Network";
        res([], errorMessage);
    }
};

// Fetch upcoming events
export const fetchUpcomingEvents = async (res: (data: EventType[], error: string) => void):Promise<any> => {
    handleRequest<EventType>("/event/upcoming", res);
};

// Fetch all events
export const allEvent = (res: (data: EventType[], error: string) => void): void => {
    handleRequest<EventType>("/event/", res);
};

// Fetch single event by ID
export const fetchEvent = (id: number, res: (data: EventType[], error: string) => void): void => {
    handleRequest<EventType>(`/event/${id}`, res);
};


export const fetchAllEvent = (res: (data: EventsType[], error: string) => void): void => {
    handleRequest<EventsType>(`/event/dashbord`, res);
};


