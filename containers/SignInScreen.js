import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { useTogglePasswordVisibility } from "../utils/useTogglePasswordVisibility";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";
// https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in
export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigation = useNavigation();

  const submit = async () => {
    try {
      setError("");
      if (!email || !password) {
        setError("Tous les champs ne sont pas remplis");
        return;
        //un return pour ne pas que la requete se
        //fasse si les champs de sont pas remplis, l'idée est de ne pas
        //faire de requete pour rien
      }
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      if (response.data) {
        console.log(response.data);
        setToken(response.data.token);
      }
    } catch (error) {
      if (error.response.status === 401)
        setError("mot de passe ou adresse email incorrecte");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(input) => {
              setEmail(input);
            }}
            placeholder="Your email"
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(input) => {
                setPassword(input);
              }}
              placeholder="Your password"
              secureTextEntry={passwordVisibility}
            />
            <Pressable
              style={{ bottom: 30, left: 275 }}
              onPress={handlePasswordVisibility}
            >
              <MaterialCommunityIcons
                name={rightIcon}
                size={22}
                color="#232323"
              />
            </Pressable>
          </View>

          <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
          <TouchableOpacity
            onPress={() => {
              submit();
            }}
            style={styles.btnSignIn}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "gray", fontSize: 10 }}>
              No account? Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    marginVertical: 25,
  },
  logo: {
    width: 100,
    height: 100,
  },
  inputContainer: {
    alignItems: "baseline",
    position: "relative",
  },
  input: {
    borderBottomColor: "#ffbac0",
    borderBottomWidth: 2,
    height: 40,
    width: 300,
    marginTop: 40,
    backgroundColor: "white",
    placeholderTextColor: "#000000",
  },
  btnSignIn: {
    backgroundColor: "#FF466C",
    borderWidth: 1,
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    margin: 40,
    borderRadius: 30,
  },
});
