//IMPORTS

import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { RoomScreen } from "./RoomScreen";
//

//HOMESCREEN FUNCTION
export default function HomeScreen({ navigation }) {
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { height, width } = useWindowDimensions();
  // const navigation = useNavigation();

  //USEEFFECT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setData(response.data);
        // console.log("response.data :", response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        const message = error.response.data.error;
        if (statusCode === 400) {
          setError(message);
        }
      }
    };
    fetchData();
  }, []);

  //RETURN

  return isLoading === true ? (
    <ActivityIndicator />
  ) : (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 24 }}>{item.title}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Room", {
                    roomId: item._id,
                  });
                }}
              >
                <Image
                  source={{ uri: item.photos[0].url }}
                  style={{
                    width: 0.9 * width,
                    height: 0.3 * height,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
              <Text>{item.price} €</Text>
              <Text style={{ width: 0.9 * width, textAlign: "justify" }}>
                {item.description}
              </Text>
            </View>
          );
        }}
      />

      {/* <Text>Welcome home!</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      /> */}
    </View>
  );
}

//STYLE
const styles = StyleSheet.create({
  photoContainer: {},
});
