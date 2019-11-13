import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../../constants/';

const Navigation = ({ authUser }) => (
    <div>
        {
            authUser ? <NavigationAuth /> : <NavigationNonAuth />
        }
    </div>
);

const NavigationAuth = () => (
    <div>
        <ul>
            <li>
                <Link to={Routes.LANDING}>Home</Link>
            </li>
            <li>
                <Link to={Routes.CHAT}>Chat</Link>
            </li>
            <li>
                <Link to={Routes.SIGN_OUT}>Sign Out</Link>
            </li>
            <li>
                <Link to={Routes.RESETPASSWORD}>ResetPassword</Link>
            </li>
        </ul>
    </div>
);

const NavigationNonAuth = () => (
    <div>
        <li>
            <Link to={Routes.LANDING}>Home</Link>
        </li>
        <li>
            <Link to={Routes.SIGN_IN}>Sign In</Link>
        </li>
        <li>
            <Link to={Routes.SIGN_UP}>Sign Up</Link>
        </li>
    </div>
);

export default Navigation;