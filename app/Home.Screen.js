import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default class HomeScreen extends Component {
  perPage = 10
  pageIndex = 1
  totalPage = 1

  fetchData = () => {
    if (this.pageIndex > this.totalPage) return Promise.reject('No more results')

    return fetch(`https://reqres.in/api/users?page=${this.pageIndex}&per_page=${this.perPage}`)
      .then(response => {
        return response.json()
      })
      .then(res => {
        console.log(res)

        this.totalPage = res.total_pages
        if (this.pageIndex <= this.totalPage) this.pageIndex++
        return Promise.resolve(res)
      })
  }

  componentDidMount() {
    this.fetchData().then(
      res => {
        console.log('First fetching data')
      },
      err => {
        console.error(err)
      }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit HomeScreen.js</Text>
        <Button
          onPress={() => {
            this.fetchData().catch(err => {
              console.log(err)
            })
          }}
          title="Load More"
          color="#841584"
        />
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
