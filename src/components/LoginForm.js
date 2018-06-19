import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {emailChanged, passwordChanged, loginUser} from "../actions";
import {Card, CardSection, Input, Button, Spinner} from './common';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.renderError = this.renderError.bind(this);
        this.renderButton = this.renderButton.bind(this)
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const {email, password} = this.props;
        this.props.loginUser({email, password});
    }

    renderError() {
        const {errorContainerStyle, errorTextStyle} = styles;
        if (this.props.error) {
            return (
                <View style={errorContainerStyle}>
                    <Text style={errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size='large'/>
        }
        else
            return (
                <Button onPress={this.onButtonPress}>
                    Login
                </Button>
            )
    }

    render() {
        const {email, password} = this.props;
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChange}
                        value={email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange}
                        value={password}
                    />
                </CardSection>
                {this.renderError()}
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    errorContainerStyle: {
        backgroundColor: '#fff'
    }
};

const mapStateToProps = state => {
    const {email, password, error, loading} = state.auth;
    return {
        email,
        password,
        error,
        loading
    }
};

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser,

})(LoginForm);
