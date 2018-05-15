import React, { Component } from 'react';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    }
  }

  updateInput = e => {
    this.setState({
        inputText: e.target.value
    });
  }

  onKeyPressed = e => {
    if (e.keyCode === 229)  return;
    // if pressed Enter
    if (e.keyCode === 13) {
        if (this.state.inputText === '') return;
        this.props.getInput(e, this.state.inputText);
        e.target.value = '';
        this.setState({
            inputText: ''
        });
    }
  }

  render() {
    return(
      <input 
        type="text"
        placeholder = "Let's Chat"
        className="chat-input"
        onChange={(e)=>this.updateInput(e)}
        onKeyDown={(e)=>this.onKeyPressed(e)}
      />
    );
  }
}

export default ChatInput;