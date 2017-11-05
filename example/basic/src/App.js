import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    requestAnimationFrame(async () => {
      const { data } = await fetch('/api/users')
        .then(res => res.json())
        .then(data => ({ data }));

      this.setState({
        users: data,
      });
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {
            this.state.users.map((user, index) => {
              return <span key={index} style={{ display: 'block', height: '15px' }}>{`${user.name} - ${user.age}`}</span>
            })
          }
        </p>
      </div>
    );
  }
}

export default App;
