import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { saveIdea } from '../utils/storage';
import uuid from 'react-native-uuid';

export default function SubmitScreen({ navigation }) {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
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
    setName(''); setTagline(''); setDescription('');
    navigation.navigate('Ideas');
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput label="Startup Name" value={name} onChangeText={setName} style={{ marginBottom: 10 }} />
      <TextInput label="Tagline" value={tagline} onChangeText={setTagline} style={{ marginBottom: 10 }} />
      <TextInput label="Description" value={description} onChangeText={setDescription} multiline style={{ marginBottom: 10 }} />
      <Button mode="contained" onPress={handleSubmit}>Submit Idea</Button>
    </View>
  );
}
