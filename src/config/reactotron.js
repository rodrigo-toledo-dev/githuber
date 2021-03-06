import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';

if(__DEV__){
  const tron = Reactotron
    .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure({
      name: "RT GitHubber"
    }) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect() // let's connect!

    console.tron = tron;
    tron.clear();
}
