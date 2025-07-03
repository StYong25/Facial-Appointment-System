import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserData } from '../database';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    gender: '',
  });

  useEffect(() => {
    const loadUserData = async () => {
      const userEmail = auth.currentUser?.email;
      const data = await fetchUserData(userEmail);
      if (data) {
        setUserData({
          userName: data.name,
          email: data.email,
          gender: data.gender,
        });
      } else {
        Alert.alert('Error', 'User data not found.');
      }
    };

    loadUserData();
  }, []);

  const handleLogout = () => {
    AsyncStorage.removeItem('userToken');
    signOut(auth)
      .then(() => navigation.navigate('Home'))
      .catch((error) => console.error('Error during sign out: ', error));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FAF9F6', padding: 20 }}>
      {/* Removed Top Right Switch */}

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
        <Image
          source={require('../assets/Logo.png')}
          style={{ height: 140, width: 140, borderRadius: 70 }}
        />
        <TouchableOpacity
          style={{
            height: 31,
            width: 31,
            backgroundColor: '#333333',
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -25,
            marginLeft: 60,
          }}
        >
          <Ionicons name='pencil-outline' color='white' size={20} />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', marginVertical: 18 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>{userData.userName}</Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <View style={{ marginLeft: 15, paddingVertical: 5 }}>
          <Text style={{ fontSize: 16 }}>Your Email</Text>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={30} color="#333333" />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={userData.email}
            editable={false}
            placeholderTextColor="#777777"
          />
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <View style={{ marginLeft: 15, paddingVertical: 5 }}>
          <Text style={{ fontSize: 16 }}>Gender</Text>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="male-female-outline" size={30} color="#333333" />
          <TextInput
            style={styles.input}
            placeholder="Enter your gender"
            value={userData.gender}
            editable={false}
            placeholderTextColor="#777777"
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={{ fontSize: 16 }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  inputContainer: {
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F0FA',
    marginHorizontal: 15,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#333333',
    fontSize: 16,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 100,
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FFB3AB',
  },
};

export default ProfileScreen;
