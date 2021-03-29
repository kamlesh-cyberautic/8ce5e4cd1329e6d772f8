import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { UserList, UserDetails } from '../containers'


export default class Route extends Component {

    render() {
        return (
            <Router >
                <Scene
                    key="root"
                    hideNavBar="hideNavBar"
                    hideTabBar="hideTabBar"
                    panHandlers={null} // for disable swiping back in IOS
                    duration={0} // to avoid sliding animation on IOS
                    animationEnabled={true}>
                    <Scene key="userList" hideNavBar="hideNavBar" component={UserList} initial={true} />
                    <Scene key="userDetails" hideNavBar="hideNavBar" component={UserDetails} />
                </Scene>
            </Router>
        );
    }
}


