import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "@components/Header";
import UploadProfileImage from "@components/UploadProfileImahe";
import EditProfileHeader from "@components/EditProfileHeader";
import { LinearGradient } from "expo-linear-gradient";
import { ProfileEdit, ProfileFormType, EditProfileImage } from "@services/user";
import { useUserStore} from "@store/useUserStore";
import useAlert from "@store/useAlert";
import Animated, { FadeInUp } from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
import Button from "#/src/components/ui/button";

export const Color = {
    "main-color": "#4A43EC",
    "bg-color": "#F5F7FA",
    "text-color": "#212121",
    "light-dark-color": "#888",
    "second-color": "#F0635A",
    "gradient-start": "#4A43EC",
    "gradient-end": "#2D2B7A",
    "card-bg": "#FFFFFF",
};

const profileSchema = yup.object().shape({
    name: yup.string().required("Please enter your full name"),
    email: yup.string().email("Enter a valid email address").required("Email is required"),
    phone: yup.string().matches(/^(?:[0-9]{10,15})?$/, "Enter a valid phone number"),
    password: yup.string().matches(/^$|^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must be at least 6 characters and include both letters and numbers"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords do not match"),
});
const UpdateProfile = () => {
    const setAlert = useAlert((e) => e.setAlert);
    const { updateUserField,user } = useUserStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [updated, setUpdated] = useState<boolean>(true);
    const [image, setImage] = useState<any | null>(null);
    
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormType>({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        setImage(user?.img ? user?.img : "");
    }, []);
    const Edit = (data:ProfileFormType)=>{
        ProfileEdit(data, user?.id, (res, err) => {
            setLoading(false);
            if (err) {
                setAlert(err, "error");
                return;
            }
            updateUserField("name",data.name);
            updateUserField("email",data.email);
            updateUserField("phone",data.phone);
            setAlert(res, "success");
            
        });
    }
    const onSubmit = async (data: ProfileFormType) => {
        setLoading(true);
        if (image === user?.img) {
            Edit(data);
        } else {
            const formData = new FormData();
            formData.append("image", { uri: image, type: "image/jpeg", name: "upload.jpg" } as any);
            EditProfileImage(formData, user?.id, (res, err) => {
                setLoading(false);
                if (err) {
                    setAlert(err, "error");
                    return;
                }
                setAlert(res, "success");
                Edit(data);
                updateUserField("img",image);
            });
        }
    };

    return (
        <ScrollView className="flex-1" style={{ backgroundColor: Color["bg-color"] }}>
            <Header />
            <EditProfileHeader updates={updated}/>
            <UploadProfileImage image={image} setImage={setImage} />
            <View className="px-6 mt-4">
                {["name", "email", "phone", "password", "confirmPassword"].map((field, index) => (
                    <Animated.View entering={FadeInUp.duration(500)} key={field} className="mb-4">
                        <Text className="text-gray-700 font-medium mb-1">{field.replace(/([A-Z])/g, " $1").trim()}</Text>
                        <Controller
                            control={control}
                            name={field as keyof ProfileFormType}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    value={value}
                                    onChangeText={(text) => {
                                        onChange(text); 
                                        setUpdated(false); // Set updated to false when user changes any field
                                    }}
                                    secureTextEntry={field.includes("password")}
                                    placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                                    className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
                                />
                            )}
                        />
                        {errors[field as keyof ProfileFormType] && (
                            <Text className="text-red-500 text-sm mt-1">{errors[field as keyof ProfileFormType]?.message}</Text>
                        )}
                    </Animated.View>
                ))}
            </View>
            {loading ? (
                <ActivityIndicator size="large" color={Color["main-color"]} style={{ marginTop: 20 }} />
            ) : (
                <Button onPress={handleSubmit(onSubmit)} className="w-[70%] m-auto mt-10">
                    Update Profile
                </Button>
            )}
        </ScrollView>
    );
};

export default UpdateProfile;
