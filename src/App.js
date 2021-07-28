import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './Pages/Homepage/homepage.component';
import ShopPage from './Pages/Shop/shop.component';
import Header from './Components/Header/header.component'
import SignInSignUp from './Pages/Sign-In-Sign-Out/sign-in-sign-up.component';
import { auth, createUserProfileDocument } from './Firebase/firebase.utils';
import { setCurrentUser } from './Redux/User/user.actions'

import './App.css';


class App extends React.Component {
  unsubcribeFromAuth = null

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
          <Route path='/signin' component={SignInSignUp} />
        </Switch>      
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
