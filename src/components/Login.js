import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  emailChanged,
  passwordChanged,
  loginUserWithFacebook,
  checkLogin
} from '../actions';

class Login extends Component {
  componentWillMount() {
    this.props.checkLogin();
  }
  onEmailChange(text) {
    this.props.emailChanged(text.target.value);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text.target.value);
  }

  onButtonPress() {
    //const { email, password } = this.props;
    //this.props.loginUser({ email, password });
    console.log('press press!!');
  }

  onLoginUserWithFacebook() {
    this.props.loginUserWithFacebook();
  }

  render() {
    const { user } = this.props;
    if (user) {
      return <Redirect to="/dashboard" />;
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
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    required
                    value={this.props.email}
                    onChange={this.onEmailChange.bind(this)}
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

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  user: PropTypes.object
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { emailChanged, passwordChanged, loginUserWithFacebook, checkLogin }
)(Login);
