import React, { Component } from "react";
import { func, string } from "prop-types";

import TerminoL from "../../components/terminoL";

class TerminoLContainer extends Component {
  static propTypes = {
    spacesToOccupy: func,
    id: string
  };

  state = {
    startingRow: 0,
    settled: false,
    column: 2,
    done: []
  };

  constDownwardTimer;

  componentDidMount() {
    this.constDownwardTimer = setInterval(() => {
      this.moveDown();
    }, 100);

    window.addEventListener("keydown", e => this.handleKeydown(e.keyCode));
  }

  componentDidUpdate() {
    //Id of one below current element
    const check = document.getElementById(
      `col${this.state.column}/row${this.state.startingRow + 7}`
    );

    const check2 = document.getElementById(
      `col${this.state.column + 1}/row${this.state.startingRow + 7}`
    );

    const check3 = document.getElementById(
      `col${this.state.column + 2}/row${this.state.startingRow + 7}`
    );

    if (
      !this.state.settled &&
      (check.style.backgroundColor !== "red" ||
        check2.style.backgroundColor !== "red" ||
        check3.style.backgroundColor !== "red")
    ) {
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
          />
        )}
      </React.Fragment>
    );
  }
}

export default TerminoLContainer;
