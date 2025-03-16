import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    RefreshControl,
} from "react-native";
import {
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    NSSStoreItem,
} from "#/src/services/dashbord/nss_store";
import { Color, Theme } from "#/src/constants/Colors";
import HeaderAdmin from "../HeaderAdmin";
import Icons from "#/src/components/Icons";

const NSSStoreScreen = () => {
    const [items, setItems] = useState<NSSStoreItem[]>([]);
    const [itemName, setItemName] = useState("");
    const [numberOfItems, setNumberOfItems] = useState("");
    const [error, setError] = useState<string | null>("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            setRefreshing(true);
            const data = await fetchItems();
            if (!data.length) setError("No Data Avalable..");
            setItems(data);
        } catch (error) {
            setError(String(error));
        } finally {
            setRefreshing(false);
        }
    };

    const handleSave = async () => {
        if (!itemName || !numberOfItems) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }
        try {
            if (editingId) {
                await updateItem(editingId, {
                    item_name: itemName,
                    number_of_items: Number(numberOfItems),
                });
            } else {
                await createItem({
                    item_name: itemName,
                    number_of_items: Number(numberOfItems),
                });
            }
            setItemName("");
            setNumberOfItems("");
            setEditingId(null);
            loadItems();
        } catch (error) {
            Alert.alert("Error", "Failed to save item");
        }
    };

    const handleEdit = (item: NSSStoreItem) => {
        setItemName(item.item_name);
        setNumberOfItems(item.number_of_items.toString());
        setEditingId(item.id ? item.id : null);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteItem(id);
            loadItems();
        } catch (error) {
            Alert.alert("Error", "Failed to delete item");
        }
    };

    return (
        <>
            <HeaderAdmin />
            <View
                style={Theme}
                className="bg-[--bg-color] flex-1 items-center justify-center p-4"
            >
                <Text className="text-[--text-color] text-xl font-bold mb-4">
                    NSS Store Management
                </Text>

                <TextInput
                    className="w-full bg-[--bg-color] p-3 mb-2 rounded-lg border border-gray-300 shadow-md"
                    placeholder="Item Name"
                    value={itemName}
                    onChangeText={setItemName}
                />

                <TextInput
                    className="w-full bg-[--bg-color] border p-3 mb-2 rounded-lg shadow-md"
                    placeholder="Number of Items"
                    keyboardType="numeric"
                    value={numberOfItems}
                    onChangeText={setNumberOfItems}
                />

                <View className="flex-row w-full justify-evenly items-center">
                    {editingId && (
                        <TouchableOpacity
                            onPress={() => {
                                setEditingId(null);
                                setItemName("");
                                setNumberOfItems("");
                            }}
                            className="p-3"
                        >
                            <Icons.Feather
                                name="x"
                                size={34}
                                color={Color["second-color"]}
                            />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={handleSave}
                        className="bg-[--second-color] p-3 w-[70%] items-center rounded-lg shadow-lg"
                    >
                        <Text className="text-white font-bold">
                            {editingId ? "Update Item" : "Add Item"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {error ? (
                    <Text className="mt-10 text-red-400">{error}</Text>
                ) : (
                    ""
                )}

                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id?.toString() || ""}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={loadItems}
                        />
                    }
                    renderItem={({ item }) => (
                        <View className="w-full bg-[--bg-color] p-4 mb-2 rounded-lg flex-row justify-between items-center shadow-md">
                            <Text className="text-[--text-color] font-semibold">
                                {item.item_name}
                            </Text>

                            <View className="flex-row gap-2">
                                <Text className="text-[--text-color] mr-10 font-semibold">
                                    ({item.number_of_items})
                                </Text>
                                <TouchableOpacity
                                    onPress={() => handleEdit(item)}
                                    className="bg-[--main-color] p-3 rounded-lg shadow-md"
                                >
                                    <Text className="text-white font-bold">
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleDelete(item.id!)}
                                    className="bg-[--second-color] p-3 rounded-lg shadow-md"
                                >
                                    <Text className="text-white font-bold">
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        </>
    );
};

export default NSSStoreScreen;
