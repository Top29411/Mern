import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Inventory from './components/Inventory';
import NotFound from './components/NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/Inventory' component={Inventory} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
