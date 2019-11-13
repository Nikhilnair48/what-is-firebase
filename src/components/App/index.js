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

import './App.css';

export default class App extends React.Component {
    render() {
        let appProps = this.props;
        return (
            <Router>
                <div>
                    <Navigation />
                    
                    <h1 />

                    <Route exact path={Routes.LANDING} component={Landing} />
                    <Route path={Routes.CHAT} component={Chat} />
                    <Route path={Routes.SIGN_IN} component={SignIn} />
                    <Route path={Routes.SIGN_UP} component={SignUp} />
                    <Route path={Routes.RESETPASSWORD} component={ResetPassword} />
                </div>
            </Router>
        )
    }
}