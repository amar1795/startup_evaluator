import AsyncStorage from '@react-native-async-storage/async-storage';

const IDEAS_KEY = 'ideas';

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
  let ideas = await getIdeas();
  ideas = ideas.map(idea =>
    idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
  );
  await AsyncStorage.setItem(IDEAS_KEY, JSON.stringify(ideas));
};
