import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  FlatList,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import axios from "axios";

export const RoomScreen = ({ route }) => {
  const roomId = route.params.roomId;

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${roomId}`
        );
        setData(response.data);
        // console.log("response.data:", response.data);

        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return isLoading === true ? (
    <ActivityIndicator />
  ) : (
    // <Button title="log" onPress={() => console.log(data.photos)} />

    <>
      <Text>testtt</Text>
      <FlatList
        data={data.photos}
        renderItem={({ item }) => {
          return (
            <View>
              <Image
                // style={styles.imageRoom}
                source={{ uri: item.url }}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                }}
              />
              <Text>{item.url}</Text>
              <Text>Hello</Text>
            </View>
          );
        }}
      />
    </>

    // <FlatList
    // data={response.data.photos}
    // renderItem={({Item})=><View>
    // <Image source={Item.photos.url}/>}
  );
};

// const styles = StyleSheet.create({
//   imageRoom: {
//     resizeMode: "contain",
//   },
// });
