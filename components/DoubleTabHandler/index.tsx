import React, {useCallback} from 'react';
import {View, Text, StyleSheet, ImageBackground, Image, Dimensions} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring} from 'react-native-reanimated';

const {width: SIZE} = Dimensions.get('window');

const DUMMY_LIKE_ICON = require('./likeIcon.png');
const DUMMY_IMAGE = 'https://images.unsplash.com/photo-1584839401450-accbe1a8ef7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const DoubleTabHandler = () => {
    const scale = useSharedValue(0);

    const onDoubleTap = useCallback(() => {
        scale.value = withSpring(1, {stiffness: 200}, finished => {
            if (finished) {
                scale.value = withDelay(400, withSpring(0));
            }
        });
    }, []);

    const rAnimatedStyles = useAnimatedStyle(() => {
        return {
            // here using Math.max(). Because it restricts the scale.value to never go
            // down the zero value or negative.
            transform: [{scale: Math.max(scale.value, 0)}],
        };
    });

    return (
        <View style={styles.container}>
            <TapGestureHandler numberOfTaps={2} onActivated={onDoubleTap}>
                <Animated.View>
                    <ImageBackground source={{uri: DUMMY_IMAGE}} style={styles.postImage}>
                        <AnimatedImage source={DUMMY_LIKE_ICON} style={[styles.likeIcon, rAnimatedStyles]} />
                    </ImageBackground>
                </Animated.View>
            </TapGestureHandler>
            <Text style={styles.text}>Double Tab Gesture of Instagram</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postImage: {
        width: SIZE,
        height: SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginTop: 20,
    },
    likeIcon: {},
});

export {DoubleTabHandler};
