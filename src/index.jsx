import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

// auth cache
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("auth") ?? "fail"}`;

ReactDOM.render(<App />, document.querySelector("#app"));