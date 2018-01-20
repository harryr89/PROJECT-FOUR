import React    from 'react';
import { Link } from 'react-router-dom';
import Axios    from 'axios';

import '../../scss/showStyle.scss';

import Auth from '../../lib/Auth';
//import BackButton from '../utility/BackButton';

class GroupsShow extends React.Component {
  state = {
    group: {},
    comment: {
      content: ''
    }
  }

  componentWillMount() {
    Axios
      .get(`/api/groups/${this.props.match.params.id}`)
      .then(res => this.setState({ group: res.data }, () => console.log(this.state.group)))
      .catch(err => console.log(err));
  }

  acceptMember = (member) => {
    Axios
      .put(`/api/groups/${this.props.match.params.id}/members/${member.id}`, null, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      });
    // .then(res => {
    //   const groupAccept = Object.assign({}, this.state.group, { member:
    //     this.state.group.
    //   })
    // })
  }

  handleChange = (e) => {
    this.setState({ comment: { content: e.target.value } });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post(`/api/groups/${this.props.match.params.id}/comments`, this.state.comment, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => {
        const group = Object.assign({}, this.state.group, { comments: this.state.group.comments.concat(res.data)});
        this.setState({ group, comment: { content: ''} });
      });
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

    // HOTFIX
    const userId = null;

    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.state.group.name}</h5>
            <img className="card-img-top" src={this.state.group.image} alt="Card image cap"></img>

            <div className="theme">
              <p className="card-subtitle mb-2 text-muted">{this.state.group.theme}</p>
              <p className="card-subtitle mb-2 text-muted">{this.state.group.destination}</p>
            </div>
            <div className="comments">
              {this.state.group.comments && this.state.group.comments.map(comments =>
                <p key={comments.id}>{comments.content}</p>
              )}
            </div>
            <div className="comments-box">
              <form className="form" onSubmit={this.handleSubmit}>
                <label>
                  <input type="text" value={this.state.comment.content} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>


        <div className="mx-auto">
          <div className="show-card">
            <div className="card">
              <div className="float">
                <h3 className="card-title">{this.state.group.name}</h3>
              </div>
              <div className="center-body">
                <div>
                  <img className="card-img-top" src={this.state.group.image} alt="Card image cap"></img>
                </div>
                <div className="theme">

                  <h4 className="card-subtitle mb-2 text-muted">{this.state.group.theme}</h4>


                  <h4 className="card-subtitle mb-2 text-muted">{this.state.group.destination}</h4>

                </div>

                { Auth.isAuthenticated() && this.state.group.members && this.state.group.members.map(member => {
                  return (
                    <div key={member.id}>
                      { member.status === 'accepted' && <h2>{member.member.username}</h2> }

                      { userId === this.state.group.createdBy && member.status === 'pending' &&
                      <div>
                        <h2>{member.member.username}</h2>
                        <h4>{member.status}</h4>
                        <button onClick={() => this.acceptMember(member)}>Accept Membership</button>
                      </div>
                      }

                    </div>
                  );
                })}
                <h4 className="card-subtitle mb-2 text-muted">{this.state.group.date}</h4>
                <div className="comments">
                  {this.state.group.comments && this.state.group.comments.map(comments =>
                    <p key={comments.id}>{comments.content}</p>
                  )}
                </div>
                <div className="comments-box">
                  <form className="form" onSubmit={this.handleSubmit}>
                    <label>
                      <input type="text" value={this.state.comment.content} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                </div>
              </div>
            </div>
          </div>

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
