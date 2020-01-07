import React, {Component} from 'react';

import {View, ActivityIndicator, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '~/components/Header';
import api from '~/services/api';

import Icon from 'react-native-vector-icons/FontAwesome';
import RepositoryItem from './RepositoryItem';
import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="list-alt" size={20} color={tintColor} />
    ),
  };

  state = {
    data: [],
    loading: true,
  };

  loadRepositories = async () => {
    const username = await AsyncStorage.getItem('@Githuber:username');

    const {data} = await api.get(`/users/${username}/repos`);

    this.setState({
      data,
      loading: false,
      refreshing: false,
    });
  };

  componentDidMount() {
    this.loadRepositories();
  }

  renderListItem = ({item}) => <RepositoryItem repository={item} />;

  renderList = () => {
    const {data, refreshing} = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const {loading} = this.state;
    return (
      <View style={styles.container}>
        <Header title="Repositorios" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}
