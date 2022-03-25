import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
