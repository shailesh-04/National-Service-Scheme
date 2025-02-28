import { publicApi } from "./apiinterceptors";
export interface ImageData {
  id: number;
  imageurl: string;
  E_id: number;
  event_name: string;
}

export interface ImageProps {
  id: number;
  name: string;
  images: ImageData[];
}
export const fetchImages = (res: (data: ImageData[], error: string) => void): void => {
    publicApi.get<ImageData[]>(`/images/event`)
        .then((responce) => {
            res(responce.data, '');
        }) 
        .catch(error => {
            res([], 'Check Your Network'); // Error case
        });
};

