import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createUsernameChanged,
  createPasswordChanged,
  createUser
} from '../actions';

class Dashboard extends Component {
  onCreateUsernameChange(text) {
    this.props.createUsernameChanged(text.target.value);
  }

  onCreatePasswordChange(text) {
    this.props.createPasswordChanged(text.target.value);
  }

  onCreateUser() {
    const { createUsername, createPassword } = this.props;
    this.props.createUser({ createUsername, createPassword });
  }

  render() {
    return (
      <div>
        <h1>Welcome patja admin you are awesome.</h1>

        <div className="card">
          <div className="card-body">
            <h1 className="text-center pb-4 pt-3">
              <span className="text-primary">
                <i className="fas" /> Add user
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
                  value={this.props.createUsername}
                  onChange={this.onCreateUsernameChange.bind(this)}
                />
              </div>

              <div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    name="password"
                    required
                    value={this.props.createPassword}
                    onChange={this.onCreatePasswordChange.bind(this)}
                  />
                </div>

                <button
                  className="btn btn-primary btn-block"
                  onClick={this.onCreateUser.bind(this)}
                >
                  Create User
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
    createUsername: state.admin.createUsername,
    createPassword: state.admin.createPassword,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { createUsernameChanged, createPasswordChanged, createUser }
)(Dashboard);
