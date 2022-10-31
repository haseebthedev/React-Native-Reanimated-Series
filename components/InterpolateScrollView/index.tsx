import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import Page from './components/Page';

const WORDS = ['React', 'Native', 'is', 'Awesome'];

const InterpolateScrollView = () => {
    const translateX = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler(event => {
        translateX.value = event.contentOffset.x;
    });

    return (
        <Animated.ScrollView horizontal style={styles.container} onScroll={onScroll} scrollEventThrottle={16} pagingEnabled>
            {WORDS.map((item, index) => {
                return <Page key={index} index={index} title={item} translateX={translateX} />;
            })}
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export {InterpolateScrollView};
