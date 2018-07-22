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

  shapeDimensions = { vLength: 6, hLength: 2 };

  componentDidMount() {
    this.constDownwardTimer = setInterval(() => {
      this.moveDown();
    }, 100);

    window.addEventListener("keydown", e => this.handleKeydown(e.keyCode));
  }

  componentDidUpdate() {
    //Id of one below current element

    let checks = [];

    for (let x = 0; x <= this.shapeDimensions.hLength; x++) {
      const thisCheck = document.getElementById(
        `col${this.state.column + x}/row${this.state.startingRow +
          this.shapeDimensions.vLength +
          1}`
      );
      checks.push(thisCheck);
    }

    let stop = false;

    checks.map(check => {
      if (check.style.backgroundColor !== "red") {
        stop = true;
      }
    });

    if (!this.state.settled && stop) {
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
      }
    } else if (key === 39) {
      if (newColumn < 18) {
        newColumn = newColumn + 1;
        this.setState({ column: newColumn });
      }
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
            shapeDimensions={this.shapeDimensions}
          />
        )}
      </React.Fragment>
    );
  }
}

export default TerminoLContainer;
