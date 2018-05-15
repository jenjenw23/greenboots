import React, { Component } from "react";
import Wrapper from "./Wrapper";
import TrailCard from "./TrailCard";

class Search extends Component {
    constructor() {
      super();
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        zipcode: " ",
        lat:  41.8839927,
        long: -87.61970559999997,
        place_formatted: '',
        place_id: '',
        place_location: '',
      };
    }
    componentDidMount() {
    let inputNode = document.getElementById('pac-input');
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

    autoComplete.addListener('place_changed', () => {
      let place = autoComplete.getPlace();

      this.setState({
        place_formatted: place.formatted_address,
        place_id: place.place_id,
        lat: place.geometry.location.lat(),
        long: place.geometry.location.lng()
      });
      console.log(this.state)
    });
    }
  
    zipcodeTranslate = event =>{
    event.preventDefault();
    this.runSearch();
     }

    runSearch(){
      fetch("https://www.hikingproject.com/data/get-trails?lat="+this.state.lat+"&lon="+this.state.long+"&maxDistance=100&key=200251996-70d1290115a9bb02abe242b4a58c7e3b")
        .then(res => res.json())
        .then(
          (response) => {
            this.setState({
              isLoaded: true,
              items: response.trails
            });
            console.log(this.state);
            console.log(response.trails);
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
  render() {
    return (
      <div>
        <Wrapper>
          <div className="container">
          <div className="spacer"></div>
            <div className="row">
              <form>
              <input id='pac-input' className='form-control form-control-lg pac-input' type='text' placeholder='Enter a location, zip code, or address' />
              <button type='submit' className='btn btn-primary' onClick={this.zipcodeTranslate}>Search for Trails</button> 
              </form> 
            </div>  
                   
            <div className="row">
              {this.state.items.map(item => (
                <TrailCard
                  key={item.id}
                  image={item.imgMedium}
                  name={item.name.toUpperCase()}
                  summary={item.summary}
                  location={item.location}
                  stars={item.stars}
                  length={item.length}
                  ascent={item.ascent}
                  descent={item.descent}
                /> 
               ))}               
            </div> 
          </div>
        </Wrapper>
      </div>
    );
  }
}


export default Search;

