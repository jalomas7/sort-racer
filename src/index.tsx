import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GameContextProvider } from "./providers";

const basePath = (process.env.REACT_APP_BASE_PATH || "/");
console.log(basePath);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={basePath}>
      <Switch>
        <Route exact path='/'>
          <GameContextProvider players={["player 1", "player 2"]}>
            <App />
          </GameContextProvider>
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
