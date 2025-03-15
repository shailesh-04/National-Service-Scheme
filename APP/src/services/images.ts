import { api } from "./apiinterceptors";
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
    api.get<ImageData[]>(`/images/event`)
        .then((responce) => {
            res(responce.data, '');
        }) 
        .catch(error => {
            res([], 'Failed to fetch items'); // Error case
        });
};
interface numOfImageIF {
    numOfRow:number;
}
export const countRows = (res: (data: numOfImageIF[], error: string) => void): void => {
    api.get<numOfImageIF[]>(`/images/countRows`)
        .then((responce) => {
            res(responce.data, '');
        }) 
        .catch(error => {
            res([], 'Failed to fetch items'); // Error case
        });
};

