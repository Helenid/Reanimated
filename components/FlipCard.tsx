import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolate } from 'react-native-reanimated';

interface FlipCardProps {
  frontText: string;
  backText: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ frontText, backText }) => {
  const animation = useSharedValue(0);
  const [flipped, setFlipped] = useState(false);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = `${interpolate(animation.value, [0, 180], [0, 180], Extrapolate.CLAMP)}deg`;
    return {
      transform: [{ rotateY }],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = `${interpolate(animation.value, [0, 180], [180, 360], Extrapolate.CLAMP)}deg`;
    return {
      transform: [{ rotateY }],
      position: 'absolute',
      top: 0,
    };
  });

  const flipCard = () => {
    if (flipped) {
      animation.value = withSpring(0);
    } else {
      animation.value = withSpring(180);
    }
    setFlipped(!flipped);
  };

  return (
    <TouchableWithoutFeedback onPress={flipCard}>
      <View>
        <Animated.View
          style={[styles.card, styles.cardFront, frontAnimatedStyle]}
        >
          <Text style={styles.text}>{frontText}</Text>
        </Animated.View>
        <Animated.View
          style={[styles.card, styles.cardBack, backAnimatedStyle]}
        >
          <Text style={styles.text}>{backText}</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardFront: {
    backgroundColor: '#FFC107',
  },
  cardBack: {
    backgroundColor: '#03A9F4',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default FlipCard;
