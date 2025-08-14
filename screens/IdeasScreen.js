import React, { useState, useCallback } from 'react';
import { FlatList, View, Share } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { getIdeas, upvoteIdea } from '../utils/storage';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

export default function IdeasScreen() {
  const [ideas, setIdeas] = useState([]);
  const [sortBy, setSortBy] = useState('votes');
  const [expandedIds, setExpandedIds] = useState([]);

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
      loadIdeas();
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

      {/* Ideas List */}
      <FlatList
        data={ideas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isExpanded = expandedIds.includes(item.id);
          const shortDescription =
            item.description.length > 100 && !isExpanded
              ? item.description.substring(0, 100) + '...'
              : item.description;

          return (
            <Card style={{ margin: 10 }}>
              <Card.Title
                title={item.name}
                subtitle={`${item.tagline} | Rating: ${item.rating}`}
              />
              <Card.Content>
                <Text>{shortDescription}</Text>
                {item.description.length > 100 && (
                  <Button onPress={() => toggleExpand(item.id)}>
                    {isExpanded ? 'Show Less' : 'Read More'}
                  </Button>
                )}
                <Text>Votes: {item.votes}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => handleUpvote(item.id)}>Upvote</Button>
                <Button onPress={() => handleShare(item)}>Share</Button>
              </Card.Actions>
            </Card>
          );
        }}
      />
    </>
  );
}
