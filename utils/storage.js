import AsyncStorage from '@react-native-async-storage/async-storage';

const IDEAS_KEY = 'ideas';
const VOTED_KEY = 'votedIdeas';

export const getIdeas = async () => {
  const data = await AsyncStorage.getItem(IDEAS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveIdea = async (idea) => {
  const ideas = await getIdeas();
  const updated = [...ideas, idea];
  await AsyncStorage.setItem(IDEAS_KEY, JSON.stringify(updated));
};

export const upvoteIdea = async (id) => {
  const votedRaw = await AsyncStorage.getItem(VOTED_KEY);
  const votedIdeas = votedRaw ? JSON.parse(votedRaw) : [];

  // Prevent multiple votes
  if (votedIdeas.includes(id)) {
    return { success: false, message: 'Already voted!' };
  }

  let ideas = await getIdeas();
  ideas = ideas.map(idea =>
    idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
  );

  await AsyncStorage.setItem(IDEAS_KEY, JSON.stringify(ideas));
  await AsyncStorage.setItem(VOTED_KEY, JSON.stringify([...votedIdeas, id]));

  return { success: true, message: 'Upvoted!' };
};
