import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Pages/Homepage/homepage.component';
import ShopPage from './Pages/Shop/shop.component';
import Header from './Components/Header/header.component'
import SignInSignUp from './Pages/Sign-In-Sign-Out/sign-in-sign-up.component';
import { auth } from './Firebase/firebase.utils';

import './App.css';


class App extends React.Component {
  constructor() {
    super();

    this.state= {
      currentUser:null
    };
  }

unsubcribeFromAuth = null

  componentDidMount() {
    auth.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }

  render() {
    return(
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInSignUp} />
        </Switch>      
      </div>
    );
  }
}

export default App;
