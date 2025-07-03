import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const MeetTeamScreen = () => {
  const navigation = useNavigation();

  const teamMembers = [
    {
      id: 1,
      name: "Kimberly Soo",
      image: require("../assets/kimberly_soo.jpg"),
      bio: "A skilled beautician specializing in skincare and facial treatments.",
      experience: "5 years of experience in professional beauty therapy and aesthetics.",
    },
    {
      id: 2,
      name: "Amadea Smith",
      image: require("../assets/amadea_smith.jpg"),
      bio: "An expert in makeup artistry and personal grooming.",
      experience: "4 years of experience in professional makeup and bridal styling.",
    },
    {
      id: 3,
      name: "Stella Yong",
      image: require("../assets/stella_yong.jpg"),
      bio: "A specialist in hair styling and treatment solutions.",
      experience: "6 years of experience in hair design, coloring, and scalp care.",
    },
    {
      id: 4,
      name: "June Seah",
      image: require("../assets/june_seah.jpg"),
      bio: "An experienced beauty consultant and spa therapist.",
      experience: "7 years of experience in spa therapy, skincare consultation, and beauty treatments.",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.title}>Meet Our Team</Text>

      {teamMembers.map((member) => (
        <View key={member.id} style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image source={member.image} style={styles.image} />
          </View>
          <Text style={styles.name}>{member.name}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bio:</Text>
            <Text style={styles.sectionText}>{member.bio}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience:</Text>
            <Text style={styles.sectionText}>{member.experience}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FAF9F6",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 30,
    marginTop: 60,
  },
  card: {
    width: "90%",
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#333333",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  imageWrapper: {
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 15,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
  },
  section: {
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    color: "#555555",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default MeetTeamScreen;
