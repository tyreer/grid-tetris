import React, { Component } from "react";
import { func, number, object } from "prop-types";

import Termino from "../../components/termino";
import move from "../../assets/move.mp3";
import drop from "../../assets/drop.mp3";

class TerminoContainer extends Component {
  static propTypes = {
    spacesToOccupy: func,
    id: number,
    shapeDimensions: object
  };

  state = {
    startingRow: 0,
    settled: false,
    column: Math.floor(Math.random() * 16) + 2,
    done: []
  };

  constDownwardTimer;
  moveAudio;
  dropAudio;

  componentDidMount() {
    this.constDownwardTimer = setInterval(() => {
      this.moveDown();
    }, 100000);

    window.addEventListener("keydown", e => this.handleKeydown(e.keyCode));
    this.moveAudio = document.getElementById("move");
    this.dropAudio = document.getElementById("drop");
  }

  componentDidUpdate() {
    const { hLength, vLength } = this.props.shapeDimensions;
    //Id of square below current termino's bottom

    let checks = [];

    for (let x = 0; x <= hLength; x++) {
      const thisCheck = document.getElementById(
        `col${this.state.column + x}/row${this.state.startingRow + vLength + 1}`
      );
      checks.push(thisCheck);
    }

    let stop = false;

    checks.map(check => {
      if (check.style.backgroundColor !== "black") {
        stop = true;
      }
      return false;
    });

    if (!this.state.settled && stop) {
      this.dropAudio.currentTime = 0;
      this.dropAudio.play();
      const newDone = this.state.done;
      newDone.push(this.props.id);
      this.setState({ settled: true, done: newDone });
      clearInterval(this.constDownwardTimer);
      this.props.updateOccupied({
        startingColumn: this.state.column,
        startingRow: this.state.startingRow + 1,
        height: 5,
        length: 3
      });
    }
  }

  handleKeydown = key => {
    let newColumn = this.state.column;
    if (key === 37 && newColumn > 2) {
      newColumn = newColumn - 1;
      this.setState({ column: newColumn });
      this.moveAudio.currentTime = 0;
      this.moveAudio.play();
    } else if (key === 39 && newColumn < 17) {
      newColumn = newColumn + 1;
      this.setState({ column: newColumn });
      this.moveAudio.currentTime = 0;
    } else if (key === 32) {
      console.log("Man, sure would be great to rotate rn");
    }
  };

  moveDown = () => {
    let newStartingRow = this.state.startingRow;
    newStartingRow += 1;
    this.setState({ startingRow: newStartingRow });
  };

  render() {
    const { done } = this.state;
    const { id } = this.props;

    return (
      <React.Fragment>
        <audio id="move" src={move} />
        <audio id="drop" src={drop} />
        {!done.includes(id) && (
          <Termino
            startingRow={this.state.startingRow}
            column={this.state.column}
            id={this.props.id}
            shapeDimensions={this.props.shapeDimensions}
          />
        )}
      </React.Fragment>
    );
  }
}

export default TerminoContainer;
