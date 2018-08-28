import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  logoutUser
} from '../actions';

class Register extends Component {
  onSignout() {
    this.props.logoutUser();
  }
  render() {
    return (
      <div>
        <h1>This is Register Page</h1>
        <Link to="/" onClick={this.onSignout.bind(this)} className="btn btn-primary btn-block">
        Sign out
        </Link>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(Register);
