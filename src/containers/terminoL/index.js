import React, { Component } from "react";
import { func, number } from "prop-types";

import TerminoL from "../../components/terminoL";

class TerminoLContainer extends Component {
  static propTypes = {
    spacesToOccupy: func,
    id: number
  };

  state = {
    startingRow: 0,
    settled: false,
    column: 2,
    done: []
  };

  constDownwardTimer;
  moveAudio;
  dropAudio;

  componentDidMount() {
    this.constDownwardTimer = setInterval(() => {
      this.moveDown();
    }, 200);

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
    if (key === 37) {
      if (newColumn > 2) {
        newColumn = newColumn - 1;
        this.setState({ column: newColumn });
        this.moveAudio.currentTime = 0;
        this.moveAudio.play();
      }
    } else if (key === 39) {
      if (newColumn < 17) {
        newColumn = newColumn + 1;
        this.setState({ column: newColumn });
        this.moveAudio.currentTime = 0;
        this.moveAudio.play();
      }
    } else if (key === 32) {
      //   const newDimensions = this.props.shapeDimensions;
      //   if (!this.state.rotated) {
      //     newDimensions.vLength = this.props.shapeDimensions.hLength + 1;
      //     newDimensions.hLength = this.props.shapeDimensions.vLength + 1;
      //   } else {
      //     console.log(this.props.shapeDimensions.hLength);
      //     newDimensions.hLength = this.props.shapeDimensions.vLength + 1;
      //     newDimensions.vLength = this.props.shapeDimensions.hLength + 2;
      //   }
      //   this.setState({
      // props.shapeDimensions: newDimensions,
      //     rotated: !this.state.rotated
      //   });
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
        {!done.includes(id) && (
          <TerminoL
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

export default TerminoLContainer;
