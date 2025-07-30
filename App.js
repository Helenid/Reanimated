import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const SPACER = (width - ITEM_WIDTH) / 2;

const DATA = [
  {
    id: '1',
    title: 'Strawberry Delight',
    image: require('./assets/straw.png'),
    price: '$4.99',
    description: 'A delicious blend of fresh strawberries and cream.',
    backgroundColor: '#F87B90',
  },
  {
    id: '2',
    title: 'Vanilla Heaven',
    image: require('./assets/van.png'),
    price: '$5.49',
    description: 'Rich and creamy vanilla ice cream with nuts.',
    backgroundColor: '#F2E1C1',
  },
  {
    id: '3',
    title: 'Chocolate Blast',
    image: require('./assets/choc.png'),
    price: '$5.99',
    description: 'Rich chocolate ice cream for chocolate lovers!',
    backgroundColor: '#84563B',
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function App() {
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const bgStyle = useAnimatedStyle(() => {
    const inputRange = DATA.map((_, i) => i * ITEM_WIDTH);

    const colors = DATA.map((item) => item.backgroundColor);

    const backgroundColor = interpolateColor(
      scrollX.value,
      inputRange,
      colors
    );

    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View style={[styles.container, bgStyle]}>
      <AnimatedFlatList
        data={[{ id: 'left-spacer' }, ...DATA, { id: 'right-spacer' }]}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        bounces={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
          setCurrentIndex(index);
        }}
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={({ item, index }) => {
          if (!item.image) return <View style={{ width: SPACER }} />;
          return (
            <View style={styles.imageWrapper}>
              <Image source={item.image} style={styles.image} />
            </View>
          );
        }}
      />

      <View style={styles.card}>
        <Text style={styles.price}>{DATA[currentIndex]?.price}</Text>
        <Text style={styles.title}>{DATA[currentIndex]?.title}</Text>
        <Text style={styles.description}>{DATA[currentIndex]?.description}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Got it</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: ITEM_WIDTH * 0.9,
    height: '70%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  card: {
    position: 'absolute',
    bottom: 50,
    width: width * 0.85,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    height: 230,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 6,
  },
  price: {
    fontSize: 26,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

// This code creates a horizontal scrollable list of ice cream items with an animated background that changes color based on the currently viewed item. Each item has a card displaying its details, and the user can interact with it by tapping a button.