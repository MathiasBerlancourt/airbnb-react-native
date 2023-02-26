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
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { Dimensions } from "react-native";

export const RoomScreen = ({ route }) => {
  const roomId = route.params.roomId;

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${roomId}`
        );
        setData(response.data);
        console.log("response.data:", response.data);

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
    <View style={styles.flatListContainer}>
      <SwiperFlatList
        index={0}
        showPagination={true}
        data={data.photos}
        renderItem={({ item }) => {
          return (
            <View style={[styles.child, { backgroundColor: item }]}>
              <Image
                // style={styles.imageRoom}
                source={{ uri: item.url }}
                style={{
                  // width: "100%",
                  height: 500,
                  resizeMode: "contain",
                }}
              />
            </View>
          );
        }}
      />
    </View>

    // <FlatList
    // data={response.data.photos}
    // renderItem={({Item})=><View>
    // <Image source={Item.photos.url}/>}
  );
};
const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  imageRoom: {
    resizeMode: "contain",
  },
  child: { width: windowWidth, justifyContent: "center" },
  text: { fontSize: 100, textAlign: "center" },
  flatListContainer: { flex: 1, backgroundColor: "white" },
});
