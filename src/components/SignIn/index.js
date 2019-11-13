import React from 'react';
import { withFirebase } from '../Firebase'; 
import { withRouter } from 'react-router-dom';
import './SignIn.css';
import Routes from '../../constants';

const SignIn = () => (
  <SignInForm />
);

class SignInPage extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      validEmail: false,
      validPassword: false,
      loginDisabled: true
    };

    this.shouldEnableSignIn = this.shouldEnableSignIn.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.signInUser = this.signInUser.bind(this);
  }

  signInUser() {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log(authUser);
        this.props.history.push(Routes.CHAT);
        // go home
      })
      .catch(error => {
        console.log(error);
      });
  }

  // TO DO: TOO SIMILAR TO THE shouldEnableSignUp method in THE SIGNUP COMPONENT; REFACTOR.
  shouldEnableSignIn() {
    if(this.state.validEmail && this.state.validPassword) {
      this.setState({
        loginDisabled: false
      });
    } else {
      this.setState({
        loginDisabled: true
      });
    }
  }
  
  // TO DO: DUPLICATED FROM SIGNUP COMPONENT; REFACTOR.
  validatePassword(e) {
    const { name, value } = e.target;

    if(value != null && value != undefined && value.length >= 5) {
      this.setState({
        validPassword: true,
        password: value
      });
    } else {
      this.setState({
        validPassword: false
      });
    }
    
    this.shouldEnableSignIn();
  }
  
  // TO DO: DUPLICATED FROM SIGNUP COMPONENT; REFACTOR.
  validateEmail(e) {
    const { name, value } = e.target;
        
    if(value != null && value != undefined && value.length > 5) {
      this.setState({
        validEmail: true,
        email: value
      });
    } else {
      this.setState({
        validEmail: false
      });
    }

    this.shouldEnableSignIn();
  }

  render() {
    return(
      <div className="signin-container col-sm-8 col-md-6 col-lg-6">
        <h1>Sign In</h1>
        <div className="row">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="" name="email" onChange={this.validateEmail} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="" name="password" onChange={this.validatePassword} />
          </div>
          <button type="button" className="btn btn-primary" disabled={this.state.loginDisabled} onClick={this.signInUser}>Sign In</button>
        </div>
      </div>
    )
  }
}

const SignInForm = withRouter(withFirebase(SignInPage));

export default SignIn;

export  { SignInForm };