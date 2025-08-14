import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { getIdeas, upvoteIdea } from '../utils/storage';

export default function IdeasScreen() {
  const [ideas, setIdeas] = useState([]);

  const loadIdeas = async () => {
    setIdeas(await getIdeas());
  };

  const handleUpvote = async (id) => {
    await upvoteIdea(id);
    loadIdeas();
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
