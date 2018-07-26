import React, { Component } from "react";
import "./well.css";

import TerminoContainer from "../termino/index";

import theme from "../../assets/theme.mp3";

class Well extends Component {
  state = {
    spacesOpen: [],
    next: false,
    terminos: [1],
    gameOver: false,
    startWait: true
  };

  componentDidMount() {
    let spaces = [];
    for (let row = 1; row <= 29; row++) {
      for (let col = 2; col <= 19; col++) {
        const style = {
          gridColumn: `${col} / span 1`,
          gridRow: `${row} / span 1`,
          background: "black",
          border: "1px dotted #c5fab0"
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

    for (let col = 2; col <= 19; col++) {
      const style = {
        gridColumn: `${col} / span 1`,
        gridRow: `30 / span 1`,
        background: "black",
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
    if (!this.state.gameOver) {
      const { startingRow, height, length, startingColumn } = spacesToOccupy;

      if (startingRow < height) {
        document.getElementById("theme").pause();
        this.setState({ gameOver: true });
      }
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
      }

      for (
        let col = startingColumn;
        col <= startingColumn + length - 1;
        col++
      ) {
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
    }
  };

  componentDidUpdate() {
    if (!this.state.gameOver) {
      this.checkFull();
    }
  }

  checkFull = () => {
    for (let row = 29; row >= 20; row--) {
      let fullLineCheck = [];

      for (let col = 2; col <= 19; col++) {
        const thisCheck = document.getElementById(`col${col}/row${row}`);

        if (thisCheck && thisCheck.style.backgroundColor !== "black") {
          fullLineCheck.push(thisCheck);
        }
      }
      if (fullLineCheck.length === 18) {
        fullLineCheck.map(square => {
          square.style.backgroundColor = "black";
          square.style.border = "1px dotted #c5fab0";
        });
        this.fullDown();
      }
    }
  };

  fullDown = () => {
    let newSpacesOpen = this.state.spacesOpen;
    let greenToMoveDown = [];
    // let greenNowBlack = [];

    for (let row = 29; row >= 0; row--) {
      for (let col = 2; col <= 19; col++) {
        const thisCheck = document.getElementById(`col${col}/row${row}`);

        if (thisCheck && thisCheck.style.backgroundColor !== "black") {
          // const aboveGreen = document.getElementById(`col${col}/row${row - 1}`);
          // const belowBlack = document.getElementById(`col${col}/row${row}`);
          // if (aboveGreen && aboveGreen.style.backgroundColor === "black") {
          //   console.log(belowBlack);

          //   greenNowBlack.push(belowBlack);
          // }
          greenToMoveDown.push(thisCheck);
        }
      }

      // greenNowBlack.map(space => {
      //   newSpacesOpen.push(...space);
      // });
    }

    greenToMoveDown.map(square => {
      // Move down by one in grid style value
      const gridArea = square.style.gridArea;
      const gridArray = gridArea.split("/");
      const firstValue = gridArea.split("/")[0].trim();
      const newValue = parseInt(firstValue, 10) + 1;
      gridArray[0] = newValue;
      square.style.gridArea = gridArray.join("/");
      square.style.backgroundColor = "#c5fab0";

      // Move down by one in Id
      // Might want to remove this
      const oldId = square.id;
      const oldRow = square.style.gridRowStart - 1;
      const newRow = parseInt(oldRow, 10) + 1;
      square.id = oldId.replace(oldRow, newRow);

      // const style = {
      //   gridColumn: `${square.style.gridColumnStart} / span 1`,
      //   gridRow: `${oldRow} / span 1`,
      //   background: "black",
      //   border: "1px dotted #c5fab0"
      // };

      // newSpacesOpen.push(<span id={oldId} style={style} />);

      return false;
    });
    this.setState({ spacesOpen: newSpacesOpen });
  };

  handleStart = () => {
    const themeAudio = document.getElementById("theme");
    themeAudio.play();
    this.setState({ startWait: false });
  };

  render() {
    const { gameOver, startWait } = this.state;
    return (
      <React.Fragment>
        <audio id="theme" src={theme} />
        {startWait && (
          <button className="play" onClick={this.handleStart}>
            PLAY
          </button>
        )}
        {!gameOver &&
          !startWait && (
            <div className="well">
              {this.state.spacesOpen}
              {this.state.terminos.map(terminoId => (
                <TerminoContainer
                  key={terminoId}
                  id={terminoId}
                  updateOccupied={this.updateOccupied}
                  gameOver={gameOver}
                />
              ))}
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
