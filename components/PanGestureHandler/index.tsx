import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';

const SIZE = 80;
const CIRCLE_RADIUS = 150;

type ContextType = {
    translationX: number;
    translationY: number;
};

const PanGestureHandlerWithRE = () => {
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);

    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (event, context) => {
            // Here storing initial value of translationX in context
            context.translationX = translationX.value;
            context.translationY = translationY.value;
        },
        onActive: (event, context) => {
            // event translationX + previous translationX value will result in smooth gesture
            translationX.value = event.translationX + context.translationX;
            translationY.value = event.translationY + context.translationY;
        },
        onEnd: (event, context) => {
            // calculating the distance from initial point
            let distance = Math.sqrt(translationX.value ** 2 + translationY.value ** 2);

            // This means, if the box is completely gets outside, then only it will stay outside otherwise, it will return to its intial point.
            if (distance < CIRCLE_RADIUS + SIZE / 2) {
                translationX.value = withSpring(0);
                translationY.value = withSpring(0);
            }
        },
    });

    const boxStyles = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translationX.value}, {translateY: translationY.value}],
        };
    });

    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <PanGestureHandler onGestureEvent={onGestureEvent}>
                    <Animated.View style={[styles.box, boxStyles]} />
                </PanGestureHandler>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: SIZE,
        height: SIZE,
        backgroundColor: 'purple',
        borderRadius: 20,
    },
    circle: {
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: CIRCLE_RADIUS,
        borderWidth: 5,
        borderColor: 'purple',
    },
});

export {PanGestureHandlerWithRE};
