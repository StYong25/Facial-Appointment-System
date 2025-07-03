import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZpzO12I9qlezr2fA_QBXBe3GcpPCaOhU",
  authDomain: "eclat-75db0.firebaseapp.com",
  projectId: "eclat-75db0",
  storageBucket: "eclat-75db0.firebasestorage.app",
  messagingSenderId: "843691474632",
  appId: "1:843691474632:web:95c05fc14eeb8159186ffd",
  measurementId: "G-CR9YX8FL42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage) // Use AsyncStorage for persistence
});

export { auth };