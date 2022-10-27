import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const AnimatedTabsWithGestures = () => {
  const offset = useSharedValue(0);
  const [currTab, setCurrTab] = useState(0);

  const animatedBarStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });

  const TextStylesFirst = useAnimatedStyle(() => {
    if (offset.value === currTab) {
      return {
        opacity: 1,
      };
    } else {
      return {
        opacity: 0.6,
      };
    }
  });

  const TextStylesSecond = useAnimatedStyle(() => {
    if (offset.value == currTab) {
      return {
        opacity: 0.6,
      };
    } else {
      return {
        opacity: 1,
      };
    }
  });

  let onFirstTabPress = () => {
    offset.value = withTiming(width - width * 0.5);
    setCurrTab(1);
  };

  let onSecondTabPress = () => {
    offset.value = withTiming(0);
    setCurrTab(0);
  };

  let FirstComponent = () => {
    return (
      <Animated.View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>FIRST COMPONENT</Text>
      </Animated.View>
    );
  };

  let SecondComponent = () => {
    return (
      <Animated.View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>SECOND COMPONENT</Text>
      </Animated.View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={styles.header}>Home</Text>
      <Animated.View style={styles.container}>
        <Animated.View style={[styles.bar, animatedBarStyles]}></Animated.View>
        <TouchableOpacity onPress={onSecondTabPress} activeOpacity={0.8}>
          <Animated.Text style={[styles.text, TextStylesFirst]}>
            Virtual
          </Animated.Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onFirstTabPress} activeOpacity={0.8}>
          <Animated.Text style={[styles.text, TextStylesSecond]}>
            Physical
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{flex: 1}}>
        {currTab === 0 ? <FirstComponent /> : <SecondComponent />}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
    color: '#262626',
    fontWeight: 'bold',
  },
  container: {
    height: 40,
    width,
    backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    width: width * 0.5,
    height: 35,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    position: 'absolute',
    top: 2.5,
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    width: width * 0.5,
    textAlign: 'center',
  },
});

export {AnimatedTabsWithGestures};
