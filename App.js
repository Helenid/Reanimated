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
    backgroundColor: '#5A3E36',
  },
];

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8;
const SPACER = (width - ITEM_WIDTH)/2;
const AnimatedFlatList = Animated.FlatList;

export default function App() {
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    }
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
  return(
    // <Animated.View style={[styles.container, bgStyle]}>
    //   <AnimatedFlatList 
    //     data={[{id:'left-spacer'}, DATA, {id:'right-spacer'}]}
    //   />
    // </Animated.View>}
  )
}