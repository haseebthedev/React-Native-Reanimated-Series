import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedGestureHandler, useSharedValue, withDecay, useDerivedValue, cancelAnimation} from 'react-native-reanimated';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import Page, {SCREEN_WIDTH} from './components/Page';

type ContextType = {
    x: number;
};

const CustomScrollView = () => {
    const translateX = useSharedValue(0);
    const [titles, setTitles] = useState<string[]>(['Hello', 'Mobile', 'Devs']);

    const clampedTranslateX = useDerivedValue(() => {
        /** This is the max translation value our screens will take */
        const MAX_TRANSLATION_VALUE = -SCREEN_WIDTH * (titles.length - 1);

        /** Here we are returning min 0 and max (negative) of translationX
         * to restrict scrolling more max traslation values.
         */
        return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATION_VALUE);
    });

    const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (_, context) => {
            context.x = clampedTranslateX.value;

            /** Cancelling running decay animated on new event */
            cancelAnimation(translateX);
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.x;
        },
        onEnd: event => {
            /** Using decay animation */
            translateX.value = withDecay({velocity: event.velocityX});
        },
    });

    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={styles.container}>
                {titles.map((title, index) => (
                    <Page key={index} index={index} title={title} translateX={clampedTranslateX} />
                ))}
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
