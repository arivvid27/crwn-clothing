import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Pages/Homepage/homepage.component';
import ShopPage from './Pages/Shop/shop.component.jsx';
import Header from './Components/Header/header.component.jsx'

import './App.css';


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>      
    </div>
  );
}

export default App;
