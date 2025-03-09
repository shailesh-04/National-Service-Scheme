import { api } from "../apiinterceptors";
import { EventType } from "../event";

export const DeleteEvent = async (id: number | undefined, res: (data: any, error: string) => void) => {
    api.delete<any>(`/event/${id}`)
        .then((responce) => {
            res(responce.data, '');
        })
        .catch(error => {
            console.log("Update", error);
            res([], error?.response?.data?.message || "Check Your Network"); // Error case
        });
};
export const Restore = async (id: number | undefined, res: (data: any, error: string) => void) => {
    api.get<any>(`event/restore/${id}`)
        .then((responce) => {
            res(responce.data, '');
        })
        .catch(error => {
            console.log("Update", error);
            res([], error?.response?.data?.message || "Check Your Network"); // Error case
        });
};

export const createEvent = async (
    data: any,
    res: (data: any, error: string) => void
) => {
    api.post<any>(`event/dashbord/`,data,{
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then((response) => {
            res(response.data, "");
        })
        .catch((error) => {
            console.log("Update Error:", error);
            res([], error?.response?.data?.message || "Check Your Network"); // Handle errors
        });
};

export const editEvent = async (id:number,data: any,res: (data: any, error: string) => void) => {
    api.put<any>(`event/dashbord/${id}`,data,{
        headers: { "Content-Type": "multipart/form-data" }
    })
        .then((response) => {
            res(response.data, "");
        })
        .catch((error) => {
            console.log("Update Error:", error);
            res([], error?.response?.data?.message || "Check Your Network"); // Handle errors
        });
};
