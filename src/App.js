import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, ButtonLogout, Spinner, Card, CardSection, } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyAzNXNFJ1IXS6FCx9M30ZSetFhWsYY_MTI',
            authDomain: 'authloginexample-78ead.firebaseapp.com',
            databaseURL: 'https://authloginexample-78ead.firebaseio.com',
            projectId: 'authloginexample-78ead',
            storageBucket: 'authloginexample-78ead.appspot.com',
            messagingSenderId: '1047327658251'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }


    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return <ButtonLogout onPress={() => firebase.auth().signOut()}>Log Out</ButtonLogout>;
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Login Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}


export default App;