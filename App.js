import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';

const { width } = Dimensions.get('window');
const COLLAPSED_WIDTH = width * 0.3;
const EXPANDED_WIDTH = width * 0.8;
const CARD_HEIGHT = 250;

const FLOWERS = [
  {
    id: '1',
    name: 'Rose',
    description: 'Symbol of love and passion.',
    image: require('./assets/rose.webp'),
  },
  {
    id: '2',
    name: 'Lily',
    description: 'Represents purity and renewal.',
    image: require('./assets/lily.webp'),
  },
  {
    id: '3',
    name: 'Tulip',
    description: 'Perfect love and elegance.',
    image: require('./assets/tulip.jpeg'),
  },
];

export default function FloraCards() {
  const [expandedId, setExpandedId] = useState(null);
  const animatedValues = useRef(FLOWERS.map(() => new Animated.Value(COLLAPSED_WIDTH))).current;
  const rotationValues = useRef(FLOWERS.map(() => new Animated.Value(1))).current;

  const handlePress = (index) => {
  const isSameCard = FLOWERS[index].id === expandedId;

  FLOWERS.forEach((_, i) => {
    const isExpanding = !isSameCard && i === index;

    Animated.timing(animatedValues[i], {
      toValue: isExpanding ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(rotationValues[i], {
      toValue: isExpanding ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  });

  setExpandedId(isSameCard ? null : FLOWERS[index].id);
};


  const renderItem = ({ item, index }) => {
    const animatedWidth = animatedValues[index];
    const rotation = rotationValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-90deg'],
    });

    return (
      <TouchableWithoutFeedback onPress={() => handlePress(index)}>
        <Animated.View style={[styles.card, { width: animatedWidth }]}>
          <ImageBackground
            source={item.image}
            style={styles.imageBackground}
            imageStyle={{ borderRadius: 16 }}
          >
            <Animated.Text style={[styles.name, { transform: [{ rotate: rotation }] }]}>
              {item.name}
            </Animated.Text>
            {expandedId === item.id && (
              <Text style={styles.description}>{item.description}</Text>
            )}
          </ImageBackground>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <FlatList
          data={FLOWERS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
  card: {
    height: CARD_HEIGHT,
    borderRadius: 16,
    marginHorizontal: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#fff',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
});
