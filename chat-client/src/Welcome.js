import React, { Component } from 'react';

class Welcome extends Component {

  click = id => {
    this.props.chooseUser(id);
  }

  render() {
    var userNames = [];
    for (let i = 0; i < this.props.users.length; ++i) {
      userNames.push(<li className="users" onClick={()=>this.click(i)}>{this.props.users[i].name}</li>);
    }
    return(
      <div className={this.props.className} >
        <h1 className="align-center"> Who are U ?</h1>
        <ul className="align-center user-list">
          {userNames}
        </ul>
      </div>
    );
  }
}

export default Welcome;