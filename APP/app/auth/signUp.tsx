import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Theme, Color } from "@/constants/Colors";
import { useRouter } from "expo-router";
import logo from "@assets/img/logo.png";
import Button from "@/components/ui/button";
import { signup } from "@/components/service/auth";
export default function SignUpScreen() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const handelSubmit = () => {
        signup({
            name: name,
            email: email,
            password: password,
            phone: phone,
        });
    };
    return (
        <View
            style={Theme}
            className="flex-1 bg-[--bg-color] items-center px-6"
        >
            <Image
                source={logo}
                style={{ width: "70%", height: "30%", marginBottom: 24 }}
                resizeMode="contain"
            />
            <Text className="text-[--primary-color] text-2xl font-bold mb-4">
                Sign Up
            </Text>

            <TextInput
                className="w-full p-3 mb-4 border border-[--accent-color] rounded-lg text-[--text-color]"
                placeholder="Name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                keyboardType="email-address"
                className="w-full p-3 mb-4 border border-[--accent-color] rounded-lg text-[--text-color]"
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                keyboardType="visible-password"
                className="w-full p-3 mb-4 border border-[--accent-color] rounded-lg text-[--text-color]"
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TextInput
                className="w-full p-3 mb-4 border border-[--accent-color] rounded-lg text-[--text-color]"
                placeholder="Phone"
                placeholderTextColor="#888"
                value={phone}
                onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                    if (numericValue.length <= 10) {
                        setPhone(numericValue);
                    }
                }}
                keyboardType="numeric" // Ensures numeric keyboard on mobile
                maxLength={10} // Limits input to 10 characters
            />

            <Button className="" onPress={handelSubmit}>
                Create Account!
            </Button>
            <View className=" flex-row mt-4">
                <Text className="">Already have an account? </Text>
                <TouchableOpacity
                    onPress={() => {
                        router.push("/auth/signIn");
                    }}
                >
                    <Text className="text-[--main-color] font-semibold">
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
