import React, { useState, useContext, useRef } from 'react';
import { View, Text } from 'react-native';
import { Animated, TouchableWithoutFeedback, Easing } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { submitStyles } from '../styles/submitStyles';
import { saveIdea } from '../utils/storage';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import ThemeContext from '../utils/ThemeContext';
import { useTheme } from 'react-native-paper';
import { Sun, Moon } from 'lucide-react-native';

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


  // Animated Switch
  const switchAnim = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(switchAnim, {
      toValue: isDark ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  }, [isDark]);

  const SWITCH_WIDTH = 64;
  const SWITCH_HEIGHT = 32;
  const KNOB_SIZE = 28;
  const ICON_SIZE = 20;

  return (
    <View style={[submitStyles.container, isDark && { backgroundColor: '#18122B' }]}> 
  <Card style={[submitStyles.card, isDark && { backgroundColor: '#231942' }]}> 
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
          dense={true}
          style={[submitStyles.descriptionInput, { textAlignVertical: 'top' }]}
          mode="outlined"
          theme={{ colors: { primary: '#5a3e7bff', background: isDark ? '#2d2350' : '#f3eafd', text: isDark ? '#fff' : '#000', placeholder: isDark ? '#c9b6e4' : undefined } }}
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
