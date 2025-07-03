import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

// Database Initialization
import { 
  createUserTable, 
  createBookingTable, 
  createTreatmentTable, 
  insertMultipleData 
} from "./database";

// Screens
import FAQScreen from "./screens/FAQScreen";
import TreatmentScreen from "./screens/TreatmentScreen";
import TreatmentDetailsScreen from "./screens/TreatmentDetailsScreen";
import BookingOverviewScreen from "./screens/BookingOverviewScreen";
import BookingDetailsScreen from "./screens/BookingDetailsScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import UserHomeScreen from "./screens/UserHomeScreen";
import BookingScreen from "./screens/Booking";
import LogInScreen from "./screens/LogInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MeetTeamScreen from "./screens/MeetTeamScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import LocationContactScreen from "./screens/LocationContactScreen";
import HomePageScreen from "./screens/HomePageScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const ViewBookingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BookingOverview" component={BookingOverviewScreen} />
    <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
  </Stack.Navigator>
);

const TreatmentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TreatmentScreen" component={TreatmentScreen} />
    <Stack.Screen name="makeBooking" component={BookingScreen} />
    <Stack.Screen name="TreatmentDetails" component={TreatmentDetailsScreen} />
  </Stack.Navigator>
);

const TeamInfoStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TeamInfoScreen" component={HomeScreen} />
    <Stack.Screen name="AboutUs" component={AboutUsScreen} />
    <Stack.Screen name="MeetTeam" component={MeetTeamScreen} />
    <Stack.Screen name="FAQ" component={FAQScreen} />
    <Stack.Screen name="Location" component={LocationContactScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="UserHome">
    <Stack.Screen name="UserHome" component={UserHomeScreen} />
    <Stack.Screen name="Login" component={LogInScreen} />
    <Stack.Screen name="Signup" component={SignUpScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

const BottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="HomePage"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        const icons = {
          HomePage: "home-outline",
          Profile: "person-outline",
          Treatment: "face-woman-shimmer",
          Bookings: "calendar-outline",
        };

        if (route.name === "Treatment") {
          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              size={size}
              color={color}
            />
          );
        }

        return (
          <Ionicons
            name={focused ? icons[route.name].replace("-outline", "") : icons[route.name]}
            size={size}
            color={color}
          />
        );
      },
      tabBarActiveTintColor: "#4CAF50",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
    })}
  >
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="HomePage" component={HomePageScreen} />
    <Tab.Screen name="Treatment" component={TreatmentStack} />
    <Tab.Screen name="Bookings" component={ViewBookingStack} />
  </Tab.Navigator>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const initializeDatabase = async () => {
      await createUserTable();
      await createBookingTable();
      await createTreatmentTable();
      await insertMultipleData(); 
    };
    initializeDatabase();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            drawerActiveTintColor: "darkslateblue",
            drawerActiveBackgroundColor: "pink",
            drawerLabelStyle: { fontSize: 23, color: "#333333" },
          }}
        >
          <Drawer.Screen name="Home" component={BottomTabNavigator} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Treatment" component={TreatmentStack} />
          <Drawer.Screen name="Bookings" component={ViewBookingStack} />
          <Drawer.Screen name="About Us" component={TeamInfoStack} />
        </Drawer.Navigator>
      ) : (
        <HomeStack />
      )}
    </NavigationContainer>
  );
};

export default App;
