import { View, Text, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import logo from "@assets/img/logo.png";
export default function HomeScreen() {

  
  const router = useRouter();
  return (
    <View style={Colors} className='bg-[--primary-color] flex-1 items-center justify-center px-10'>
      {/* Logo */}
      <Image source={logo}  resizeMode="contain"/>

      {/* Welcome Message */}
      <Text className=' text-[--bg-color] text-4xl font-black mt-7 mb-5 '>Welcome to NSS</Text>
      <Text className='text-[--accent-color] font-bold' >
        Join hands for social service and national development.
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity className='w-full bg-[--secondary-color] items-center p-4 rounded-lg mt-10'
      onPress={()=>{
        router.push('/auth/signIn');
      }}>
        <Text className='text-[--accent-color] text-2xl font-semibold'>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
