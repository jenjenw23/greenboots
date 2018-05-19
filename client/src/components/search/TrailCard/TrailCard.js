import React from "react";
import "./TrailCard.css";
import { Link } from 'react-router-dom';

const TrailCard = props => (
  <div className="trailcard text-left">
  <div className="row"> <h2>{props.name}</h2> </div>
  <div className="row">
    <div className="col-md-3">
      <div className="img-container"> <img alt={props.name} src={props.image} /> </div>
    </div>
    <div className="col-md-9 ">
    <p>{props.summary}</p>
    <ul>
      <li>Location: {props.location} </li>
      <li>Rating: {props.stars} </li>
      <li>Length: {props.length} miles </li>
      <li>Ascent: {props.ascent} </li>
      <li>Descent: {props.descent} </li>
      </ul>
      {/* <Link to="#" className="btn btn-sm btn-primary" trailid={props.id}>Add to Favorites</Link> */}
    </div>
  </div>
</div>
);

export default TrailCard;