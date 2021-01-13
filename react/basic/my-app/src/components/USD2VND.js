import React, { Component } from "react";
 
const USDtoVND = function (props) {
  const convert = function (usd) {
    return usd * 23632;
  };
  return (
    <div>
      <span>USD </span>
      <input
        onChange={(e) => {
          const usd = e.target.value;
          const vnd = convert(usd);
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

export default USDtoVND;