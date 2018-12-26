import * as React from 'react';
import { Text, View, StyleSheet,Alert} from 'react-native';
import { Constants } from 'expo';
import axios from 'axios';
import Settings from 'pages/settings';
import Trending from 'pages/trending';
import { createBottomTabNavigator ,createAppContainer} from 'react-navigation';
import {Icon,Header} from 'react-native-elements'

const Tabs = createBottomTabNavigator(
  {
    Trending : 
    {
      screen : Trending,
      navigationOptions: {
        title: "Trending",
        tabBarIcon : ({focused}) => {
          if(focused ) return (< Icon name='star' color="#00aced" />)
          else return (< Icon name='star' color='#D3D3D3' />)
        }
      }
    },
    Settings : 
    {
      screen : Settings,
      navigationOptions: {
        title: "Settings",
        tabBarIcon : ({focused}) => {
          if(focused ) return (< Icon name='settings' color="#00aced" />)
          else return (< Icon name='settings' color='#D3D3D3' />)
        }
      }
    }
  }
)

const TabsApp = createAppContainer(Tabs);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header outerContainerStyles={{ backgroundColor: '#FFFFFF' }}
        centerComponent={{ text: 'My Trending repos', style: { color: '#0000000',fontSize : 20 } }}
        />
        <TabsApp/>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
   
});
