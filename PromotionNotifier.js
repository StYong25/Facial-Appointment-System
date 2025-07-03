import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import io from 'socket.io-client';

// Connect to the server (use correct IP address for physical devices)
const socket = io('http://10.0.2.2:4000', { transports: ['websocket'] });

const PromoBanner = () => {
  const [promo, setPromo] = useState("Checking promotions...");
  const fadeAnim = new Animated.Value(1); // Initial opacity set to 1 (fully visible)

  useEffect(() => {
    // Listen for the 'promotion' event from the server
    socket.on('promotion', (message) => {
      console.log('Received promotion:', message);  // This will log to the console when the client receives a promotion
      setPromo(message); // Update the promo state with the new message

      // Start fading out the banner after 10 seconds
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 0, // Instant fade-in
        useNativeDriver: true,
      }).start();

      // Show the banner for 10 seconds before fading it out
      setTimeout(() => {
        // Animate the banner to fade out over 2 seconds
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000, // 2 seconds to fade out
          useNativeDriver: true,
        }).start();
      }, 10000); // 10 seconds (10000 milliseconds) delay before starting fade-out
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Animated.View
      style={[styles.banner, { opacity: fadeAnim }]} // Apply the animated opacity
      pointerEvents="none"
    >
      <Text style={styles.text}>✨ {promo}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 999,
    elevation: 10, // for Android shadow stacking
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PromoBanner;
