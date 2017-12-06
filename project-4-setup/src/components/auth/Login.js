import React from 'react';
import LoginForm from './LoginForm';
import Axios from 'axios';

class Login extends React.Component {

  state = {
    credentials: {
      email: '',
      password: ''
    }
  };

  handleChange = ({ target: { name, value } }) => {
    const credentials = Object.assign({}, this.state.credentials, { [name]: value });
    this.setState({ credentials });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/api/login', this.state.credentials)
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <LoginForm
        credentials={this.state.credentials}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Login;
