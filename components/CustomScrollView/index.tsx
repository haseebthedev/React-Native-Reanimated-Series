import React, {useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Animated, {useAnimatedGestureHandler, useSharedValue, withDecay} from 'react-native-reanimated';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import Page from './components/Page';

type ContextType = {
    x: number;
};

const CustomScrollView = () => {
    const translateX = useSharedValue(0);
    const [titles, setTitles] = useState<string[]>(['Hello', 'Mobile', 'Devs']);

    const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (_, context) => {
            context.x = translateX.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.x;
        },
        onEnd: event => {
            translateX.value = withDecay({velocity: event.velocityX});
        },
    });

    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={styles.container}>
                {titles.map((title, index) => {
                    return <Page key={index} index={index} title={title} translateX={translateX} />;
                })}
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
});

export {CustomScrollView};
