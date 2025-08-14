import React, { useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { getIdeas, upvoteIdea } from '../utils/storage';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

export default function IdeasScreen() {
  const [ideas, setIdeas] = useState([]);
  const [sortBy, setSortBy] = useState('votes');

  const loadIdeas = async (criteria = sortBy) => {
    let data = await getIdeas();
    if (criteria === 'votes') {
      data.sort((a, b) => b.votes - a.votes);
    } else {
      data.sort((a, b) => b.rating - a.rating);
    }
    setIdeas(data);
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

  // Auto-refresh when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadIdeas();
    }, [sortBy])
  );

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
        <Button
          mode={sortBy === 'votes' ? 'contained' : 'outlined'}
          onPress={() => setSortBy('votes')}
          style={{ marginRight: 5 }}
        >
          Sort by Votes
        </Button>
        <Button
          mode={sortBy === 'rating' ? 'contained' : 'outlined'}
          onPress={() => setSortBy('rating')}
        >
          Sort by Rating
        </Button>
      </View>

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
    </>
  );
}
