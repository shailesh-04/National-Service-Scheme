import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Header from "#/src/components/Header";
import UploadProfileImage from "#/src/components/UploadProfileImahe";
import EditProfileHeader from "#/src/components/EditProfileHeader";
export const Color = {
    "main-color": "#4A43EC",
    "bg-color": "#FFFFFF",
    "text-color": "#212121",
    "light-dark-color": "#999",
    "second-color": "#F0635A",
};
import { updateProfile } from "#/src/services/user";

interface ProfileForm {
    name: string;
    email: string;
    phone: string;
    newPassword?: string;
    confirmPassword?: string;
}

const profileSchema = yup.object().shape({
    name: yup.string().required("Please enter your full name"),
    email: yup
        .string()
        .email("Enter a valid email address")
        .required("Email is required"),
    phone: yup
        .string()
        .matches(/^[0-9]{10,15}$/, "Enter a valid phone number")
        .required("Phone number is required"),
    newPassword: yup
        .string()
        .min(6, "New password must be at least 6 characters")
        .optional(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords do not match")
        .when("newPassword", {
            is: (value: string) => value && value.length > 0,
            then: (schema) => schema.required("Confirm password is required"),
            otherwise: (schema) => schema.notRequired(),
        }),
});

const UpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileForm>({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: "John Doe",
            email: "johndoe@gmail.com",
            phone: "1234567890",
            newPassword: "",
            confirmPassword: "",
            
        },
    });

    const onSubmit = async (data: ProfileForm) => {
        setLoading(true);
        try {
            const response = await axios.post(
                "https://your-api.com/update-profile",
                data
            );
            Alert.alert(
                "Success",
                "Your profile has been updated successfully!"
            );
            console.log(response.data);
        } catch (error) {
            Alert.alert(
                "Error",
                "Failed to update profile. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View
            className="flex-1 gap-2"
            style={{ backgroundColor: Color["bg-color"] }}
        >
            <Header />
            <EditProfileHeader />
            <UploadProfileImage/>
            {[
                { name: "name", label: "Full Name" },
                { name: "email", label: "Email" },
                { name: "phone", label: "Phone Number" },
                { name: "newPassword", label: "New Password", secure: true },
                {
                    name: "confirmPassword",
                    label: "Confirm Password",
                    secure: true,
                },
            ].map((field) => (
                <View key={field.name} className="mb-4 px-6">
                    <Text className="text-gray-700 mb-1 font-medium">
                        {field.label}
                    </Text>
                    <Controller
                        control={control}
                        name={field.name as keyof ProfileForm}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry={field.secure}
                                placeholder={field.label}
                                className="border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-gray-100"
                            />
                        )}
                    />
                    {errors[field.name as keyof ProfileForm] && (
                        <Text className="text-red-500 text-sm mt-1">
                            {errors[field.name as keyof ProfileForm]?.message}
                        </Text>
                    )}
                </View>
            ))}

            {/* Submit Button */}
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color={Color["main-color"]}
                    style={{ marginTop: 20 }}
                />
            ) : (
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={{
                        backgroundColor: Color["main-color"],
                        padding: 10,
                        borderRadius: 8,
                        marginTop: 20,
                    }}
                    className="w-[80%] m-auto"
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 18,
                        }}
                    >
                        Update Profile
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default UpdateProfile;
