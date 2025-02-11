import { View, Text, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { useEffect} from 'react';
import {Theme} from '@/constants/Colors';
import { useRouter } from 'expo-router';
import logo from "@assets/img/logo.png";
export default function HomeScreen() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(()=>{
      router.push("/auth/signIn");
    },2000)
  },[])
  

  return (
    <View style={Theme} className='bg-[--primary-color] flex-1 items-center justify-center px-10'>
      {/* Logo */}
      <Image source={logo}  resizeMode="contain"/>

      {/* Welcome Message */}
      <Text className=' text-[--bg-color] text-4xl font-black mt-7 mb-5 '>Welcome to NSS</Text>
      <Text className='text-[--accent-color] font-bold' >
        Join hands for social service and national development.
      </Text>
    </View>
  );
}
