import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loaderWrapper">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="text">
        Please wait while the initial data is loading...
      </div>
    </div>
  );
}
