import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL; // Ensure this is set in your `.env` file
export interface EventType {
    id: number;
    name: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    numOFUser: number;
    image: string;
}
export const fetchUpcomingEvents = (res: (data: EventType[], error: string) => void): void => {
    axios.get<EventType[]>(`${API_URL}/event/upcoming`)
        .then((responce) => {
            res(responce.data, ''); // Success case
        }) 
        .catch(error => {
            console.error("Error fetching events:", error);
            res([], 'NetWork ERORR :_-^-_'); // Error case
        });
};
export const allEvent = (res:(data:EventType[],err:string) => void) :void =>{
    axios.get<EventType[]>(`${API_URL}/event/`)
    .then((responce)=>{
        res(responce.data,'');
    })
    .catch((error)=>{
        console.error("Error fetching events:", error);
        res([],'Check Your Network');
    });
}
