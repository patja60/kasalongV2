import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged } from '../actions';

class Login extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text.target.value);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text.target.value);
  }

  onButtonPress() {
    //const { email, password } = this.props;
    //this.props.loginUser({ email, password });
    console.log("press press!!")
  }

  render() {
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

                <button className="btn btn-primary btn-block" onClick={this.onButtonPress.bind(this)}>
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

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
  };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged })(Login);
