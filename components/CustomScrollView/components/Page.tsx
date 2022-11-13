import React from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

export const {width: SCREEN_WIDTH} = Dimensions.get('window');

interface PageProps {
    index: number;
    title: string;
    translateX: Animated.SharedValue<number>;
}

const Page = ({index, title, translateX}: PageProps) => {
    const pageOffset = SCREEN_WIDTH * index;

    const rStyles = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translateX.value + pageOffset}],
        };
    });

    return (
        <Animated.View style={[styles.container, {backgroundColor: `rgba(0,0,256, 0.${index + 2})`}, rStyles]}>
            <Text style={styles.text}>{title}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
    },
    text: {
        fontSize: 72,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Page;
