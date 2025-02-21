import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
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
    axios.get<ImageData[]>(`${API_URL}/images/event`)
        .then((responce) => {
            res(responce.data, '');
        }) 
        .catch(error => {
            res([], 'Check Your Network'); // Error case
        });
};

