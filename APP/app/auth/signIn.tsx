import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Colors from '@/constants/Colors';
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
    <View style={Colors} className="flex-1 bg-[--bg-color] items-center justify-center px-6">

      <Image source={logo} className="w-200 h-200 mb-6" resizeMode="contain" />

      <Text className="text-[--primary-color] text-2xl font-bold mb-4">Sign In</Text>
      
      <TextInput className="w-full p-3 mb-4 border border-[--accent-color] rounded-lg text-[--text-color]" placeholder="Email" placeholderTextColor="#888" value={email} onChangeText={setEmail} />

      <TextInput className="w-full p-3 mb-4 border border-[--accent-color] rounded-lg text-[--text-color]" placeholder="Password" placeholderTextColor="#888" secureTextEntry value={password} onChangeText={setPassword} />
      <Button onPress={handleSubmit}>LogIn</Button>

      <TouchableOpacity className=' justify-start mb-5 w-full items-end'>
        <Text className=' text-blue-400 '>Forgate Password</Text>
      </TouchableOpacity>

     
      <TouchableOpacity onPress={()=>{
        router.push("/auth/signUp");
      }}>
        <Text className="text-[--secondary-color] border-b p-0 border-[--secondary-color]">Don’t have an account? Sign Up</Text>
      </TouchableOpacity>

    </View>
  );
}
