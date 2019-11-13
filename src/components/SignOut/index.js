import React from 'react';
import { withFirebase } from '../Firebase'; 
import { withRouter } from 'react-router-dom';
import './SignOut.css';
import Routes from '../../constants';

const SignOut = () => (
    <SignOutService />
  );

class SignOutPage extends React.Component {
    
    constructor(props) {
        super(props);

        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        this.props.firebase
        .doSignOut()
        .then(response => {
            console.log(response);
            this.props.history.push(Routes.LANDING);
        },
        error => {
            console.log(error);
        });
    }
    
    render() {
        return (
            <div>
                <h1>SignOut</h1>
                <div>Are you sure?</div>
                <button className="btn btn-primary" onClick={this.signOut}>Yes</button>
            </div>
        );
    }
}

const SignOutService = withRouter(withFirebase(SignOutPage));

export default SignOut;

export { SignOutService };