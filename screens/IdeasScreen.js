import React, { useState, useCallback } from 'react';
import { FlatList, View, Share } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { Menu, IconButton } from 'react-native-paper';
import { getIdeas, upvoteIdea } from '../utils/storage';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { cardStyle } from '../styles/cardStyles';

export default function IdeasScreen() {
  const [ideas, setIdeas] = useState([]);
  const [sortBy, setSortBy] = useState('votes');
  const [sortOrder, setSortOrder] = useState('top'); // 'top' or 'bottom'
  const [menuVisible, setMenuVisible] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);

  const loadIdeas = async (criteria = sortBy, order = sortOrder) => {
    let data = await getIdeas();
    if (criteria === 'votes') {
      data.sort((a, b) => b.votes - a.votes);
    } else {
      data.sort((a, b) => b.rating - a.rating);
    }
    if (order === 'bottom') {
      data.reverse();
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

  // Swipe right action UI
  const renderRightActions = (id) => (
    <View style={{ backgroundColor: '#4caf50', justifyContent: 'center', width: 100, alignItems: 'center' }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>👍 Upvote</Text>
    </View>
  );

  useFocusEffect(
    useCallback(() => {
      loadIdeas(sortBy, sortOrder);
    }, [sortBy, sortOrder])
  );

  return (
    <>
      {/* Sort Buttons & Dropdown */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
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
          style={{ marginRight: 5 }}
        >
          Sort by Rating
        </Button>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setMenuVisible(true)}
              style={{ marginLeft: 5, flexDirection: 'column', borderColor: '#ccc', paddingVertical: 0, paddingHorizontal: 0, minWidth: 8, minHeight: 18, justifyContent: 'center', alignItems: 'center',borderRadius: 28 }}
              contentStyle={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            >
              
              <IconButton
                icon={sortOrder === 'top' ? 'arrow-up' : 'arrow-down'}
                size={18}
                style={{ marginTop: 8, backgroundColor: 'transparent' }}
                disabled
              />
            </Button>
          }
        >
          <Menu.Item
            onPress={() => { setSortOrder('top'); setMenuVisible(false); }}
            title="Top to Bottom"
            leadingIcon="arrow-up"
          />
          <Menu.Item
            onPress={() => { setSortOrder('bottom'); setMenuVisible(false); }}
            title="Bottom to Top"
            leadingIcon="arrow-down"
          />
        </Menu>
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
            <Swipeable
              renderRightActions={() => renderRightActions(item.id)}
              onSwipeableRightOpen={() => handleUpvote(item.id)}
            >
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
            </Swipeable>
          );
        }}
      />
    </>
  );
}
