import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { dechill, imagensita } from '../assets';

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);

  return (
    <SafeAreaView className="bg-white flex-1 relative">
       
      <View className = "flex-row px-6 mt-12 items-center space-x-2">
        <View className = "w-20 h-20 bg-[#233142] rounded-full items-center justify-center">
          <Text className="text-[#ff5754] text-2xl font-semibold">Anda</Text>
        </View>
        <Text className = "text-[#233142] text-3xl font-semibold">Chill</Text>
        <Image source={imagensita} className="w-20 h-20  left-20"/>
      </View>


      {/* segunda seccion */}
      <View className="px-6 mt-8 space-y-3">
        <Text className="text-[#233142] text-[42px]">Simplemente</Text>
        <Text className="text-[#ff5754] text-[38px] font-bold">Disfruta el viaje</Text>

        <Text className="text-[#233142] text-base">
          Loremasdfasd fsadfasdfasdfñasldfasldfñasdfasldfhaskdf
          hlaksdhfkasdhfjkashd
        </Text>
      </View>

      {/** Tercera sección */}
      <View className="w-[400px] h-[400px] bg-[#ff5754] rounded-full absolute bottom-24 -right-36"></View>
      <View className="w-[400px] h-[400px] bg-[#455d7a] rounded-full absolute -bottom-28 -left-36"></View>

      {/** Sección de imagen */}
      <View className="flex-1 relative items-center justify-center">
        <Animatable.Image
        animation="fadeIn"
        easing="ease-in-out"
          source={dechill}
          className="w-full h-full object-cover"
        />
          <TouchableOpacity
          onPress={() => navigation.navigate("Descubre")} className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#ff5754]
           rounded-full items-center justify-center">
              <Animatable.View
                animation={"pulse"}
                easing="ease-in-out"
                iterationCount={"infinite"}
                className="w-20 h-20 items-center justify-center rounded-full bg-[#ff5754]">
                
                <Text className="text-gray-50 text-[40px] font-semibold">Ir</Text>
              </Animatable.View>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;