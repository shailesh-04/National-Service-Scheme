import { api } from "./apiinterceptors";
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
            res([], error?.response?.data?.message || "Check Your Network"); // Error case
        });
};
export const updateProfile = (id: string, res: (data: EventUserProps[], error: string) => void): void => {
    api.get<EventUserProps[]>(`/user/event/${id}`)
        .then((responce) => {
            res(responce.data, '');
        })
        .catch(error => {
            console.log("Update", error);
            res([], error?.response?.data?.message || "Check Your Network"); // Error case
        });
};

export interface ProfileFormType {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    img?: string;
}

export const ProfileEdit = (data: ProfileFormType, id: number | undefined, res: (data: any, error: string) => void): void => {
    api.put<any>(`/user/${id}`, data)
        .then((responce) => {
            res(responce.data, '');
        })
        .catch(error => {
            console.log("Update", error);
            res([], error?.response?.data?.message || "Check Your Network"); // Error case
        });
};


export const EditProfileImage = async (data: any, id: number | undefined, res: (data: any, error: string) => void) => {
    api.put<any>(`/user/image/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then((responce) => {
            res(responce.data, '');
        })
        .catch(error => {
            console.log("Update", error);
            res([], error?.response?.data?.message || "Check Your Network"); // Error case
        });
};

export const singOut = (res: (message:any, error: string) => void): void => {
    api.get<any>(`user/singout`)
        .then((responce) => {
            res(responce?.data?.message , '');
        })
        .catch(error => {
            console.log("Update", error);
            res([], error?.response?.data?.message || "Check Your Network"); // Error case
        });
};