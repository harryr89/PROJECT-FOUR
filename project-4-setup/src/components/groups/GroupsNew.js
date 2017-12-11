import React from 'react';
import Axios from 'axios';

import Auth      from '../../lib/Auth';
import GroupsForm from './GroupsForm';

class GroupsNew extends React.Component {
  state = {
    group: {
      title: '',
      image: '',
      category: '',
      createdBy: '',
      members: []
    },
    selectedOptions: []
  };

  // componentDidMount(){
  //   Axios
  //     .get('api/groups')
  //     .then(res => {
  //       this.setState({ members: res.data });
  //     })
  //     .catch(err => console.log(err));
  // }
  //
  // handleUser = (selectedOptions) => {
  //   const users = selectedOptions.map(selectedOption => ({ _id: selectedOption.value, username: selectedOption.label }));
  //   const group = Object.assign({}, this.state.group, { users });
  //   this.setState({ group, selectedOptions });
  // }

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
        group={this.state.group}
        members={this.state.members}
        handleUser={this.handleUser}
        selectedOptions={this.state.selectedOptions}
      />
    );
  }
}

export default GroupsNew;
