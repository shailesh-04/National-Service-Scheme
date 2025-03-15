import { api } from "../apiinterceptors";
const BASE_URL = "nss_store"; 
export interface NSSStoreItem {
  id?: number;
  item_name: string;
  number_of_items: number;
  created_at?: string;
  updated_at?: string;
}
export const fetchItems = async (): Promise<NSSStoreItem[]> => {
  try {
    const response = await api.get<NSSStoreItem[]>(BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch items");
  }
};

export const fetchItemById = async (id: number): Promise<NSSStoreItem> => {
  try {
    const response = await api.get<NSSStoreItem>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch item");
  }
};

export const createItem = async (item: NSSStoreItem): Promise<NSSStoreItem> => {
  try {
    const response = await api.post<NSSStoreItem>(BASE_URL, item);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create item");
  }
};

// Update an existing item
export const updateItem = async (
  id: number,
  item: NSSStoreItem
): Promise<NSSStoreItem> => {
  try {
    const response = await api.put<NSSStoreItem>(`${BASE_URL}/${id}`, item);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update item");
  }
};
export const deleteItem = async (id: number): Promise<void> => {
  try {
    await api.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw new Error("Failed to delete item");
  }
};
