import React, {Component} from 'react'
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View} from 'react-native'

export default class HomeScreen extends Component {
  perPage = 10;
  pageIndex = 1;
  totalPage = 1;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isEnd: false,
      data: [],
    }
  }

  renderItem({item}) {
    return (

      <View style={{padding: 10, flexDirection: 'row', width: '100%'}}>
        <Image
          source={{uri: item.avatar}}
          style={{borderRadius: 35, margin: 10, width: 70, height: 70}}
        />
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text style={{color: 'black', marginLeft: 20}}>{item.first_name} {item.last_name}</Text>
        </View>
      </View>
    )
  }

  renderSeparator() {
    return <View style={styles.viewSeparator}/>
  }

  fetchData = () => {

    if (this.pageIndex > this.totalPage) {
      this.setState({
        isLoading: false,
        isEnd: true,
      })
    } else {
      this.setState({
        isLoading: true,
      });

      return fetch(`https://reqres.in/api/users?page=${this.pageIndex}&per_page=${this.perPage}`)
        .then(response => {
          return response.json()
        })
        .then(res => {
          console.log(res);
          this.setState({
            data: [...this.state.data, ...res.data],
            isLoading: false,
          });
          this.totalPage = res.total_pages;
          if (this.pageIndex <= this.totalPage) this.pageIndex++;
          return Promise.resolve(res)
        })
    }
  };

  componentDidMount() {
    this.fetchData().then(
      res => {
        console.log('First fetching data');
      },
      err => {
        console.error(err)
      }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.titleToolbar}>Users</Text>
        </View>
        <FlatList
          style={styles.viewList}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReached={this.fetchData}
          onEndReachedThreshold={0}
        />
        {this.state.isEnd ? <View
          style={styles.viewBottom}>
          <Text style={{color: 'white'}}>No more data</Text>
        </View> : null}
        {this.state.isLoading ? <ActivityIndicator size="large" color="#7FB900"/> : null}
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
  toolbar: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  titleToolbar: {
    color: '#203152',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    flex: 1
  },
  viewSeparator: {
    width: '90%',
    height: 0.5,
    backgroundColor: '#7e8da6',
    alignSelf: 'center'
  },
  viewList: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    height: '100%'
  },
  viewBottom: {
    backgroundColor: '#ffbf00',
    width: '100%',
    padding: 10,
    alignItems: 'center'
  }
});
