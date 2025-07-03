import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://10.0.2.2:5000/ask";

const FAQ_LIST = [
  { question: "How do I book a facial appointment?", answer: "Tap 'Services', select a facial type, pick a date/time, and confirm your booking." },
  { question: "What facial services do you offer?", answer: "We offer Hydrating Facial, Acne Treatment, Anti-Aging, Brightening, and Deep Cleansing services." },
  { question: "What are your business hours?", answer: "Our business hours are from 10:00 AM to 9:00 PM daily." },
  { question: "What is your cancellation policy?", answer: "You can cancel or reschedule up to 3 hours before your appointment." },
  { question: "What payment methods do you accept?", answer: "We accept Credit Cards, GrabPay, Touch 'n Go, and FPX." },
  { question: "What aftercare should I follow after a facial treatment?", answer: "Avoid exfoliation for 48 hours, stay out of direct sunlight, and use gentle skincare products." },
  { question: "Can I reschedule my appointment?", answer: "Yes, you can reschedule through the app at least 3 hours before the appointment." },
  { question: "Are your products safe for sensitive skin?", answer: "Yes, all our products are dermatologically tested and safe for sensitive skin." },
  { question: "How long does a typical facial treatment take?", answer: "A typical session takes about 60 to 90 minutes." },
  { question: "Is there any special preparation before my appointment?", answer: "Just arrive with a clean face and relax! No special preparation is needed." },
];

export default function GeminiChat() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    startChat();
  }, []);

  const startChat = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: "Hello!" }),
      });

      const data = await res.json();
      const responseText = data.response || "Welcome to Éclat Chat 🤖";
      setMessages([{ text: responseText, user: false }]);
    } catch (err) {
      console.error("Error starting chat:", err);
    }
  };

  const sendMessage = async (customQuestion = null) => {
    const question = customQuestion || userInput.trim();
    if (!question) return;

    const userMessage = { text: question, user: true };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    const predefined = FAQ_LIST.find((faq) => faq.question === question);
    if (predefined) {
      const botMessage = { text: predefined.answer, user: false };
      setMessages((prev) => [...prev, botMessage]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      const responseText = data.response || "No response received.";
      const botMessage = { text: responseText, user: false };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble,
      item.user ? styles.userBubble : styles.botBubble,
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 20, paddingTop: 80 }}
      />

      {loading && <ActivityIndicator size="large" color="#A7C7E7" style={{ marginBottom: 10 }} />}

      <View style={styles.faqContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.faqScrollContent}
        >
          {FAQ_LIST.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.faqButton}
              onPress={() => sendMessage(item.question)}
            >
              <Text style={styles.faqButtonText}>{item.question}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type a message..."
          placeholderTextColor="#777"
          onSubmitEditing={() => sendMessage()}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => sendMessage()}
          disabled={loading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF9F6" },
  
  messageBubble: {
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: "80%",
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userBubble: {
    backgroundColor: "#A7C7E7",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#F5F0FA",
    alignSelf: "flex-start",
  },
  messageText: { color: "#333", fontSize: 16 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginHorizontal: 10,
  },
  sendButton: {
    backgroundColor: "#A7C7E7",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  faqContainer: {
    maxHeight: 150,
    backgroundColor: "#FAF9F6",
    paddingVertical: 10,
  },
  faqScrollContent: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  faqButton: {
    backgroundColor: "#A7C7E7",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    marginRight: 12,
    marginBottom: 10,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqButtonText: { color: "#fff", fontSize: 16 },
});
