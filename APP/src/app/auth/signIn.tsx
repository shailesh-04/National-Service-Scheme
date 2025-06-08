import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Theme } from "@/constants/Colors";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";
import { signin } from "@services/auth";
import { useUserStore } from "@store/useUserStore";
import useAlert from "@store/useAlert";

// Validation schema
const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required"),
});

type FormData = {
    email: string;
    password: string;
};

export default function SignInScreen() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const setAlert = useAlert((s) => s.setAlert);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        setLoading(true);

        signin(data, (res, err) => {
            setLoading(false);
            if (err) {
                setAlert("Invalid email or password. Please try again.", "error");
            } else if (res) {
                setAlert("You are successfully signed in!", "success");
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
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        className="w-full p-3 mb-2 border border-[--accent-color] rounded-lg text-[--text-color]"
                        placeholder="Email"
                        placeholderTextColor="#888"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                )}
            />
            {errors.email && (
                <Text className="text-red-500 mb-2 text-sm font-medium">
                    {errors.email.message}
                </Text>
            )}

            {/* Password Input */}
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        className="w-full p-3 mb-2 border border-[--accent-color] rounded-lg text-[--text-color]"
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.password && (
                <Text className="text-red-500 mb-2 text-sm font-medium">
                    {errors.password.message}
                </Text>
            )}

            {/* Forgot Password */}
            <TouchableOpacity
                className="justify-start mb-5 w-full items-end"
                onPress={() => router.replace("/auth/forgetPass")}
            >
                <Text className="text-blue-400">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Submit Button */}
            {loading ? (
                <ActivityIndicator />
            ) : (
                <Button onPress={handleSubmit(onSubmit)} className="mt-5">
                    SIGN IN
                </Button>
            )}

            {/* Optional Skip Button */}
            <TouchableOpacity
                className="mt-10 p-4 font-bold rounded-lg"
                onPress={() => router.replace("/screen/(tabs)")}
            >
                <Text>SKIP</Text>
            </TouchableOpacity>
        </View>
    );
}
