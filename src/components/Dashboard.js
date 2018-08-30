import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createUsernameChanged,
  createPasswordChanged,
  createUser,
  subjectNameChanged,
  subjectIdChanged,
  subjectPasswordChanged,
  createSubject
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

  onSubjectNameChanged(text) {
    this.props.subjectNameChanged(text.target.value);
  }

  onSubjectIdChanged(text) {
    this.props.subjectIdChanged(text.target.value);
  }

  onSubjectPasswordChanged(text) {
    this.props.subjectPasswordChanged(text.target.value);
  }

  onCreateSubject() {
    const { subjectName, subjectId, subjectPassword } = this.props;
    this.props.createSubject({ subjectName, subjectId, subjectPassword });
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

        <div className="card">
          <div className="card-body">
            <h1 className="text-center pb-4 pt-3">
              <span className="text-primary">
                <i className="fas" /> Add Subject
              </span>
            </h1>

            <div>
              <div className="form-group">
                <label htmlFor="subjectName">Subject Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="subjectName"
                  required
                  value={this.props.subjectName}
                  onChange={this.onSubjectNameChanged.bind(this)}
                />
              </div>

              <div>
                <div className="form-group">
                  <label htmlFor="SubjectId">Subject Id</label>
                  <input
                    type="text"
                    className="form-control"
                    name="SubjectId"
                    required
                    value={this.props.subjectId}
                    onChange={this.onSubjectIdChanged.bind(this)}
                  />
                </div>
              </div>

              <div>
                <div className="form-group">
                  <label htmlFor="SubjectPassword">Subject Password</label>
                  <input
                    type="text"
                    className="form-control"
                    name="SubjectPassword"
                    required
                    value={this.props.subjectPassword}
                    onChange={this.onSubjectPasswordChanged.bind(this)}
                  />
                </div>
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={this.onCreateSubject.bind(this)}
              >
                Create Subject
              </button>

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
    subjectName: state.admin.subjectName,
    subjectId: state.admin.subjectId,
    subjectPassword: state.admin.subjectPassword,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { createUsernameChanged,
    createPasswordChanged,
    createUser,
    subjectNameChanged,
    subjectIdChanged,
    subjectPasswordChanged,
    createSubject }
)(Dashboard);
