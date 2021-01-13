import React, { Component } from "react";

const VNDtoUSD = function (props) {
    const convert = function (vnd) {
      return vnd / 23632;
    };
    return (
      <div>
        <span>VND </span>
        <input
          onChange={(e) => {
            const vnd = e.target.value;
            const usd = convert(vnd);
            props.onHandleChange({
              usd,
              vnd,
            });
          }}
          value={props.value}
        />
      </div>
    );
  };

  export default VNDtoUSD;