/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableHighlight
} from 'react-native';
import moment from 'moment'
import { Actions } from 'react-native-router-flux';

export default class UserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const { userDetails } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.rowItem} >
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => {
                            Actions.pop()
                        }} >
                        <Image
                            style={styles.headerBackImageStyle}
                            source={require('../assets/images/back.png')} />
                    </TouchableHighlight>
                </View>
                <View style={styles.rowItem} >
                    <Text style={styles.textStyle} >{"Title : " + userDetails.title}</Text>
                    <Text style={styles.textStyle} >{"Url : " + userDetails.url}</Text>
                    <Text style={styles.textStyle} >{"Created At : " + moment(userDetails.created_at).format('MM-DD-YYYY HH:MM')}</Text>
                    <Text style={styles.textStyle} >{"Auther : " + userDetails.author}</Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerStyle: {
        width: '100%',
        justifyContent: 'center'
    },
    headerBackImageStyle: {
        height: 32,
        width: 32,
        resizeMode: 'contain'
    },
    rowItem: {
        width: "100%",
        padding: 16
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '800'
    }
})
