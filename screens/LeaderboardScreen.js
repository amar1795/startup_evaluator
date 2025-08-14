import React, { useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { getIdeas } from '../utils/storage';
import { useFocusEffect } from '@react-navigation/native';

export default function LeaderboardScreen() {
  const [topIdeas, setTopIdeas] = useState([]);
  const [sortBy, setSortBy] = useState('votes');

  const loadLeaderboard = async (criteria = sortBy) => {
    let ideas = await getIdeas();

    if (criteria === 'votes') {
      ideas.sort((a, b) => b.votes - a.votes);
    } else {
      ideas.sort((a, b) => b.rating - a.rating);
    }

    setTopIdeas(ideas.slice(0, 5));
  };

  // Auto-refresh when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadLeaderboard();
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
        data={topIdeas}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Card style={{ margin: 10 }}>
            <Card.Title
              title={`${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''} ${item.name}`}
              subtitle={`Votes: ${item.votes} | Rating: ${item.rating}`}
            />
            <Card.Content>
              <Text>{item.tagline}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </>
  );
}
