import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Pages/Homepage/homepage.component';
import ShopPage from './Pages/Shop/shop.component';
import Header from './Components/Header/header.component'
import SignInSignUp from './Pages/Sign-In-Sign-Out/sign-in-sign-up.component';
import { auth, createUserProfileDocument } from './Firebase/firebase.utils';

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
    auth.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
        });
      }

      this.setState({ currentUser: userAuth });
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
