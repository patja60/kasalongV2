import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions";

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.onSignout = this.onSignout.bind(this);
  }
  onSignout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
      <h1 className="display4">Loading...</h1>
      <Link
        onClick={this.onSignout}
        to="/"
        className="btn btn-secondary btn-block"
      >
        Logout
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
)(LoadingScreen);
