import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "../firebaseConfig";
import { fetchUserData } from "../database";
import PromoBanner from "../PromotionNotifier";
import { useFocusEffect } from "@react-navigation/native";

const HomePageScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState("User");

  

  useFocusEffect(
  useCallback(() => {
    const user = auth.currentUser;
    if (user) {
      fetchUserData(user.email)
        .then((profile) => {
          if (profile && profile.name) {
            setUserName(profile.name);
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [])
);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PromoBanner/>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity
          style={styles.accButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            style={styles.companyLogo}
            source={require("../assets/company_logo.jpg")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Ionicons
            name="calendar-outline"
            size={40}
            color="#A7C7E7"
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>Make a new booking?</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("makeBooking")}
          >
            <Text style={styles.buttonText}>Make Booking</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="medkit-outline"
            size={40}
            color="#A7C7E7"
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>Take a look at new treatments?</Text>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => navigation.navigate("Treatment")}
          >
            <Text style={styles.buttonText}>More Treatments</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="information-circle-outline"
            size={40}
            color="#A7C7E7"
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>About Us</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("About Us")}
          >
            <Text style={styles.buttonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FAF9F6", 
  },
  header: {
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  headerText: {
    flex: 1,
  },
  accButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333333", 
  },
  userName: {
    fontSize: 22,
    color: "#777777", 
  },
  cardContainer: {
    gap: 20,
  },
  card: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    alignItems: "center",
  },
  cardIcon: {
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    color: "#444444",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFB3AB", 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSecondary: {
    backgroundColor: "#A7C7E7", 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomePageScreen;
