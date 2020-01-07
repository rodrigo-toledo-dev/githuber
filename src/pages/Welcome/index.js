import React, { Component } from 'react'

import { View, Text, TextInput, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import api from '~/services/api';
import styles from './styles';
import { colors } from '~/styles';



export default class Welcome extends Component {
  state = {
    username: 'gaearon',
    loading: false,
    error: false,
  }

  checkUserExists = async (username) => {
    const user = await api.get(`/users/${username}`);
    return user;
  }

  saveUser = async (username) => {
    await AsyncStorage.setItem('@Githuber:username', username)
  }

  signIn = async () => {
    const { username } = this.state;
    const { navigation } = this.props;

    this.setState({loading: true});

    try {
      await this.checkUserExists(username);
      await this.saveUser(username);

      navigation.navigate('User');
    } catch (err) {
      this.setState({ loading: false, error: true });
      console.tron.log('usuario nao existe')
    }
  }

  render() {
    const {username, loading, error} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.text}>Para continuar precisamos que você informe seu usuário no github</Text>
        { error && <Text style={styles.error}>Usuário inexistente</Text>}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Digite seu usuário'
            underlineColorAndroid='transparent'

            value={username}
            onChangeText={text => this.setState({username: text})}
          />

          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            {
              loading ? (
                <ActivityIndicator size='small' color={colors.white} />
              ) : (
                <Text style={styles.buttonText}>Prosseguir</Text>
              )
            }
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
