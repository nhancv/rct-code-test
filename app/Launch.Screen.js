import React, {Component} from 'react';
import {Animated, Platform, StyleSheet, View} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class LaunchScreen extends Component {

    constructor(props) {
        super(props);

        this.zoomView1 = new Animated.Value(1);
        this.fadeView1 = new Animated.Value(0);

        this.zoomView2 = new Animated.Value(1);
        this.fadeView2 = new Animated.Value(0);
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('HomeScreen', {})
        }, 3000);
        this.zoomView1.setValue(1);
        this.zoomView1.setValue(0);
        this.zoomView2.setValue(1);
        this.zoomView2.setValue(0);

        Animated.loop(
            Animated.parallel([
                Animated.timing(this.zoomView1, {
                    toValue: 5,
                    duration: 2000,
                }),
                Animated.timing(this.fadeView1, {
                    toValue: 1,
                    duration: 2000,
                }),
            ])
        ).start();

        Animated.loop(
            Animated.parallel([
                Animated.timing(this.zoomView2, {
                    toValue: 5,
                    duration: 2000,
                    delay: 400,
                }),
                Animated.timing(this.fadeView2, {
                    toValue: 1,
                    duration: 2000,
                    delay: 400,
                }),
            ])
        ).start();
    }

    render() {
        let bounceFadeView1 = this.fadeView1.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0.0, 1.0, 0.2],
        });
        let bounceFadeView2 = this.fadeView2.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0.0, 1.0, 0.2],
        });

        return (
            <View style={styles.container}>
                {/*First circle*/}
                <Animated.View
                    style={[styles.viewWrapCircle, {transform: [{scale: this.zoomView1}], opacity: bounceFadeView1}]}/>
                {/*Second circle*/}
                <Animated.View
                    style={[styles.viewWrapCircle, {transform: [{scale: this.zoomView2}], opacity: bounceFadeView2}]}/>
                <View style={styles.viewGreenCircle}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    viewGreenCircle: {
        width: 20,
        height: 20,
        backgroundColor: '#7FB900',
        borderRadius: 10,
        position: 'absolute'
    },
    viewWrapCircle: {
        width: 20,
        height: 20,
        backgroundColor: '#D0E5A3',
        borderRadius: 25,
        position: 'absolute'
    }
});
