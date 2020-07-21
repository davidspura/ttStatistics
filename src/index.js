import React from "react";
import ReactDOM from "react-dom";
import "./initializeParse";
import "moment-duration-format";
import App from "./App";
import "moment/locale/cs";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
