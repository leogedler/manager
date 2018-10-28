import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import * as actions from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {

  onEmailChange = (text) => {
    this.props.emailChanged(text);
  }

  onPasswordChange = (text) => {
    this.props.passwordChanged(text);
  }

  onButtonPress = () => {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }} >
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button
        onPress={this.onButtonPress}
      >
        Login
      </Button>
    );
  }

  render() {
    return (
      <Card >
        <CardSection>
          <Input
            value={this.props.email}
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange}
          />
        </CardSection>
        <CardSection>
          <Input
            value={this.props.password}
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ auth }) => (
  {
    email: auth.email,
    password: auth.password,
    error: auth.error,
    loading: auth.loading
  }
);

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default connect(mapStateToProps, actions)(LoginForm);
