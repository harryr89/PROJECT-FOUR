import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import 'react-select/dist/react-select.css';

import GroupsForm from './components/groups/GroupsForm';
import Navbar from './components/utility/Navbar';

import Routes from './components/utility/Routes';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="container">
          <div>
            <Navbar />
            <h1>WDI Project 4: MERN Stack App</h1>
            <GroupsForm />
          </div>
          <main>
            <Routes />
          </main>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
