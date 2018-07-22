import React, { Component } from "react";
import "./well.css";

import TerminoLContainer from "../terminoL/index";

class Well extends Component {
  state = {
    spacesOpen: [],
    spacesOccupied: [],
    next: false,
    terminos: [1],
    gameOver: false
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
          background: "black",
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
        color: "#c5fab0",
        textAlign: "center"
      };
      spaces.push(
        <span key={`col1/row${row}`} id={`col1/row${row}`} style={style}>
          {`<!`}
        </span>
      );
    }

    for (let col = 2; col <= 20; col++) {
      const style = {
        gridColumn: `${col} / span 1`,
        gridRow: `30 / span 1`,
        background: "#000",
        color: "#c5fab0",
        textAlign: "center",
        position: "relative"
      };
      spaces.push(
        <span key={`col${col}/row30`} id={`col${col}/row30`} style={style}>
          =
        </span>
      );
    }

    for (let row = 1; row <= 30; row++) {
      const style = {
        gridColumn: "21 / span 1",
        gridRow: `${row} / span 1`,
        background: "black",
        color: "#c5fab0",
        textAlign: "center"
      };
      spaces.push(
        <span key={`col21/row${row}`} id={`col21/row${row}`} style={style}>
          {`!>`}
        </span>
      );
    }
    this.setState({ spacesOpen: spaces });
  }

  updateOccupied = spacesToOccupy => {
    const { startingRow, height, length, startingColumn } = spacesToOccupy;

    if (startingRow < height) {
      this.setState({ gameOver: true });
    }

    // const newSpacesOccupied = this.state.spacesOccupied;
    let newSpacesOpen = this.state.spacesOpen;

    for (let row = startingRow; row <= startingRow + height; row++) {
      const style = {
        gridArea: `${row} / ${startingColumn} / span 1 / span 1`,
        background: "#c5fab0",
        border: "1px solid darkgrey"
      };

      const squareGoneIndex = newSpacesOpen.findIndex(
        square => square.props.id === `col${startingColumn}/row${row}`
      );

      newSpacesOpen = [
        ...newSpacesOpen.slice(0, squareGoneIndex),
        <span
          key={`col${startingColumn}/row${row}`}
          id={`col${startingColumn}/row${row}`}
          style={style}
        />,
        ...newSpacesOpen.slice(squareGoneIndex + 1)
      ];

      // newSpacesOccupied.push(
      //   <span
      //     key={`col${startingColumn}/row${row}`}
      //     id={`col${startingColumn}/row${row}`}
      //     style={style}
      //   />
      // );
    }

    for (let col = startingColumn; col <= startingColumn + length - 1; col++) {
      const style = {
        gridArea: `${startingRow + height} / ${col} / span 1 / span 1`,
        background: "#c5fab0",
        border: "1px solid darkgrey"
      };

      const squareGoneIndex = newSpacesOpen.findIndex(
        square => square.props.id === `col${col}/row${startingRow + height}`
      );

      newSpacesOpen = [
        ...newSpacesOpen.slice(0, squareGoneIndex),
        <span
          key={`col${col}/row${startingRow + height}`}
          id={`col${col}/row${startingRow + height}`}
          style={style}
        />,
        ...newSpacesOpen.slice(squareGoneIndex + 1)
      ];

      // newSpacesOccupied.push(
      //   <span
      //     key={`col${startingColumn}/row${row}`}
      //     id={`col${startingColumn}/row${row}`}
      //     style={style}
      //   />
      // );
    }

    const newTerminos = this.state.terminos;
    const terminoLength = newTerminos.length - 1;
    const newId = newTerminos[terminoLength] + 1;
    newTerminos.push(newId);

    this.setState({
      spacesOpen: newSpacesOpen,
      next: true,
      terminos: newTerminos
    });
  };

  terminoOptions = [{ vLength: 6, hLength: 2 }, { vLength: 4, hLength: 4 }];

  render() {
    const { gameOver } = this.state;
    return (
      <React.Fragment>
        {!gameOver && (
          <div className="well">
            {this.state.spacesOpen}
            {this.state.terminos.map(terminoId => {
              // console.log(terminoId % 2);
              // console.log(this.terminoOptions[terminoId % 2]);
              return (
                <TerminoLContainer
                  key={terminoId}
                  id={terminoId}
                  updateOccupied={this.updateOccupied}
                  shapeDimensions={this.terminoOptions[0]}
                />
              );
            })}
          </div>
        )}
        {gameOver && (
          <div className="well">
            <h1 className="gameOver">GAME OVER</h1>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Well;
