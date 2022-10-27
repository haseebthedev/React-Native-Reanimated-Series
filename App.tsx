import React from 'react';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AnimatedTabs, AnimatedTabsWithGestures, SimpleLottieAnimation, PanGestureHandlerWithRE} from './components';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {/* <AnimatedTabs /> */}
        {/* <AnimatedTabsWithGestures /> */}
        {/* <SimpleLottieAnimation /> */}
        <PanGestureHandlerWithRE />
      </View>
    </GestureHandlerRootView>
  );
};
export default App;
