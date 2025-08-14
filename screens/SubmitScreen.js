import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { submitStyles } from '../styles/submitStyles';
import { saveIdea } from '../utils/storage';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import ThemeContext from '../utils/ThemeContext';
import { useTheme } from 'react-native-paper';

export default function SubmitScreen({ navigation }) {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const paperTheme = useTheme();

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!name || !tagline || !description) {
      Toast.show({ type: 'error', text1: 'Please fill all fields' });
      return;
    }

    const rating = Math.floor(Math.random() * 101);
    const newIdea = {
      id: uuid.v4(),
      name,
      tagline,
      description,
      rating,
      votes: 0,
    };
    await saveIdea(newIdea);

    setName('');
    setTagline('');
    setDescription('');
    Toast.show({ type: 'success', text1: 'Idea submitted!' });

    navigation.navigate('Ideas');
  };

  return (
    <View style={[submitStyles.container, isDark && { backgroundColor: '#18122B' }]}> 
      <Card style={[submitStyles.card, isDark && { backgroundColor: '#231942' }]}> 
        <Button mode="outlined" onPress={toggleTheme} style={submitStyles.toggleTheme}>
          {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Button>
        <Text style={[submitStyles.title, isDark && { color: '#c9b6e4' }]}>Submit Your Startup Idea</Text>
        <Text style={[submitStyles.subtitle, isDark && { color: '#a59aca' }]}>Share your innovative idea and get feedback from the community!</Text>
        <TextInput
          label="Startup Name"
          value={name}
          onChangeText={setName}
          style={submitStyles.input}
          mode="outlined"
          theme={{ colors: { primary: '#5a3e7bff', background: isDark ? '#2d2350' : '#f3eafd', text: isDark ? '#fff' : '#000' } }}
        />
        <TextInput
          label="Tagline"
          value={tagline}
          onChangeText={setTagline}
          style={submitStyles.input}
          mode="outlined"
          theme={{ colors: { primary: '#5a3e7bff', background: isDark ? '#2d2350' : '#f3eafd', text: isDark ? '#fff' : '#000' } }}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={[submitStyles.descriptionInput, isDark && { backgroundColor: '#2d2350', color: '#fff' }]}
          mode="outlined"
          theme={{ colors: { primary: '#5a3e7bff', background: isDark ? '#2d2350' : '#f3eafd', text: isDark ? '#fff' : '#000' } }}
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={submitStyles.button}
          labelStyle={submitStyles.buttonLabel}
        >
          Submit Idea
        </Button>
      </Card>
    </View>
  );
}
