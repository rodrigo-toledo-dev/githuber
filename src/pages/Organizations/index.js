import React, {Component} from 'react';

import {View, ActivityIndicator, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '~/components/Header';
import api from '~/services/api';

import Icon from 'react-native-vector-icons/FontAwesome';
import OrganizationItem from './OrganizationItem';
import styles from './styles';

export default class Organizations extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="list-alt" size={20} color={tintColor} />
    ),
  };

  state = {
    data: [],
    loading: true,
  };

  loadOrganizations = async () => {
    const username = await AsyncStorage.getItem('@Githuber:username');

    const {data} = await api.get(`/users/${username}/orgs`);

    this.setState({
      data,
      loading: false,
      refreshing: false,
    });
  };

  componentDidMount() {
    this.loadOrganizations();
  }

  renderListItem = ({item}) => <OrganizationItem organization={item} />;

  renderList = () => {
    const {data, refreshing} = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadOrganizations}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const {loading} = this.state;
    return (
      <View style={styles.container}>
        <Header title="Organizações" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}
