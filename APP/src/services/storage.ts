import { api } from "./apiinterceptors";

export interface StorageType {
    id: number;
    whyuse: string;
    value: string;
}
export interface StorageImagesType {
    id: number;
    E_id: number;
    imageurl: string;
}
export const getGallery = async (callback: (res: any | null, err: string | null) => void) => {
    try {
        const response = await api.get<any>("/storage/whyuse/image-gallery");
        callback(response.data.images.length?response.data:null, null);
    } catch (error) {
        console.error("Error fetching gallery:", error);
        callback(null, "Data Not Found");
    }
};

export const updateValue = async (body:string,callback: (res: any | null, err: string | null) => void) => {
    try {
        const response = await api.put<any>("/storage/whyuse/image-gallery",{value:body});
        callback("SUccessfuly Update",null);
    } catch (error) {
        console.error("Error fetching gallery:", error);
        callback(null, "Data Not Found");
    }
};

