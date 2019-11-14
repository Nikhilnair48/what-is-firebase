import React from 'react';
import { withFirebase } from '../Firebase';
import './Chat.css';
class Chat extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      draftMessage: "",
      sendButtonDisabled: true
    }
    this.renderMessages = this.renderMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.updateDraftMessage = this.updateDraftMessage.bind(this);
    this.getUUID = this.getUUID.bind(this);
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

  getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
  }

  sendMessage() {
    let newMessage = {
      messageId: this.getUUID(),
      messageText: this.state.draftMessage,
      email: this.props.firebase.auth.currentUser.email,
      messageTimestamp: Math.round(new Date().getTime() / 1000)
    }
    this.props.firebase.update(newMessage);
  }
  
  updateDraftMessage(e) {
    const { name, value } = e.target;

    if(value != null && value != undefined && value.length > 0) {
      this.setState({
        sendButtonDisabled: false,
        draftMessage: value
      });
    } else {
      this.setState({
        sendButtonDisabled: true
      });
    }
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
          <div>Please wait...!</div>
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
            <div className="input-group">
              <input className="form-control" type="text" placeholder="" onChange={this.updateDraftMessage} />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" disabled={this.state.sendButtonDisabled} onClick={this.sendMessage}>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default withFirebase(Chat);