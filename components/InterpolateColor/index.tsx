import React, {useState} from 'react';
import {StyleSheet, Switch} from 'react-native';
import Animated, {interpolateColor, useAnimatedStyle, useDerivedValue, withTiming} from 'react-native-reanimated';

type ThemeType = 'light' | 'dark';
const colors = {
    darkTheme: {backgroundColor: '#262626', text: '#e1e1e1'},
    lightTheme: {backgroundColor: '#ffffff', text: '#262626'},
};

const InterpolateColor = () => {
    const [theme, setTheme] = useState<ThemeType>('light');

    /**
     * useDerivedValue works same like sharedValue but it gives
     * us computed value. Also, we can set a dependency item.
     *
     */
    const appTheme = useDerivedValue(() => {
        return theme === 'dark' ? withTiming(1, {duration: 400}) : withTiming(0, {duration: 400});
    }, [theme]);

    /** These are for background Container */
    const rThemeStyles = useAnimatedStyle(() => {
        let backgroundColor = interpolateColor(appTheme.value, [0, 1], [colors.lightTheme.backgroundColor, colors.darkTheme.backgroundColor]);
        return {backgroundColor};
    });

    /** These are for text styles */
    const tThemeStyles = useAnimatedStyle(() => {
        let color = interpolateColor(appTheme.value, [0, 1], [colors.lightTheme.text, colors.darkTheme.text]);
        return {color};
    });

    return (
        <Animated.View style={[styles.container, rThemeStyles]}>
            <Animated.Text style={[styles.text, tThemeStyles]}>{`Hello to \nReact Native`}</Animated.Text>
            <Switch value={theme === 'dark'} onValueChange={toggled => setTheme(toggled ? 'dark' : 'light')} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 44,
        fontWeight: 'bold',
        marginBottom: 50,
        color: colors.lightTheme.text,
    },
});

export {InterpolateColor};
