import React from 'react';
import { withFirebase } from '../Firebase'; 
import { withRouter } from 'react-router-dom';
import './SignUp.css';
import Routes from '../../constants';

const SignUp = () => (
  <SignUpForm />
);


class SignUpPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      signUpDisabled : true,
      validName: false,
      validEmail: false,
      validPassword: false,
      user: {
        name: '',
        email: '',
        password: ''
      }
    };

    this.shouldEnableSignUp = this.shouldEnableSignUp.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  createUser() {
    const { name, email, password } = this.state.user;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log(authUser);
        this.props.history.push(Routes.CHAT);
        // go home
      })
      .catch(error => {
        console.log(error);
      });
  }

  shouldEnableSignUp() {
    if(this.state.validEmail && this.state.validName && this.state.validPassword) {
      this.setState({
        signUpDisabled: false
      });
    } else {
      this.setState({
        signUpDisabled: true
      });
    }
  }

  validateEmail(e) {
    const { name, value } = e.target;
    const { user } = this.state;
        
    if(value != null || value != undefined || value.length > 5) {
      this.setState({ 
        validEmail: true,
        user: {
          ...user,
          [name]: value
      }
      });
    } else {
      this.setState({
        validEmail: false
      });
    }

    this.shouldEnableSignUp();
  }

  validateName(e) {
    const { name, value } = e.target;
    const { user } = this.state;

    if(value != null || value != undefined || value.length == 5) {
      this.setState({ 
        validName: true,
        user: {
          ...user,
          [name]: value
      }
      });
    } else {
      this.setState({
        validName: false
      });
    }
    this.shouldEnableSignUp();
  }

  validatePassword(e) {
    const { name, value } = e.target;
    const { user } = this.state;

    if(value != null || value != undefined || value.length == 5) {
      this.setState({ 
        validPassword: true,
        user: {
          ...user,
          [name]: value
      }
      });
    } else {
      this.setState({
        validPassword: false
      });
    }
    
    this.shouldEnableSignUp();
  }

  render() {
    return(
      <div className="signup-container col-sm-8 col-md-6 col-lg-6">
        <h1>SignUp</h1>
        <div className="row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" placeholder="" name="name" onChange={this.validateName} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="" name="email" onChange={this.validateEmail} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Email address</label>
            <input type="password" className="form-control" id="password" placeholder="" name="password" onChange={this.validatePassword} />
          </div>
          <button type="button" className="btn btn-primary" disabled={this.state.signUpDisabled} onClick={this.createUser}>Sign up</button>
        </div>
      </div>
    )
  }  
}

const SignUpForm = withRouter(withFirebase(SignUpPage));

export default SignUp;

export { SignUpForm };