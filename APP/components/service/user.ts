import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
 
export const fetchUser = (res: (data: EventType[], error: string) => void): void => {
    axios.get<EventType[]>(`${API_URL}/event/upcoming`)
        .then((responce) => {
            res(responce.data, ''); // Success case
        }) 
        .catch(error => {
            console.error("Error fetching events:", error);
            res([], 'NetWork ERORR :_-^-_'); // Error case
        });
};

