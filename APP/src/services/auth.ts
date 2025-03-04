
import { api } from "./apiinterceptors";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

type signupProps = {
    name: string,
    email: string,
    password: string,
    phone: string,
}
export async function signup(data: signupProps) {

}
export interface EventUserProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    img: string;
}
export const fetchUser = (id: string, res: (data: EventUserProps[], error: string) => void): void => {
    api.get<EventUserProps[]>(`/user/event/${id}`)
        .then((responce) => {
            res(responce.data, '');
        })
        .catch(error => {
            console.log("Error fetching events:", error);
            res([], 'NetWork ERORR :_-^-_:' + error.data); // Error case
        });
};
interface SigninType {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role?: "1" | "2" | "3" | "a";
    about?: string;
    img?: string;
}
export interface SigninMainType {
    data: SigninType;
    token: string;
}
interface InfoType {
    email: string;
    password: string;
}

export const signin = (info: InfoType, res: (data: SigninMainType | null, error: string | null) => void): void => {
    api.post<SigninMainType>("/user/singin", info) // Fixed typo in endpoint
        .then((response) => {
            res(response.data, null); // Extracting `response.data`
        })
        .catch(error => {
            res(null, 'Invalid User: ' + (error.response?.data?.message || error.message));
        });
};

export const verifyUser = (res: (data: SigninType[] | null, error: string | null,status?:number) => void): void => {
    api.get<SigninType[]>("/user/singin") // Fixed typo in endpoint
        .then((response) => {
            res(response.data, null); // Extracting `response.data`
        })
        .catch(error => {
            
            res(null,(error.response?.data?.message || error.message), error.status);
        });
} 