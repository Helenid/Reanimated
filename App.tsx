import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import FlipCard from './components/FlipCard';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FlipCard frontText="🎴" backText="🎉" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
