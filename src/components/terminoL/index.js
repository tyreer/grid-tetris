import React from "react";
import "./style.css";

const terminoL = () => {
  const shapeDimensions = { vLength: 6, hLength: 2 };

  let verticalElementArray = [];

  for (let x = 1; x <= shapeDimensions.vLength; x++) {
    const style = {
      gridColumn: "0 / span 1",
      gridRow: `${0 + x} / span 1`,
      background: "#c5fab0",
      border: "1px solid darkgrey"
    };

    verticalElementArray.push(
      <span key={`vertical${x}`} className="activeTermino" style={style} />
    );
  }

  let horizontalElementArray = [];

  for (let x = 1; x <= shapeDimensions.hLength; x++) {
    const style = {
      gridColumn: `${1 + x} / span 1`,
      gridRow: `${shapeDimensions.vLength} / span 1`,
      background: "#c5fab0",
      border: "1px solid darkgrey"
    };

    horizontalElementArray.push(
      <span key={`horizontal${x}`} className="activeTermino" style={style} />
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
