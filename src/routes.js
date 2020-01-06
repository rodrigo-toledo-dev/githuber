import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Welcome from '~/pages/Welcome';
import Repositories from '~/pages/Repositories';
import Organizations from '~/pages/Organizations';
import { colors } from '~/styles';

const Routes = (userLogged = false) => createAppContainer(
  createSwitchNavigator(
    {
      Welcome: {
        screen: Welcome,
        navigationOptions: {
          title: 'Bem-vindo'
        }
      },
      User: createBottomTabNavigator({
        Repositories: {
          screen: Repositories,
          navigationOptions: {
            title: 'Repositórios'
          }
        },
        Organizations: {
          screen: Organizations,
          navigationOptions: {
            title: 'Organizações'
          }
        },
      }, {
        tabBarOptions: {
          showIcon: true,
          showLabel: false,
          activeTintColor: colors.white,
          inactiveTintColor: colors.whiteTransparent,
          style: {
            backgroundColor: colors.secondary
          }
        }
      })

    }, {
      initialRouteName: userLogged ? 'User' : 'Welcome'
    }
  )
);

export default Routes;
