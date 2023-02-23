import { useEffect, useState } from "react";
import { ScrollView, Text, FlatList } from "react-native";
import axios from "axios";

export const RoomScreen = ({ route }) => {
  const roomId = route.params.roomId;
  console.log("roomId : ", roomId);
  const [room, setRoom] = useState();
  const [isLoading, setIsLoading] = useState("");

  useEffect(() => {
    try {
      const fetchRoom = async () => {
        const response = axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${roomId}`
        );
        setRoom(response.data);
        console.log("response.data:", response.data);
        console.log("room:", room);
        setIsLoading(false);
      };
      fetchRoom();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return isLoading === true ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={room.photos}
      renderItem={({ item }) => {
        return (
          <View>
            <Image source={item.url} />
          </View>
        );
      }}
    />

    // <FlatList
    // data={response.data.photos}
    // renderItem={({Item})=><View>
    // <Image source={Item.photos.url}/>}
  );
};
