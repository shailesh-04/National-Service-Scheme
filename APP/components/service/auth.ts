import axios from "axios";
import { Alert } from "react-native";
const API_URL = "http://192.168.43.2:3000"; // For Android Emulator


type signupProps = {
    name: string, 
    email: string,
    password:string,
    phone:string,
}
export async function signup(data:signupProps) {
    axios.post(`${API_URL}/api/user/signup`,data)
    .then(response => {
        console.log('Success:', response.data);
        Alert.alert('Form submitted successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        Alert.alert(error.response.data);
    });
}