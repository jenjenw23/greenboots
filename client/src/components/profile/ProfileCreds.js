import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const { experience } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          {exp.location === '' ? null : (
            <span>
<<<<<<< Updated upstream
              <strong>Location: </strong> {exp.location}
=======
              <strong>trail: </strong> {exp.trail}
>>>>>>> Stashed changes
            </span>
          )}
        </p>
        <p>
          {exp.description === '' ? null : (
            <span>
<<<<<<< Updated upstream
              <strong>Description: </strong> {exp.description}
=======
              <strong>Location: </strong> {exp.location}
>>>>>>> Stashed changes
            </span>
          )}
        </p>
      </li>
    ));

 
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
