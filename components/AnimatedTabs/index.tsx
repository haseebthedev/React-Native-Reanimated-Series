import React from 'react';
import {View, StyleSheet, Dimensions, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const AnimatedTabs = () => {
  const offset = useSharedValue(0);
  const currTab = useSharedValue(0);

  /**
   * This is for animated slider effect / tab white background
   */
  const animatedBarStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });


  /**
   * These two animated styles change opacity of Text upon selection
   */
  const TextStylesFirst = useAnimatedStyle(() => {
    if (offset.value === currTab.value) {
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
    if (offset.value == currTab.value) {
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
    currTab.value = 1;
  };

  let onSecondTabPress = () => {
    offset.value = withTiming(0);
    currTab.value = 0;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width,
    backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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

export {AnimatedTabs};
