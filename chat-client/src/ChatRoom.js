import React, { Component } from 'react';
import io from 'socket.io-client';
import ChatInput from './ChatInput';
import ChatHistory from './ChatHistory';

const USER_NUM = 6;

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      unread: [0, 0, 0, 0, 0, 0]
    }
    this.socket = io('localhost:8080');
    
    const addHistory = data => {
      if (data.id === (this.props.curUser*USER_NUM + this.props.curChat))
        this.setState({ messages: [...this.state.messages, data]});
      else if (Math.floor(data.id/USER_NUM) === this.props.curUser){
        let newUnread = this.state.unread;
        newUnread[(data.id-this.props.curUser*USER_NUM)]++;
        this.setState({ unread: newUnread });
      }
    };

    const checkAndRender = data => {
      if (data.id === (this.props.curUser*USER_NUM + this.props.curChat))
        this.setState({ messages: data.messages });
    }

    this.socket.on('RECEIVE_MESSAGE', function(message){
      addHistory(message);
    });

    this.socket.on('THROW_MESSAGE', function(data){
      checkAndRender(data);
    })
  }

  changeCurChat = id => {
    this.props.changeCurChat(id);
    let newUnread = this.state.unread;
    newUnread[id] = 0;
    this.setState({ unread: newUnread });
    this.refresh(this.props.curUser, id);
  }

  refresh = (user, chat) => {
    this.socket.emit('GET_MESSAGE', user*USER_NUM+chat);
  }

  addMessage = (e, message) => {
    e.preventDefault();
    this.socket.emit('SEND_MESSAGE', {
      storage: this.props.curUser*USER_NUM + this.props.curChat, 
      message: message 
    });
  }

  render() {
    let users = [];
    for (let i = 0; i < this.props.users.length; ++i) {
      if (i === this.props.curUser) continue;
      if (this.state.unread[i] !== 0)
        users.push( <div className="relative">
                      <div 
                        className={'avatar ' + this.props.users[i].name} 
                        onClick={()=>this.changeCurChat(this.props.users[i].id)}
                      /> 
                      <div className="unread">
                        <h6> {this.state.unread[i]} </h6>
                      </div>
                    </div>);
      else         
        users.push( <div className="relative">
                      <div 
                        className={'avatar ' + this.props.users[i].name} 
                        onClick={()=>this.changeCurChat(this.props.users[i].id)}
                      /> 
                    </div>);
    }
    return (
      <div className={this.props.className}>
        <table className="align-center">
          <tr>
            <th className="left-col" />
            <th className="chat-name" > { this.props.users[this.props.curChat].name } </th>
          </tr>
          <tr>
            <td className="left-col" > { users } </td>
            <td> 
              <ChatHistory history={this.state.messages} />
              <ChatInput getInput={this.addMessage} />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default ChatRoom;