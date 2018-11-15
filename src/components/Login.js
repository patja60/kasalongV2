import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  usernameChanged,
  passwordChanged,
  loginUserWithFacebook,
  checkLogin,
  loginAdmin,
  loginUser,
  signUp
} from '../actions';

class Login extends Component {
  onUsernameChange(text) {
    this.props.usernameChanged(text.target.value);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text.target.value);
  }

  onLogin() {
    const { username, password } = this.props;
    if(username == 'admin') {
      this.props.loginAdmin(password);
    }else{
      this.props.loginUser(username, password);
    }
  }

  onSignUp() {
    const { username, password } = this.props;
    this.props.signUp(username, password);
  }

  render() {
    const { user } = this.props;
    console.log("redirect login");
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
                  onClick={this.onLogin.bind(this)}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  user: PropTypes.object
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
  { usernameChanged, passwordChanged, loginAdmin, loginUser }
)(Login);
