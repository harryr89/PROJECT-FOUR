import React from 'react';
import Axios from 'axios';

import Auth      from '../../lib/Auth';
import GroupsForm from './GroupsForm';

class GroupsNew extends React.Component {
  state = {
    group: {
      title: '',
      image: '',
      category: ''
    }
  };

  handleChange = ({ target: { name, value } }) => {
    const group = Object.assign({}, this.state.group, { [name]: value });
    this.setState({ group });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/groups', this.state.group, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <GroupsForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        food={this.state.group}
      />
    );
  }
}

export default GroupsNew;
