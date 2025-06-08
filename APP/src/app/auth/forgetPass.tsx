import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import { Theme } from "@/constants/Colors";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";
import { sendOTP, forgotPassword } from "@services/auth";
import useAlert from "@store/useAlert";

export default function ForgatePassword() {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [otpError, setOtpError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [timer, setTimer] = useState<number>(0); // Countdown timer state

    const router = useRouter();
    const setAlert = useAlert((s) => s.setAlert);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer]);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = () => {
        setLoading(true);
        setError(null);
        setEmailError(null);
        setOtpError(null);
        setPasswordError(null);

        if (!email) {
            setEmailError("Email is required.");
            setLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Invalid email format.");
            setLoading(false);
            return;
        }

        if (!otp) {
            setOtpError("OTP is required.");
            setLoading(false);
            return;
        }

        if (!password || password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            setLoading(false);
            return;
        }

        forgotPassword({ email, password, otp }, (res, err) => {
            setLoading(false);
            if (err) {
                setError("Invalid OTP or email. Please try again.");
            } else if (res) {
                setAlert("Password reset successful!", "success");
                router.replace("/auth/signIn");
            }
        });
    };

    const sendEmailOtp = () => {
        if (!email) {
            setEmailError("Email is required to send OTP.");
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Invalid email format.");
            return;
        }

        sendOTP({ email }, (res, err) => {
            if (err) {
                setAlert("Failed to send OTP. Try again later.\n" + err, "error");
                return;
            }
            setAlert("OTP sent successfully!", "success");
            setTimer(60); // Start 2-minute timer
        });
    };

    return (
        <View style={Theme} className="flex-1 bg-[--bg-color] items-center px-6 pt-10">
            <Image
                source={require("@assets/img/logo.png")}
                style={{ width: "70%", height: "30%", marginBottom: 24 }}
                resizeMode="contain"
            />
            <Text className="text-[--main-color] text-[19px] font-bold mb-4 w-full">
                Reset Password
            </Text>

            {/* Email Input */}
            <TextInput
                className="w-full p-3 mb-3 border border-[--accent-color] rounded-lg text-[--text-color]"
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) setEmailError(null);
                }}
            />
            {emailError && <Text className="w-full text-red-500 mb-3 text-sm font-medium">{emailError}</Text>}

            {/* OTP Input */}
            <TextInput
                className="w-full p-3 mb-3 border border-[--accent-color] rounded-lg text-[--text-color]"
                placeholder="Enter OTP"
                placeholderTextColor="#888"
                value={otp}
                onChangeText={(text) => {
                    setOtp(text);
                    if (otpError) setOtpError(null);
                }}
            />
            {otpError && <Text className="w-full text-red-500 mb-3 text-sm font-medium">{otpError}</Text>}

            {/* OTP Button with Timer */}
            {timer > 0 ? (
                <Text className="text-gray-400 mb-2">Resend OTP in {timer}s</Text>
            ) : (
                <TouchableOpacity className="justify-start mb-5 w-full items-end" onPress={sendEmailOtp}>
                    <Text className="text-blue-400">Send OTP</Text>
                </TouchableOpacity>
            )}

            {/* Password Input */}
            <TextInput
                className="w-full p-3 mb-2 border border-[--accent-color] rounded-lg text-[--text-color]"
                placeholder="New Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) setPasswordError(null);
                }}
            />

            {/* Confirm Password Input */}
            <TextInput
                className="w-full p-3 mb-2 border border-[--accent-color] rounded-lg text-[--text-color]"
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (passwordError) setPasswordError(null);
                }}
            />

            {passwordError && <Text className="w-full text-red-500 mb-3 text-sm font-medium">{passwordError}</Text>}

            {/* Error message display */}
            {error && <Text className="w-full text-red-500 mb-3 text-sm font-medium">{error}</Text>}

            {loading ? (
                <ActivityIndicator />
            ) : (
                <Button onPress={handleSubmit} className="mt-5">
                    RESET PASSWORD
                </Button>
            )}

            <TouchableOpacity className="mt-10 p-4 font-bold rounded-lg" onPress={() => router.replace("/screen/(tabs)")}>
                <Text>SKIP</Text>
            </TouchableOpacity>
        </View>
    );
}
