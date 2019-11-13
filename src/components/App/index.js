import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from '../Nav';
import Routes from '../../constants';
import { Route } from 'react-router-dom';

import Chat from '../Chat';
import Landing from '../Landing';
import ResetPassword from '../ResetPassword';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import SignOut from '../SignOut';

import { withFirebase } from '../Firebase';

import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authUser: null
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
          authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
        });
    }

    componentWillUnmount() {
        this.listener();
    }

    render() {
        return (
            <Router>
                <div>
                    <Navigation authUser={this.state.authUser} />
                    
                    <h1 />

                    <Route exact path={Routes.LANDING} component={Landing} />
                    <Route path={Routes.CHAT} component={Chat} />
                    <Route path={Routes.SIGN_IN} component={SignIn} />
                    <Route path={Routes.SIGN_UP} component={SignUp} />
                    <Route path={Routes.SIGN_OUT} component={SignOut} />
                    <Route path={Routes.RESETPASSWORD} component={ResetPassword} />
                </div>
            </Router>
        )
    }
}

export default withFirebase(App);