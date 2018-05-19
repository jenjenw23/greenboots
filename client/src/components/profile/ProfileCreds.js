import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { experience } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.trails}</h4>
        <p>
          {exp.location === "" ? null : (
            <span>
              <strong>Trail Name: </strong> {exp.location}
            </span>
          )}
        </p>
        <p>
          <strong>Date: </strong>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment>
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">Trails Taken</h3>
            {expItems.length > 0 ? (
              <ul className="list-group">{expItems}</ul>
            ) : (
              <p className="text-center">No Trails Listed</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
