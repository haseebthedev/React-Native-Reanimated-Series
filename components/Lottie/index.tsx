import React from 'react';
import {View, Text} from 'react-native';
import Lottie from 'lottie-react-native';

const SimpleLottieAnimation = () => {
  return (
    <>
      <View style={{flex: 1}}>
        <Lottie source={require('./demo.json')} autoPlay loop />
      </View>
      <View style={{flex: 1}}>
        <Lottie source={require('./demo1.json')} autoPlay loop />
      </View>
    </>
  );
};

export {SimpleLottieAnimation};
