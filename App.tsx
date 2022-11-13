import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DoubleTabHandler, PinchToZoom, AnimatedTabs, AnimatedTabsWithGestures, SimpleLottieAnimation, PanGestureHandlerWithRE, InterpolateScrollView, InterpolateColor} from './components';

const App = () => {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <AnimatedTabs />
            {/* <AnimatedTabsWithGestures /> */}
            {/* <SimpleLottieAnimation /> */}
            {/* <PanGestureHandlerWithRE /> */}
            {/* <InterpolateScrollView /> */}
            {/* <InterpolateColor /> */}
            {/* <PinchToZoom /> */}
            {/* <DoubleTabHandler /> */}
        </GestureHandlerRootView>
    );
};
export default App;
