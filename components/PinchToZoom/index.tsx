import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {PinchGestureHandler, PinchGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import Animated, {useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';

const DUMMY_IMAGE = 'https://unsplash.com/photos/s1Iq2bRoR6Q/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjY3MzMwMDEz&force=true&w=640';

const {width, height} = Dimensions.get('window');
const AnimatedImage = Animated.createAnimatedComponent(Image);

const PinchToZoom = () => {
    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    const gestureHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
        onActive: event => {
            scale.value = event.scale;
            focalX.value = event.focalX;
            focalY.value = event.focalY;
        },
        onEnd: () => {
            scale.value = withTiming(1);
            focalX.value = withTiming(0);
            focalY.value = withTiming(0);
        },
    });

    const rStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: focalX.value},
                {translateY: focalY.value},
                {translateX: -width / 2},
                {translateY: -height / 2},
                {scale: scale.value},
                {translateX: -focalX.value},
                {translateY: -focalY.value},
                {translateX: width / 2},
                {translateY: height / 2},
            ],
        };
    });

    return (
        <PinchGestureHandler onGestureEvent={gestureHandler}>
            <AnimatedImage source={{uri: DUMMY_IMAGE}} style={[styles.imageBlock, rStyles]} />
        </PinchGestureHandler>
    );
};

const styles = StyleSheet.create({
    imageBlock: {
        flex: 1,
    },
});

export {PinchToZoom};
