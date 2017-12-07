import React from 'react';
import Axios from 'axios';

import Auth      from '../../lib/Auth';
import GroupsForm from './GroupsForm';

class GroupsEdit extends React.Component {
  state = {
    group: {
      title: '',
      image: '',
      category: ''
    }
  };

  componentDidMount() {
    Axios
      .get(`/api/groups/${this.props.match.params.id}`)
      .then(res => this.setState({ group: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const group = Object.assign({}, this.state.group, { [name]: value });
    this.setState({ group });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/groups/${this.props.match.params.id}`, this.state.group, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.props.history.push(`/groups/${res.data.id}`))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <GroupsForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        group={this.state.group}
      />
    );
  }
}

export default GroupsEdit;
