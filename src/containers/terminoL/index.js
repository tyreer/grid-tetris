import React, { Component } from "react";
import { func } from "prop-types";

import TerminoL from "../../components/terminoL";

class TerminoLContainer extends Component {
  static propTypes = {
    spacesToOccupy: func
  };

  state = {
    startingRow: 0,
    settled: false
  };

  hereSpans = [];
  constDownwardTimer;

  componentDidMount() {
    this.hereSpans = document.querySelectorAll(".activeTermino");
    this.constDownwardTimer = setInterval(() => {
      this.moveDown();
    }, 500);
  }

  componentDidUpdate() {
    //Id of one below current element
    const check = document.getElementById(
      `col2/row${this.state.startingRow + 7}`
    );

    if (!this.state.settled && check.style.backgroundColor !== "red") {
      this.setState({ settled: true });
      clearInterval(this.constDownwardTimer);
      this.props.updateOccupied({
        startingRow: this.state.startingRow + 1,
        height: 5,
        length: 3
      });
    }
  }

  moveDown = () => {
    let newStartingRow = this.state.startingRow;
    newStartingRow += 1;
    this.setState({ startingRow: newStartingRow });

    // for (let x = 0; x < this.hereSpans.length; x++) {
    //   this.hereSpans[x].style.transform = `TranslateY(${
    //     this.state.vertical
    //   }px)`;
    // }
  };

  render() {
    return <TerminoL startingRow={this.state.startingRow} />;
  }
}

export default TerminoLContainer;
