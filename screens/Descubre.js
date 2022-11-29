import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Hotels, Attractions, Restaurants, NotFound } from '../assets';
import MenuContainer from '../components/MenuContainer';
import { FontAwesome } from '@expo/vector-icons';
import ItemCartContainer from '../components/ItemCartContainer';
import { getPlacesData } from '../api';

const Descubre = () => {
    const navigation = useNavigation();

    const [type, setType] = useState("restaurants")
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([])
    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then(data => {
            setMainData(data);
            setInterval(() => {
                setIsLoading(false);
            }, 2000);
        })
    }, [bl_lat, bl_lng, tr_lat, tr_lng, type])
  return (
    <SafeAreaView className="flex-1 bg-white relative top-5">
        <View className="flex-row items-center justify-between px-8">
            <View>
                <Text className="text-[40px] text-[#ff5754] font-bold">Discover</Text>
                <Text className="text-[#455d7a] text-[36px]">todoooooooooo</Text>
            </View>

            <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
                <Image
                    source={Avatar}
                    className="w-full h-full rounded-md object-cover"
                />
            </View>
        </View>

        <View className="flex-row items-center bg-white-200 mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
            <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{fields: "geometry"}}
             placeholder='Search'
             fetchDetails={true}
             onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(details?.geometry?.viewport);
                setBl_lat(details?.geometry?.viewport?.southwest?.lat);
                setBl_lng(details?.geometry?.viewport?.southwest?.lng);
                setTr_lat(details?.geometry?.viewport?.northeast?.lat);
                setTr_lng(details?.geometry?.viewport?.northeast?.lng);
             }}
             query={{
                key: 'api google',
                language: 'en',
             }}
            />
        </View>

        {/**Contenedor del menu */}
        {isLoading ? (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0B646B" />
        </View>
         ) : (
        <ScrollView>
        <View className="flex-row items-center justify-between px-8 mt-8">
            <MenuContainer
                key={"hotels"}
                title="Hotels"
                imageSrc={Hotels}
                type={type}
                setType={setType}
            />
            <MenuContainer
                key={"attractions"}
                title="Attractions"
                imageSrc={Attractions}
                type={type}
                setType={setType}
            />
            <MenuContainer
                key={"restaurants"}
                title="Restaurantes"
                imageSrc={Restaurants}
                type={type}
                setType={setType}
            />
        </View>

        <View>
            <View className="flex-row items-center justify-between px-4 mt-8">
                <Text className="text-[#ff5754] text-[28px] font-bold">Sugerencias</Text>
                <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                    <Text className="text-[#f95959] text-[20px] font-bold">
                        Explorar
                    </Text>
                    <FontAwesome name="long-arrow-right" size={24} color="#455d7a" />
                 </TouchableOpacity>
            </View>

            <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
                {mainData?.length > 0 ? (
                    <>
                    {mainData?.map((data, i) => (
                        <ItemCartContainer
                         key={i}
                         imageSrc={
                            data?.photo?.images?.medium?.url 
                                ? data?.photo?.images?.medium?.url 
                                : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                         }
                         title={data?.name}
                         location={data?.location_string}
                         data={data}
                        />

                        ))}
                    </>
                ) : (
                    <>
                        <View className="w-full h-[400px] items-center space-y-8 justify-center">
                            <Image
                                source={NotFound}
                                className=" w-32 h-32 object-cover"
                            />
                            <Text className="text-2xl text-[#f95959] font-semibold">
                                Lo siento, data no encontrada
                            </Text>
                        </View>
                    </>   
                )}
            </View>
        </View>
        
        </ScrollView>
        )}
    </SafeAreaView>
  );
};

export default Descubre;