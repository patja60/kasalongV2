import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  usernameChanged,
  passwordChanged,
  loginUserWithFacebook,
  checkLogin,
  loginAdmin
} from '../actions';

class Login extends Component {
  componentWillMount() {
    this.props.checkLogin();
  }
  onUsernameChange(text) {
    this.props.usernameChanged(text.target.value);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text.target.value);
  }

  onButtonPress() {
    const { username, password } = this.props;
    //this.props.loginUser({ email, password });
    if(username == 'admin') {
      this.props.loginAdmin(password);
    }
  }

  onLoginUserWithFacebook() {
    this.props.loginUserWithFacebook();
  }

  render() {
    const { user } = this.props;
    if (user == 'admin') {
      return <Redirect to="/dashboard" />;
    }else if (user) {
      return <Redirect to="/register" />;
    }
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Login
                </span>
              </h1>

              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    required
                    value={this.props.username}
                    onChange={this.onUsernameChange.bind(this)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.props.password}
                    onChange={this.onPasswordChange.bind(this)}
                  />
                </div>

                <button
                  className="btn btn-primary btn-block"
                  onClick={this.onButtonPress.bind(this)}
                >
                  Login
                </button>

                <button
                  className="btn btn-primary btn-block"
                  onClick={this.onLoginUserWithFacebook.bind(this)}
                >
                  Login With Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    password: state.auth.password,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { usernameChanged, passwordChanged, loginUserWithFacebook, checkLogin, loginAdmin }
)(Login);
