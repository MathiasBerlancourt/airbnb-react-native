import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";

export const AroundMeScreen = () => {
  const [userCoord, setUserCoord] = useState();
  const [arrayOfMarkers, setArrayOfMarkers] = useState();
  const [latitude, setLatidude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();
  const [data, setData] = useState();
  // useEffect(() => {
  //   const getMarkers = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
  //       );
  //       setData(response.data);
  //       console.log("data : ", data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       const message = error.response.data.error;
  //       if (statusCode === 400) {
  //         setError(message);
  //       }
  //     }
  //   };
  //   getMarkers();
  // }, []);
  // const markersCreation = (data) => {
  //   const newTab = [];
  //   for (let index = 0; index < data.length; index++) {
  //     const marker = data[index];

  //     const object = {
  //       id: index,
  //       latitude: marker.location[1],
  //       longitude: marker.location[0],
  //       title: marker.title,
  //       description: marker.description,
  //     };
  //     newTab.push(object);
  //   }
  //   return newTab;
  // };
  // if (isLoading === true) {
  //   console.log("requete en cours ...");
  // }
  // const markers = markersCreation(data);

  // [
  //   {
  //     id: 1,
  //     latitude: 48.8564449,
  //     longitude: 2.4002913,
  //     title: "Le Reacteur",
  //     description: "La formation des champion·ne·s !",
  //   },
  // ];

  //useEFFECT
  useEffect(() => {
    const getPermission = async () => {
      try {
        //PERMISSION
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        if (status === "granted") {
          console.log("On passe à la suite");
          // COORDONNEES ACTUELLES
          const location = await Location.getCurrentPositionAsync();
          console.log(location);
          setLatidude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setIsLoading(false);
        } else {
          alert(
            "Si vous refusez l’accès à votre localisation, l’application ne pourra pas personnaliser vos recherches cartographiques et vous proposer des locations près de votre pôsition. Vous pouvez modifier votre choix à tout moment dans les paramètres ⚙️ de votre appareil"
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPermission();
  }, []);
  return (
    <View>
      {isLoading === true ? (
        <ActivityIndicator />
      ) : (
        <View>
          <MapView
            style={{ height: 600, width: 400 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.04,
            }}
            showsUserLocation={true}
          >
            {/* {markers.map((marker) => {
              return (
                <Marker
                  key={marker.id}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.title}
                  description={marker.description}
                />
              );
            })} */}
          </MapView>
        </View>
      )}
    </View>
  );
  // return (
  //   <View>
  //     <Text>test</Text>
  //   </View>
  // );
  return (
    <View>
      {isLoading === true}? <ActivityIndicator /> :
      <View>
        <MapView
          style={{ height: 600, width: 400 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.04,
          }}
          showsUserLocation={true}
        >
          {markers.map((marker) => {
            return (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
                description={marker.description}
              />
            );
          })}
        </MapView>
      </View>
    </View>
  );
};
