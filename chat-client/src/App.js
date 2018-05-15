import React, { Component } from 'react';
import ChatRoom from './ChatRoom';
import Welcome from './Welcome.js';
import './App.css';

const WINDOW_NUM = 2;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[
        { name: 'Little Red',     id: 0 },
        { name: 'Little Orange',  id: 1 },
        { name: 'Little Yellow',  id: 2 },
        { name: 'Little Green',   id: 3 },
        { name: 'Little Blue',    id: 4 },
        { name: 'Little Purple',  id: 5 }
      ],
      curUser: 0,
      curChat: 0,
      curWimdow: 0
    }
  }

  chooseUser = userId => {
    if (userId === this.state.curUser)
      this.setState({ curChat: 1 });
    else this.setState({ curUser: userId });
    this.setState({ curWimdow: 1 });
    document.title = this.state.users[userId].name;
  }

  changeCurChat = id => {
    this.setState({ curChat: id });
  }

  render() {
    var curWindows = [];
    for (let i = 0; i < WINDOW_NUM; ++i) {
      if (i === this.state.curWimdow)
        curWindows.push('display');
      else curWindows.push('hide');
    }
    return (
      <div>
        <Welcome 
          className={curWindows[0]} 
          users={this.state.users} 
          chooseUser={this.chooseUser}
        />
        <ChatRoom 
          className={curWindows[1]} 
          users={this.state.users} 
          curChat={this.state.curChat}
          curUser={this.state.curUser}
          changeCurChat={this.changeCurChat}
        />
      </div>
    );
  }
}

export default App;