import React from "react";
import "./style.css";

const terminoL = ({ startingRow }) => {
  const shapeDimensions = { vLength: 6, hLength: 2 };

  let verticalElementArray = [];

  for (let x = 1; x <= shapeDimensions.vLength; x++) {
    const style = {
      gridColumn: "2 / span 1",
      gridRow: `${x + startingRow} / span 1`,
      background: "#c5fab0",
      border: "1px solid darkgrey"
    };

    verticalElementArray.push(
      <span
        key={`col2/row${x + startingRow}`}
        id={`col2/row${x + startingRow}`}
        className="activeTermino"
        style={style}
      />
    );
  }

  let horizontalElementArray = [];

  for (let x = 2; x <= shapeDimensions.hLength + 1; x++) {
    const style = {
      gridColumn: `${1 + x} / span 1`,
      gridRow: `${startingRow + shapeDimensions.vLength} / span 1`,
      background: "#c5fab0",
      border: "1px solid darkgrey"
    };

    horizontalElementArray.push(
      <span
        key={`col${1 + x}/row${startingRow + shapeDimensions.vLength}`}
        id={`col${1 + x}/row${startingRow + shapeDimensions.vLength}`}
        className="activeTermino"
        style={style}
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
