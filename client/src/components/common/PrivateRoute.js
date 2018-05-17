import React from "react";
import { Route, Redirect } from "react-router-dom";
//we are using redux to determine authenticated state this requires connect
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      //checking to see if we are authenticated
      auth.isAuthenticated === true ? (
        //if we are it will load the component
        <Component {...props} />
      ) : (
        //otherwise it will redirect us to the /login
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
