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
    FlatList,
    Text,
    TextInput,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import ApiUtils from '../ApiUtils'
import NetInfo from '@react-native-community/netinfo'
import moment from 'moment'
import { Actions } from 'react-native-router-flux';

export default class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: '',
            searchData: '',
            pageCount: 0,
            text: ''
        }
    }

    async componentDidMount() {
        this.interval = setInterval(() => {
            if (this.state.pageCount < 49) {
                this.fetchUserData(this.state.pageCount)
            }
        }, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fetchUserData = (pageCount) => {
        NetInfo.fetch().then(async (state) => {
            if (state.isConnected == true) {
                let url = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + pageCount
                let response = await ApiUtils.get(url)
                console.log("response :: ", pageCount)
                if (response != null && response != undefined) {

                    this.setState({
                        pageCount: this.state.pageCount + 1,
                        userData: [...this.state.userData, ...response.hits]
                    });
                    this.state.userData.sort((a, b) => {
                        return moment(a.createdAt).diff(b.createdAt);
                    });
                    this.state.userData.sort(function (a, b) {
                        return a.title.localeCompare(b.title);
                    })
                }
            } else {
                alert('No internet connection')
            }
        });
    }

    searchData = (text) => {
        let tempArry = this.state.userData
        const newData = tempArry.filter(item => {
            let url = item.url != null ? item.url : ""
            const itemData = `${item.author.toUpperCase()} ${url.toUpperCase()} ${item.title.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.includes(textData);
        });

        this.setState({
            searchData: newData,
            text: text
        })

    }

    onScrollHandler = () => {
        this.setState({
            pageCount: this.state.pageCount + 1
        }, () => {
            this.fetchUserData(this.state.pageCount);
        });
    }

    itemSeparator = () => {
        return <View style={{ width: "100%", height: 1, backgroundColor: 'lightgray' }} />
    }

    renderUserData = ({ item, index }) => {
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => {
                    Actions.userDetails({ userDetails: item })
                }} >
                <View style={styles.rowItem} >
                    <Text style={styles.textStyle} >{"Title : " + item.title}</Text>
                    <Text style={styles.textStyle} >{"Url : " + item.url}</Text>
                    <Text style={styles.textStyle} >{"Created At : " + moment(item.created_at).format('MM-DD-YYYY HH:MM')}</Text>
                    <Text style={styles.textStyle} >{"Auther : " + item.author}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => {
                        if (text.length > 0) {
                            this.searchData(text)
                        } else {
                            this.setState({ text: '', })
                        }
                    }}
                    underlineColorAndroid='transparent'
                    placeholder="Search Here" />
                <FlatList
                    style={styles.listStyle}
                    data={this.state.text.length > 0 ? this.state.searchData : this.state.userData}
                    extraData={this.state}
                    renderItem={this.renderUserData}
                    ItemSeparatorComponent={this.itemSeparator}
                    onEndReached={this.onScrollHandler}
                    onEndThreshold={0}
                    keyExtractor={(item, index) => item.key}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textInput: {
        textAlign: 'center',
        height: 42,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 8,
        backgroundColor: "#FFFF",
        margin: 16
    },
    listStyle: {
        flex: 1
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


