import React, { Component } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props)

    this.zoomView1 = new Animated.Value(1)
    this.fadeView1 = new Animated.Value(0)

    this.zoomView2 = new Animated.Value(1)
    this.fadeView2 = new Animated.Value(0)
  }

  runAnimation() {
    this.zoomView1.setValue(1)
    this.fadeView1.setValue(0)
    this.zoomView2.setValue(1)
    this.fadeView2.setValue(0)

    Animated.parallel([
      Animated.timing(this.zoomView1, {
        toValue: 1.75,
        duration: 1500,
        easing: Easing.linear,
        delay: 0
      }),
      Animated.timing(this.fadeView1, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        delay: 0
      }),
      Animated.timing(this.zoomView2, {
        toValue: 1.75,
        duration: 2000,
        easing: Easing.linear,
        delay: 500
      }),
      Animated.timing(this.fadeView2, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        delay: 500
      })
    ]).start(() => this.runAnimation())
  }

  componentDidMount() {
    // setTimeout(() => {
    //     this.props.navigation.navigate('HomeScreen', {})
    // }, 3000);

    this.runAnimation()
  }

  render() {
    let bounceFadeView1 = this.fadeView1.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.0, 0.9, 0.0]
    })
    let bounceFadeView2 = this.fadeView2.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.0, 0.9, 0.0]
    })

    return (
      <View style={styles.container}>
        {/*First circle*/}
        <Animated.View
          style={[styles.viewWrapCircle, { transform: [{ scale: this.zoomView1 }], opacity: bounceFadeView1 }]}
        />
        {/*Second circle*/}
        <Animated.View
          style={[styles.viewWrapCircle, { transform: [{ scale: this.zoomView2 }], opacity: bounceFadeView2 }]}
        />
       
        <View style={styles.viewGreenCircle} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  viewGreenCircle: {
    width: 16,
    height: 16,
    backgroundColor: '#7FB900',
    borderRadius: 10,
    position: 'absolute'
  },
  viewWrapCircle: {
    width: 100,
    height: 100,
    backgroundColor: '#D0E5A3',
    borderRadius: 50,
    position: 'absolute'
  }
})
