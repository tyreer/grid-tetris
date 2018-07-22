import React from "react";
import "./style.css";

const terminoL = ({ startingRow, column, id, shapeDimensions }) => {
  let verticalElementArray = [];

  for (let x = 1; x <= shapeDimensions.vLength; x++) {
    const style = {
      gridColumn: `${column} / span 1`,
      gridRow: `${x + startingRow} / span 1`,
      background: "#c5fab0",
      border: "1px solid darkgrey"
    };

    verticalElementArray.push(
      <span
        key={`col${column}/row${x + startingRow}`}
        id={`col${column}/row${x + startingRow}`}
        className="activeTermino"
        style={style}
        name={id}
      />
    );
  }

  let horizontalElementArray = [];

  for (let x = 1; x <= shapeDimensions.hLength; x++) {
    const style = {
      gridColumn: `${column + x} / span 1`,
      gridRow: `${startingRow + shapeDimensions.vLength} / span 1`,
      background: "#c5fab0",
      border: "1px solid darkgrey"
    };

    horizontalElementArray.push(
      <span
        key={`col${column + x}/row${startingRow + shapeDimensions.vLength}`}
        id={`col${column + x}/row${startingRow + shapeDimensions.vLength}`}
        className="activeTermino"
        style={style}
        name={id}
      />
    );
  }

  return (
    <React.Fragment>
      {verticalElementArray}
      {horizontalElementArray}
    </React.Fragment>
  );
};

export default terminoL;
