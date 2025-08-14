import { StyleSheet } from 'react-native';

export const cardStyle = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  gradient: {
    padding: 15,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
  votes: {
    marginTop: 5,
    fontSize: 14,
    color: '#fff',
  },
});
