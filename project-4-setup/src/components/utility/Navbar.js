import React                from 'react';
import { Link, withRouter } from 'react-router-dom';

import Auth from '../../lib/Auth';

const Navbar = ({ history }) => {

  function logout(e) {
    e.preventDefault();
    Auth.logout();
    history.push('/');
  }

  return(
    <nav>
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Groupio</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {
              Auth.isAuthenticated() &&
              <li className="nav-item">
                <a className="nav-link" href="#">Groups</a>
              </li>
            }
            {
              Auth.isAuthenticated() &&
              <li className="nav-item">
                <a className="nav-link" onClick={logout} href="#">Logout</a>
              </li>
            }

            {
              !Auth.isAuthenticated() &&
                <li className="nav-item">
                  <a className="nav-link" href="#">Login</a>
                </li>
            }
            {
              !Auth.isAuthenticated() &&
                <li className="nav-item">
                  <a className="nav-link" href="#">Register</a>
                </li>
            }
          </ul>
        </div>
      </nav>
    </nav>
  );
};

export default withRouter(Navbar);
