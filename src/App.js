import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';

import HomePage from './Pages/Homepage/homepage.component';
import ShopPage from './Pages/Shop/shop.component';
import SignInSignUp from './Pages/Sign-In-Sign-Out/sign-in-sign-up.component';
import CheckoutPage from './Pages/Checkout/checkout.component';
import Header from './Components/Header/header.component'

import { auth, createUserProfileDocument } from './Firebase/firebase.utils';

import { setCurrentUser } from './Redux/User/user.actions';
import { selectCurrentUser } from './Redux/User/user.selector';

import './App.css';


class App extends React.Component {
  unsubcribeFromAuth = null;

  componentDidMount() {
const {setCurrentUser} = this.props;

    auth.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }

  render() {
    return(
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path= '/checkout' component={CheckoutPage} />
          <Route
          exact 
          path='/signin' 
          render={() => 
            this.props.currentUser ? (
              <Redirect to='/' />
              ) : (
              <SignInSignUp/>
              )
            } 
          />
        </Switch>      
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
