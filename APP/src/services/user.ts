import { publicApi } from "./apiinterceptors";
export interface EventUserProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    img: string;
}
export const fetchUser = (id: string, res: (data: EventUserProps[], error: string) => void): void => {
    publicApi.get<EventUserProps[]>(`/user/event/${id}`)
        .then((responce) => {
            res(responce.data, '');
        })
        .catch(error => {
            console.log("Error fetching events:", error);
            res([], 'NetWork ERORR :_-^-_:' + error.data); // Error case
        });
};
