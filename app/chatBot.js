
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const apiKey = 'AIzaSyB6DsVrl0MVDm2FZN4wPVB35YWwdXfjju4'; // Replace with your Google API Key
  const genAI = new GoogleGenerativeAI(apiKey);

  // Predefined responses for cyclone-related queries
  const predefinedResponses = {
    "cyclone update": "The latest cyclone update will be fetched from the weather API soon.",
    "safe house": "Safe houses are available in your area. You can check the nearest locations in the Disaster Management app.",
    "evacuation plan": "Follow the evacuation routes provided in the app. Carry essential items, stay calm, and move to higher ground if necessary.",
    "emergency contacts": "In case of emergency, call 108 for medical help, 100 for police, and 101 for fire services.",
  };

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setLoading(true);

      try {
        const lowerInput = input.toLowerCase();

        // Check for predefined responses
        if (predefinedResponses[lowerInput]) {
          respond(predefinedResponses[lowerInput]);
          setLoading(false);
          return;
        }

        // Use AI for general disaster-related queries
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(input);
        const response = await result.response;
        const text = await response.text();

        console.log("AI Response:", text);
        respond(text);
      } catch (error) {
        console.error(error);
        respond("There was an error fetching information. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const respond = (botMessage) => {
    const botReply = { text: botMessage, sender: 'bot' };
    setMessages(prev => [...prev, botReply]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {item.text}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {options.length > 0 && (
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => respond(predefinedResponses[option.toLowerCase()])}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Ask about cyclone updates, safe houses..."
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  optionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Chatbot;