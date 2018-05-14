import React, { Component } from "react";
import { Link } from "react-router-dom";
//Why PropTypes? we're mapping state to props meaning we are going to have a property
//whenever you have properties in your components you should have PropTypes
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  //prevent people from typing in /login when they are already logged in.  That would be weird
  //we now have access to this since we brought auth.state into auth property
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">WELCOME</h1>
                <p className="lead">
                  {" "}
                  Create a hiking profile, share posts and connect with other
                  hikers
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Landing.PropTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Landing);
