import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
export interface EventUserProps  {
    id:    number;
    name:string;
    email: string;
    phone: string;
    role: string;
    img: string;
}
export const fetchUser = (id : number ,res: (data: EventUserProps[], error: string) => void): void => {
    axios.get<EventUserProps[]>(`${API_URL}/user/event/${id}`)
        .then((responce) => {
            res(responce.data, '');
        }) 
        .catch(error => {
            console.error("Error fetching events:", error);
            res([], 'NetWork ERORR :_-^-_:'+error.data); // Error case
        });
};

