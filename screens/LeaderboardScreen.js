import React, { useState, useCallback } from 'react';
import { FlatList, View, Share } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { getIdeas } from '../utils/storage';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function LeaderboardScreen() {
  const [topIdeas, setTopIdeas] = useState([]);
  const [sortBy, setSortBy] = useState('votes');
  const [expandedIds, setExpandedIds] = useState([]);

  const loadLeaderboard = async (criteria = sortBy) => {
    let ideas = await getIdeas();

    if (criteria === 'votes') {
      ideas.sort((a, b) => b.votes - a.votes);
    } else {
      ideas.sort((a, b) => b.rating - a.rating);
    }

    setTopIdeas(ideas.slice(0, 5));
  };

  const toggleExpand = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const handleShare = async (idea) => {
    try {
      await Share.share({
        message: `🚀 ${idea.name}\n${idea.tagline}\nRating: ${idea.rating}/100\nVotes: ${idea.votes}\n\n"${idea.description}"`
      });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Share failed!' });
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadLeaderboard();
    }, [sortBy])
  );

  return (
    <>
      {/* Sort Buttons */}
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

      {/* Leaderboard List */}
      <FlatList
        data={topIdeas}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const isExpanded = expandedIds.includes(item.id);
          const shortDescription =
            item.description.length > 100 && !isExpanded
              ? item.description.substring(0, 100) + '...'
              : item.description;

          return (
            <Card style={{ margin: 10 }}>
              <Card.Title
                title={`${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''} ${item.name}`}
                subtitle={`Votes: ${item.votes} | Rating: ${item.rating}`}
              />
              <Card.Content>
                <Text>{shortDescription}</Text>
                {item.description.length > 100 && (
                  <Button onPress={() => toggleExpand(item.id)}>
                    {isExpanded ? 'Show Less' : 'Read More'}
                  </Button>
                )}
                <Text>{item.tagline}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => handleShare(item)}>Share</Button>
              </Card.Actions>
            </Card>
          );
        }}
      />
    </>
  );
}
