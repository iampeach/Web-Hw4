import React, { Component } from 'react';

class ChatBlock extends Component {
  render() {
    return(
      <div className={'chat-block ' + this.props.setting} >
        <p> {this.props.message} </p>
      </div>
    );
  }
}

export default ChatBlock;