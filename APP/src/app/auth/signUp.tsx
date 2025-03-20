import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Theme } from "@constants/Colors";
import { useRouter } from "expo-router";
import Button from "@components/ui/button";
import { signup, sendOTP } from "@services/auth";
import useAlert from "@store/useAlert";
import { useUserStore } from "@store/useUserStore";
import { width } from "#/src/constants/Dimention";

export default function SignUpScreen() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [errors, setErrors] = useState({});

    const setAlert = useAlert((e) => e.setAlert);
    const setUser = useUserStore((state) => state.setUser);

    // Validation function
    const validateInputs = () => {
        let newErrors = {};

        if (name.length < 3) newErrors.name = "Name must be at least 3 characters";
        if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email address";
        if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (confirmPassword !== password) newErrors.confirmPassword = "Passwords do not match";
        if (phone)
            if(phone.length != 10) 
            newErrors.phone = "Phone number must be 10 digits";
        if (otp && otp.length !== 6) newErrors.otp = "OTP must be 6 digits";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateInputs()) return;

        signup(
            { name, email, password, phone, otp },
            (res, err) => {
                if(err) {
                    setAlert(String(err),"error");
                } else if (res) {
                    setAlert("You are successfully signed up!", "success");
                    setUser(res.data, res.token);
                    router.replace("/screen/(tabs)");
                }
            }
        );
    };

    const sendEmailOtp = () => {
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors((prev) => ({ ...prev, email: "Enter a valid email first" }));
            return;
        }

        sendOTP({ email }, (res, err) => {
            if (err) {
                setAlert(err,"error");
                return;
            }
            setAlert(String(res),"success");
        });
    };

    return (
        <View style={Theme} className="flex-1 bg-[--bg-color] items-center px-6">
            <Image
                source={require("@assets/img/logo.png")}
                style={{ width: "70%", height: "30%", marginBottom: 24 }}
                resizeMode="contain"
            />
            <Text className="text-[--primary-color] text-2xl font-bold mb-4">Sign Up</Text>

            <TextInput
                className="w-full p-3 border border-[--accent-color] mt-2 rounded-lg text-[--text-color]"
                placeholder="Name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
            />
            {errors.name && <Text className="text-red-500 w-full">{errors.name}</Text>}

            <TextInput
                keyboardType="email-address"
                className="w-full p-3 border border-[--accent-color] mt-2 rounded-lg text-[--text-color]"
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
            />
            {errors.email && <Text className="text-red-500 w-full">{errors.email}</Text>}

            {/* Password & Confirm Password in the same row */}
            <View className=" flex-row space-x-2" style={{width:width-50}}>
                <TextInput
                    secureTextEntry
                    className=" p-3 border border-[--accent-color] mt-2 rounded-lg text-[--text-color]"
                    placeholder="Password"
                    placeholderTextColor="#888"
                    value={password}
                    onChangeText={setPassword}
                    style={{width:(width-60)/2}}
                />
                <TextInput
                    secureTextEntry
                    className=" p-3 border border-[--accent-color] mt-2 rounded-lg text-[--text-color]"
                    placeholder="Confirm Password"
                    placeholderTextColor="#888"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={{width:(width-60)/2}}
                />
            </View>
            {errors.password && <Text className="text-red-500 w-full">{errors.password}</Text>}
            {errors.confirmPassword && <Text className="text-red-500 w-full">{errors.confirmPassword}</Text>}

            <TextInput
                className="w-full p-3 border border-[--accent-color] mt-2 rounded-lg text-[--text-color]"
                placeholder="Phone"
                placeholderTextColor="#888"
                value={phone}
                onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                    if (numericValue.length <= 10) {
                        setPhone(numericValue);
                    }
                }}
                keyboardType="numeric"
                maxLength={10}
            />
            {errors.phone && <Text className="text-red-500 w-full">{errors.phone}</Text>}

            <View className="w-full flex-row items-center">
                <TextInput
                    className="flex-1 p-3 border border-[--accent-color] mt-2 rounded-lg text-[--text-color]"
                    placeholder="Enter OTP"
                    placeholderTextColor="#888"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="numeric"
                    maxLength={6}
                />
                <TouchableOpacity className="ml-2 p-3 bg-[--main-color] mt-2 rounded-lg" onPress={sendEmailOtp}>
                    <Text className="text-white">Send OTP</Text>
                </TouchableOpacity>
            </View>
            {errors.otp && <Text className="text-red-500 w-full">{errors.otp}</Text>}

            <Button className="mt-4" onPress={handleSubmit} disabled={Object.keys(errors).length > 0}>
                Create Account!
            </Button>

            <View className="flex-row mt-4">
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.replace("/auth/signIn")}>
                    <Text className="text-[--main-color] font-semibold">Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
