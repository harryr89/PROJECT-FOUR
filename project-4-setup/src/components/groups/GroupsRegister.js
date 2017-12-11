import React        from 'react';
import GroupsForm from '../groups/GroupsForm';
import Axios        from 'axios';

import Auth from '../../lib/Auth';

class GroupsRegister extends React.Component {
  state = {
    group: {
      name: '',
      theme: '',
      destination: '',
      members: [],
      date: 'YYYY-MM-DD'
    }
  };

  handleChange = ({ target: { name, value }}) => {
    const group = Object.assign({}, this.state.group, { [name]: value });
    this.setState({ group });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/groups/register', this.state.group)
      .then(res => {
        Auth.setToken(res.data.token);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <GroupsForm
        group={this.state.group}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default GroupsRegister;
