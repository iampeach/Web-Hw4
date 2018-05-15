import React, { Component } from 'react';
import ChatBlock from './ChatBlock';

class ChatHistory extends Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    var history = []
    for (let i = 0; i < this.props.history.length; ++i){
      if (this.props.history[i].direct === 0)
        history.push(<ChatBlock setting="Blue align-right" message={this.props.history[i].message} />);
      else 
        history.push(<ChatBlock setting="Gray align-left" message={this.props.history[i].message} />);
    }
    return(
      <div className="chat-history" >
        {history}
        <div style={{ float:"left", clear: "both" }}
             ref={ el => { this.messagesEnd = el; }} />
      </div>
    );
  }
}

export default ChatHistory;