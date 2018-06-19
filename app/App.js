/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import HomeScreen from './Home.Screen'
import LaunchScreen from './Launch.Screen'

const RootStack = StackNavigator({
  HomeScreen: {screen: HomeScreen},
  LaunchScreen: {screen: LaunchScreen}
},{
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
})

export default class App extends Component {
  render() {
    return <RootStack />
  }
}
