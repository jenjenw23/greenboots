import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Wrapper from "./components/Wrapper";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Wrapper>
          <Navbar />
            <div className="container text-center">
              <div className="row">
               <h1>The magic happens here!</h1>
              </div>
            </div>
          <Footer />
       </Wrapper>
      </div>
    );
  }
}

export default App;
