import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavorites from "../components/NavFavorites";

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        <View>
          <GooglePlacesAutocomplete
            styles={{
              textInput: {
                height: 48,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "black",
                zIndex: 1,
                marginBottom: 5,
              },
              listView: {
                marginTop: 50,
                minHeight: 500,
                zIndex: 1,
              },
            }}
            placeholder="Where From?"
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            returnKeyType="search"
            enablePoweredByContainer={false}
            minLength={2}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            onFail={(error) => console.error("Api error: ", error)}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              dispatch(setDestination(null));
            }}
            fetchDetails={true}
          />
        </View>
      </View>
      <View style={tw`mt-10 ml-5`}>
        <NavOptions />
      </View>
      <View>
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
