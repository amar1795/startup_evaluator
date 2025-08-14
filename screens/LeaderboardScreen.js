import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { getIdeas } from '../utils/storage';

export default function LeaderboardScreen() {
  const [topIdeas, setTopIdeas] = useState([]);

  const loadLeaderboard = async () => {
    const ideas = await getIdeas();
    const sorted = [...ideas].sort((a, b) => b.votes - a.votes).slice(0, 5);
    setTopIdeas(sorted);
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  return (
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
  );
}
