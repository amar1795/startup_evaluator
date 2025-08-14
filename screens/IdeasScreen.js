import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { getIdeas, upvoteIdea } from '../utils/storage';
import Toast from 'react-native-toast-message';

export default function IdeasScreen() {
  const [ideas, setIdeas] = useState([]);

  const loadIdeas = async () => {
    setIdeas(await getIdeas());
  };

  const handleUpvote = async (id) => {
    const result = await upvoteIdea(id);
    Toast.show({
      type: result.success ? 'success' : 'info',
      text1: result.message
    });
    if (result.success) {
      loadIdeas();
    }
  };

  useEffect(() => {
    loadIdeas();
  }, []);

  return (
    <FlatList
      data={ideas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card style={{ margin: 10 }}>
          <Card.Title title={item.name} subtitle={`${item.tagline} | Rating: ${item.rating}`} />
          <Card.Content>
            <Text>{item.description}</Text>
            <Text>Votes: {item.votes}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => handleUpvote(item.id)}>Upvote</Button>
          </Card.Actions>
        </Card>
      )}
    />
  );
}
