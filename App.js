import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const DATA = [
  {
    id: '1',
    title: 'Strawberry Delight',
    image: require('./assets/kiwi.png'),
    price: '$4.99',
    description: 'A delicious blend of fresh strawberries and cream. Perfect for a hot day!',
  },
  {
    id: '2',
    title: 'Vanilla Heaven',
    image: require('./assets/blueberry.png'),
    price: '$5.49',
    description: 'Rich and creamy vanilla ice cream topped with a sprinkle of nuts. A classic treat!',
  },
  {
    id: '3',
    title: 'Chocolate Blast',
    image: require('./assets/kiwi.png'),
    price: '$5.99',
    description: 'Indulge in our rich chocolate ice cream, a favorite for chocolate lovers!',
  },
];

const ITEM_WIDTH = width * 0.8;
const SPACER = (width - ITEM_WIDTH) / 2;

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const x = event.nativeEvent.contentOffset.x;
        const index = Math.round(x / ITEM_WIDTH);
        setCurrentIndex(index);
      },
    }
  );

  return (
    <View style={styles.container}>
      {/* Image Carousel */}
      <Animated.FlatList
        data={[{ id: 'spacer-left' }, ...DATA, { id: 'spacer-right' }]}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        bounces={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={({ item, index }) => {
          if (!item.image) return <View style={{ width: SPACER }} />;

          const inputRange = [
            (index - 2) * ITEM_WIDTH,
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
          ];

          // const translateY = scrollX.interpolate({
          //   inputRange,
          //   outputRange: [50, 0, 50],
          //   extrapolate: 'clamp',
          // });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [-100, 0, 100],
            extrapolate: 'clamp',
          });

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [80, 0, -80],
            extrapolate: 'clamp',
          });


          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View style={[styles.imageWrapper, { transform: [{ scale }] }]}>
              <Animated.Image
                source={item.image}
                style={[styles.image, { transform: [{ translateY }, 
                  { translateX },
                ] }]}
              />
            </Animated.View>
          );
        }}
      />

      {/* Fixed Info Card */}
      <View style={styles.card}>
        <Text style={styles.price}>{DATA[currentIndex]?.price}</Text>
        <Text style={styles.title}>{DATA[currentIndex]?.title}</Text>
        <Text style={styles.description}>{DATA[currentIndex]?.description}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Got it</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
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
