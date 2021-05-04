import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from "./components/App";
import Tweets from "./components/Tweets";

function Main() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/tweets/:number" component={Tweets} />
        <Route path="/tweets">
          <Tweets />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));