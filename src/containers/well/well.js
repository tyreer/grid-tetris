import React, { Component } from "react";
import "./well.css";

import TerminoLContainer from "../terminoL/index";

class Well extends Component {
  state = {
    spacesOpen: [],
    spacesOccupied: [],
    next: false
  };

  // RANGE
  // grid-column: 1 / span 1;
  // grid-column: 20 / span 1;

  // grid-row: 1 / span 1;
  // grid-row: 30 / span 1;

  componentDidMount() {
    let spaces = [];
    for (let row = 1; row <= 29; row++) {
      for (let col = 2; col <= 20; col++) {
        const style = {
          gridColumn: `${col} / span 1`,
          gridRow: `${row} / span 1`,
          background: "red",
          border: "1px solid white"
        };
        spaces.push(
          <span
            key={`col${col}/row${row}`}
            id={`col${col}/row${row}`}
            style={style}
          />
        );
      }
    }

    for (let row = 1; row <= 30; row++) {
      const style = {
        gridColumn: "1 / span 1",
        gridRow: `${row} / span 1`,
        background: "black",
        border: "1px solid red"
      };
      spaces.push(
        <span key={`col1/row${row}`} id={`col1/row${row}`} style={style} />
      );
    }

    for (let col = 2; col <= 20; col++) {
      const style = {
        gridColumn: `${col} / span 1`,
        gridRow: `30 / span 1`,
        background: "black",
        border: "1px solid red"
      };
      spaces.push(
        <span key={`col${col}/row30`} id={`col${col}/row30`} style={style} />
      );
    }

    for (let row = 1; row <= 30; row++) {
      const style = {
        gridColumn: "21 / span 1",
        gridRow: `${row} / span 1`,
        background: "black",
        border: "1px solid red"
      };
      spaces.push(
        <span key={`col21/row${row}`} id={`col21/row${row}`} style={style} />
      );
    }
    this.setState({ spacesOpen: spaces });
  }

  updateOccupied = spacesToOccupy => {
    const { startingRow, height, length } = spacesToOccupy;
    const newSpacesOccupied = this.state.spacesOccupied;
    let newSpacesOpen = this.state.spacesOpen;

    for (let row = startingRow; row <= startingRow + height; row++) {
      const style = {
        gridArea: `${row} / 2 / span 1 / span 1`,
        background: "green",
        border: "1px solid lightgrey"
      };

      const squareGoneIndex = newSpacesOpen.findIndex(
        square => square.props.id === `col2/row${row}`
      );

      newSpacesOpen = [
        ...newSpacesOpen.slice(0, squareGoneIndex),
        ...newSpacesOpen.slice(squareGoneIndex + 1)
      ];

      newSpacesOccupied.push(
        <span key={`col2/row${row}`} id={`col2/row${row}`} style={style} />
      );
    }

    this.setState({
      spacesOccupied: newSpacesOccupied,
      spacesOpen: newSpacesOpen,
      next: true
    });
  };

  render() {
    return (
      <div className="well">
        {this.state.spacesOpen}
        {this.state.spacesOccupied}
        <TerminoLContainer updateOccupied={this.updateOccupied} />
        {this.state.next && (
          <TerminoLContainer updateOccupied={this.updateOccupied} />
        )}
      </div>
    );
  }
}

export default Well;
