import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Home } from "./Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import queryString from "query-string";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/"
        exact
        render={props => {
          console.log(props.location.search);
          const parsed = queryString.parse(props.location.search);
          console.log(parsed);
          const page = parsed.page ? parseInt(parsed.page, 10) : 1;
          const pageNotNan = Number.isNaN(page) ? 1 : page;

          return <Home currentPage={pageNotNan} />;
        }}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
