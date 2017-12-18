import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Axios    from 'axios';
import 'react-select/dist/react-select.css';

import './scss/style.scss';

import GroupsForm from './components/groups/GroupsForm';
import Navbar from './components/utility/Navbar';
import Routes from './components/utility/Routes';
import Auth from './lib/Auth';

class App extends React.Component {

  state = {
    currentUser: {}
  }

  // async componentWillMount() {
  //   const payload = Auth.getPayload();
  //   if (payload && payload.userId) {
  //     const { data: currentUser } = await Axios.get(`/api/users/${payload.userId}`);
  //     this.setState({
  //       currentUser: currentUser || {}
  //     });
  //   }
  // }

  render() {
    return (
      <Router>
        <div className="container">
          <div>
            <Navbar />
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
