/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Route from './src/route'
export default class App extends Component {

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={'dark-content'} />
        <Route />
      </SafeAreaView>
    );
  }
};


