import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Details from "../pages/Details";
import Favorite from "../pages/Favorite";

const Routes = () => {
  return (
    <Switch>      
      <Route exact path="/favorite" component={Favorite} />
      <Route exact path="/:category/search/:keyword" component={Catalog} />
      <Route exact path="/:category/:id" component={Details} />
      <Route exact path="/:category" component={Catalog} />
      <Route exact path="/" component={Home} />

    </Switch>
  );
};

export default Routes;
