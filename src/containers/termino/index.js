import React, { Component } from "react";
import { func, number } from "prop-types";

import Termino from "../../components/termino";
import move from "../../assets/move.mp3";
import drop from "../../assets/drop.mp3";
import rotate from "../../assets/rotate.mp3";

class TerminoContainer extends Component {
  static propTypes = {
    spacesToOccupy: func,
    id: number
  };

  state = {
    startingRow: 0,
    settled: false,
    column: Math.floor(Math.random() * 16) + 2,
    terminoRotation: 0,
    done: []
  };

  constDownwardTimer;
  moveAudio;
  dropAudio;
  // To add other shapes
  terminoOptions = [{ vLength: 6, hLength: 2 }, { vLength: 3, hLength: 5 }];

  componentDidMount() {
    this.constDownwardTimer = setInterval(() => {
      this.moveDown();
    }, 200);

    window.addEventListener("keydown", e => this.handleKeydown(e.keyCode));
    this.moveAudio = document.getElementById("move");
    this.dropAudio = document.getElementById("drop");
    this.rotateAudio = document.getElementById("rotate");
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", e => this.handleKeydown(e.keyCode));
  }

  componentDidUpdate() {
    if (!this.props.gameOver) {
      const { hLength, vLength } = this.terminoOptions[
        this.state.terminoRotation
      ];
      //Id of square below current termino's bottom

      let checks = [];

      for (let x = 0; x <= hLength; x++) {
        const thisCheck = document.getElementById(
          `col${this.state.column + x}/row${this.state.startingRow +
            vLength +
            1}`
        );
        checks.push(thisCheck);
      }

      let stop = false;

      checks.map(check => {
        if (check && check.style.border !== "1px dotted rgb(197, 250, 176)") {
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
          height: vLength - 1,
          length: hLength + 1
        });
      }
    }
  }

  handleKeydown = key => {
    if (!this.props.gameOver) {
      let newColumn = this.state.column;
      const { hLength, vLength } = this.terminoOptions[
        this.state.terminoRotation
      ];
      const shortest = vLength < hLength ? vLength : hLength;
      const midTermino = Math.floor(shortest / 2);

      switch (key) {
        case 37:
          if (newColumn > 2) {
            newColumn = newColumn - 1;
            this.setState({ column: newColumn });
            this.moveAudio.currentTime = 0;
            this.moveAudio.play();
          }
          break;
        case 39:
          if (newColumn < 19 - hLength) {
            newColumn = newColumn + 1;
            this.setState({ column: newColumn });
            this.moveAudio.currentTime = 0;
          }
          break;
        case 32:
          this.rotateAudio.currentTime = 0;
          this.rotateAudio.play();
          const newRotation =
            this.state.terminoRotation === 1
              ? 0
              : this.state.terminoRotation + 1;

          let newCol =
            this.state.terminoRotation === 1
              ? this.state.column + midTermino
              : this.state.column - midTermino;

          if (newCol > 20 - vLength) {
            newCol = 20 - vLength;
          }
          if (newCol < 2) {
            newCol = 2;
          }

          this.setState({
            terminoRotation: newRotation,
            column: newCol
          });

          break;
        case 40:
          this.moveDown();
          break;
        default:
          return null;
      }
    }
  };

  moveDown = () => {
    let newStartingRow = this.state.startingRow;
    newStartingRow += 1;
    this.setState({ startingRow: newStartingRow });
  };

  render() {
    const { done, terminoRotation } = this.state;
    const { id } = this.props;

    return (
      <React.Fragment>
        <audio id="move" src={move} />
        <audio id="drop" src={drop} />
        <audio id="rotate" src={rotate} />
        {!done.includes(id) && (
          <Termino
            startingRow={this.state.startingRow}
            column={this.state.column}
            id={this.props.id}
            shapeDimensions={this.terminoOptions[terminoRotation]}
          />
        )}
      </React.Fragment>
    );
  }
}

export default TerminoContainer;
