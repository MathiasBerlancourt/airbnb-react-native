import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";

const ProfileScreen = () => {
  const { params } = useRoute();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/:id`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <View>
      {isLoading === true ? <ActivityIndicator /> : <Text>User profile</Text>}
    </View>
  );
};

export default ProfileScreen;
