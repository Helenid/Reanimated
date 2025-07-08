import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import { Page } from './components/page'

const WORDS = ["What's up", "mobile", "devs"]

const App = () => {
  return (
    <Animated.ScrollView horizontal pagingEnabled style={styles.container}>
     {WORDS.map((title, index) => {
      return <Page key={index.toString()} title={title} index={index}/>
     }
    )}
    </Animated.ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
})