import React, { Component } from "react";
import Wrapper from "./Wrapper";
import TrailCard from "./TrailCard";
import trails from "./populartrails.json";

class Popular extends Component {
    state = {
        trails
    };
   
  
  render() {
    return (
      <div>
        <Wrapper>
          <div className="container">
          <div className="text-center">
          <h1>Popular Trails</h1>
          </div>       
            <div className="row">
              {this.state.trails.map(trail => (
                <TrailCard
                  key={trail.id}
                  image={trail.image}
                  name={trail.name.toUpperCase()}
                  summary={trail.summary}
                  location={trail.location}
                  stars={trail.stars}
                  length={trail.length}
                  ascent={trail.ascent}
                  descent={trail.descent}
                /> 
               ))}               
            </div> 
          </div>
        </Wrapper>
      </div>
    );
  }
}


export default Popular;

