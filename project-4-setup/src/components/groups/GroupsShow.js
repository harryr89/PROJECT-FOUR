import React    from 'react';
import { Link } from 'react-router-dom';
import Axios    from 'axios';

import Auth from '../../lib/Auth';
//import BackButton from '../utility/BackButton';

class GroupsShow extends React.Component {
  state = {
    group: {}
  }

  componentWillMount() {
    Axios
      .get(`/api/groups/${this.props.match.params.id}`)
      .then(res => this.setState({ group: res.data }))
      .catch(err => console.log(err));
  }

  deleteGroup = () => {
    Axios
      .delete(`/api/groups/${this.props.match.params.id}`, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="col-md-6">
          <h3>{this.state.group.name}</h3>
          <h4>{this.state.group.theme}</h4>
          <h4>{this.state.group.destination}</h4>
          <h4>{this.state.group.members}</h4>
          <h4>{this.state.group.date}</h4>
          { Auth.isAuthenticated() && <Link to={`/groups/${this.state.group.id}/edit`} className="standard-button">
            <i className="fa fa-pencil" aria-hidden="true"></i>Edit
          </Link>}
          {' '}
          { Auth.isAuthenticated() && <button className="main-button" onClick={this.deleteGroup}>
            <i className="fa fa-trash" aria-hidden="true"></i>Delete
          </button>}
        </div>
      </div>
    );
  }
}

export default GroupsShow;
