import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Animated, {Extrapolate, interpolate, useAnimatedStyle} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
const BOX_SIZE = width * 0.7;

type Props = {
    title: string;
    index: number;
    translateX: Animated.SharedValue<number>;
};

const Page = ({title, index, translateX}: Props) => {
    let inputRange = [(index - 1) * width, index * width, (index + 1) * width];

    const rStyle = useAnimatedStyle(() => {
        let scale = interpolate(translateX.value, inputRange, [0, 1, 0], Extrapolate.CLAMP);
        return {transform: [{scale}]};
    });

    const brStyles = useAnimatedStyle(() => {
        let radius = interpolate(translateX.value, inputRange, [0, BOX_SIZE / 2, 0], Extrapolate.CLAMP);
        return {borderRadius: radius};
    });

    const rTextStyles = useAnimatedStyle(() => {
        let translateY = interpolate(translateX.value, inputRange, [200, 0, -200], Extrapolate.CLAMP);
        let opacity = interpolate(translateX.value, inputRange, [-2, 1, -2], Extrapolate.CLAMP);
        return {transform: [{translateY}], opacity};
    });

    return (
        <View style={[styles.pageContainer, {backgroundColor: `rgba(0,0,256, 0.${index + 2})`}]}>
            <Animated.View style={[styles.box, rStyle, brStyles]} />
            <Animated.View style={[{position: 'absolute'}, rTextStyles]}>
                <Text style={styles.text}>{title}</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: BOX_SIZE,
        height: BOX_SIZE,
        backgroundColor: 'rgba(0,0,256, 0.4)',
    },
    text: {color: '#FFF', fontSize: 50},
});

export default Page;
