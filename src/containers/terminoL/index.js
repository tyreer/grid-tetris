import React, { Component } from "react";

import TerminoL from "../../components/terminoL";

class TerminoLContainer extends Component {
  state = {
    vertical: 0
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
    if (this.state.vertical > 470) {
      clearInterval(this.constDownwardTimer);
    }
  }

  moveDown = () => {
    let newVertical = this.state.vertical;
    newVertical += 10;
    this.setState({ vertical: newVertical });

    for (let x = 0; x < this.hereSpans.length; x++) {
      this.hereSpans[x].style.transform = `TranslateY(${
        this.state.vertical
      }px)`;
    }
  };

  render() {
    return <TerminoL />;
  }
}

export default TerminoLContainer;
