import React    from 'react';
import Axios    from 'axios';
import { Link } from 'react-router-dom';

import Auth     from '../../lib/Auth';

class GroupsIndex extends React.Component {
  state = {
    groups: []
  }

  componentWillMount() {
    Axios
      .get('/api/groups')
      .then(res => this.setState({ groups: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="page-banner col-md-12">
            { Auth.isAuthenticated() && <Link to="/groups/new" className="main-button">
              <i className="fa fa-plus" aria-hidden="true"></i>Add Group
            </Link>}
          </div>
          {this.state.groups.map(group => {
            return(
              
              <div key={group.id} className="image-tile col-md-4 col-sm-6 col-xs-12">
                <Link to={`/groups/${group.id}`}>
                  <h3>{ group.name }</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default GroupsIndex;
