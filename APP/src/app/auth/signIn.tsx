import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image ,ActivityIndicator} from "react-native";
import { Theme } from "@/constants/Colors";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";
import { signin } from "@services/auth";
import { useUserStore } from "@store/useUserStore";
import useAlert from "@store/useAlert";

export default function SignInScreen() {

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null); // General error state
    const [emailError, setEmailError] = useState<string | null>(null); // Email validation error
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const setAlert = useAlert(s=>s.setAlert);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = () => {
        setLoading(true);
        setError(null);
        setEmailError(null);

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Invalid email format.");
            return;
        }

        signin({ email, password }, (res, err) => {
            setLoading(false);
            if (err) {
                setError("Invalid email or password. Please try again.");
            } else if (res) { 
                setAlert("You Are Succsessfuly SignIn!","success");
                setUser(res.data, res.token);
                router.replace("/screen/(tabs)");
            }
        });
    };    

    return (
        <View
            style={Theme}
            className="flex-1 bg-[--bg-color] items-center px-6 pt-10"
        >
            <Image
                source={require("@assets/img/logo.png")}
                style={{ width: "70%", height: "30%", marginBottom: 24 }}
                resizeMode="contain"
            />
            <Text className="text-[--main-color] text-[19px] font-bold mb-4 w-full">
                Sign in
            </Text>

            {/* Email Input */}
            <TextInput
                className="w-full p-3 mb-3 border border-[--accent-color] rounded-lg text-[--text-color]"
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) setEmailError(null); // Clear error on change
                }}
            />
            {emailError && (
                <Text className="text-red-500 mb-3 text-sm font-medium">
                    {emailError}
                </Text>
            )}

            {/* Password Input */}
            <TextInput
                className="w-full p-3 mb-2 border border-[--accent-color] rounded-lg text-[--text-color]"
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* Error message display */}
            {error && (
                <Text className="text-red-500 mb-3 text-sm font-medium">
                    {error}
                </Text>
            )}

            {/* <TouchableOpacity className="justify-start mb-5 w-full items-end">
                <Text className="text-blue-400">Forgot Password?</Text>
            </TouchableOpacity> */}
            {loading?<ActivityIndicator/>:
            
            <Button onPress={handleSubmit} className="mt-5">SIGN IN</Button>
            }

            <View className="flex-row mt-4">
                <Text>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/auth/signUp")}>
                    <Text className="text-[--main-color] font-semibold">
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                className="mt-10 p-4 font-bold rounded-lg"
                onPress={() => router.push("/screen/(tabs)")}
            >
                <Text>SKIP</Text>
            </TouchableOpacity>
        </View>
    );
}
