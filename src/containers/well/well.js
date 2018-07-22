import React, { Component } from "react";
import "./well.css";

import TerminoLContainer from "../terminoL/index";

class Well extends Component {
  render() {
    return (
      <div className="well">
        <TerminoLContainer />
      </div>
    );
  }
}

export default Well;
