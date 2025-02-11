import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import {Theme} from '@/constants/Colors';
import Button from '@/components/ui/button';
import { useRouter } from 'expo-router';
import logo from "@assets/img/logo.png"
export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = ()=>{
    
  }
  return (
    <View style={Theme} className="flex-1 bg-[--bg-color] items-center px-6 pt-10">

      <Image source={logo} className="w-80 h-auto mb-6" resizeMode="contain" />

      <Text className="text-[--primary-color] text-[19px] font-bold mb-4  w-full">Sign in</Text>
      
      <TextInput className="w-full p-3 mb-4 border border-[--accent-color] rounded-lg text-[--text-color]" placeholder="Email" placeholderTextColor="#888" value={email} onChangeText={setEmail} />

      <TextInput className="w-full p-3 mb-4 border border-[--accent-color] rounded-lg text-[--text-color]" placeholder="Password" placeholderTextColor="#888" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity className=' justify-start mb-5 w-full items-end'>
        <Text className=' text-blue-400 '>Forgate Password</Text>
      </TouchableOpacity>

      <Button onPress={handleSubmit}>SIGN IN</Button>
    <View className=' flex-row mt-4'>
     <Text className="">Don’t have an account? </Text>
     <TouchableOpacity onPress={()=>{
        router.push("/auth/signUp");
      }}>
        <Text className="text-blue-600">Sign Up</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity className='mt-10 p-4 font-bold rounded-lg  '
    onPress={()=>{
      router.push("/home/(tabs)");
    }}>
      <Text>
        SKIP
      </Text>
    </TouchableOpacity>
     
    </View>
  );
}
