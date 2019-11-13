import React from 'react';
import { withFirebase } from '../Firebase';
import './Chat.css';
class Chat extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    }
    this.renderMessages = this.renderMessages.bind(this);
  }

  componentDidMount() {
    this.props.firebase.chatroom().on('value', snapshot => {
      let newMessages = [];
      snapshot.forEach(element => {
        newMessages.push(element.val());
      });
      this.setState({
        messages: newMessages
      }); 
    });
  }

  renderMessages() {
      
      if(this.state.messages.length > 0) {
        return (
          this.state.messages.map(message => {
            return (
              <div className="message" key={message.messageId}>
                <img className={this.props.firebase.auth.currentUser.email === message.email ? "right" : ""} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaGFhx5NYzOoOXr4Vys6r1yHNsTiW6WYRfiK9bqzicAv1YqVn9&s" alt="Avatar" />
                <p>{message.messageText}</p>
                <span className={this.props.firebase.auth.currentUser.email === message.email ? "time-left" : "time-right"}>{ new Date(message.messageTimestamp * 1000).toUTCString().slice(-11, -4) }</span>
              </div>
            )
          })
        );
      } else {
        return (
          <div>Coming!</div>
        )
      }
  }

  render() {
    return (
      <div>
        <h1>Chat</h1>
        <div className="chat-container">
          <div className="message-container">
            {this.renderMessages()}
          </div>
          <div className="user-input">
            <input className="form-control" type="text" placeholder="" />
          </div>
        </div>
      </div>
    )
  }
  
}

export default withFirebase(Chat);