
import { api,ExpireApi } from "./apiinterceptors";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

type signupProps = {
    name: string,
    email: string,
    password: string,
    phone: string,
    otp:string;
}
export async function signup(data: signupProps, res: (res: any, error: string|null) => void) {
    api.post<SigninMainType>("/user/signup", data) // Fixed typo in endpoint
        .then((response) => {
            res(response.data, null); // Extracting `response.data`
        })
        .catch(error => {
            res(null, ( error.response?.data?.message));
        });
}
interface ForgatePasswordType{
    email:string;
    password:string;
    otp:string;
}
export async function forgotPassword(data:ForgatePasswordType, res: (res: any, error: string|null) => void) {
    api.put<any>("/user/editPassword",data)
        .then((response) => {
            console.log(response);
            res(response.data?.message , null);
        })
        .catch(error => {
            res(null,(error.response?.data?.message));
        });
}
interface SendOTPType{
    email:string;
    use?:string;
}
export async function sendOTP(data:SendOTPType, res: (res: any, error: string) => void) {
    api.post<any>("/user/sendOTP", data)
        .then((response) => {
            res(response.data?.message , "");
        })
        .catch(error => {
            
            res(null,error.response.data.message ||"error in send otp!");
        });
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
        .then((response) => {
            res(response.data, '');
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
            res(null, 'Invalid User: ' + (error.response?.data?.message));
        });
};

export const verifyUser = (res: (data: SigninType[] | null, error: string | null, status?: number) => void): void => {
    api.get<SigninType[]>("/user/singin") // Fixed typo in endpoint
        .then((response) => {
            res(response.data, null); // Extracting `response.data`
        })
        .catch(error => {

            res(null, (error.response?.data?.message || error.message), error.status);
        });
} 