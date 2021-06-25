import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { SurveyPage } from "./Survey";

import "bootstrap/dist/css/bootstrap.css";

export default function SurveyJSReactApplication() {
  return (
    <Router>
        <Switch>
          <Route path="/">
            <SurveyPage />
          </Route>
        </Switch>
    </Router>
  );
}
