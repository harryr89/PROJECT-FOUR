import React    from 'react';
import Axios    from 'axios';
import { Link } from 'react-router-dom';



import Auth     from '../../lib/Auth';

class GroupsIndex extends React.Component {
  state = {
    groups: []
  }

  async componentWillMount() {
    try {
      const { data: groups } = await Axios.get('/api/groups');
      const payload = Auth.getPayload();
      if (payload && payload.userId) {
        const { data: currentUser } = await Axios.get(`/api/users/${payload.userId}`);
        this.setState({
          groups,
          currentUser: currentUser || {}
        });
      } else {
        this.setState({
          groups: groups || {},
          currentUser: {}
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  is(group, currentUser, status) {
    return group.members.filter(member => {
      if (status) {
        return member.member === currentUser._id && member.status === status;
      } else {
        return member.member === currentUser._id;
      }
    }).length > 0;
  }

  isCreator(group, currentUser) {
    return group.createdBy === currentUser._id;
  }

  async requestMembership(group) {
    try {
      const response = await Axios.post(`/api/groups/${group.id}/members`, null, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      });
      console.log(response);

      this.props.history.push('/');
    } catch (e) {
      console.error(e);
    }
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
            console.log(group);
            return(
              <div key={group.id}className="col-6">
                <div className="card index-card">
                  <Link to={`/groups/${group.id}`}>
                    <h3 className="card-title">{ group.name }</h3>
                  </Link>

                  
                  <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                  <p className="card-text">Some quick example text to build on the card title and make up the   bulk o f the cards content.</p>
                  <h2 className="card-text">this is text</h2>

                  { this.isCreator(group, this.state.currentUser) && <h1>ADMIN YO.</h1> }
                  { this.is(group, this.state.currentUser, 'accepted') && <p>ACCEPTED</p> }
                  { this.is(group, this.state.currentUser, 'rejected') && <p>REJECTED</p> }
                  { this.is(group, this.state.currentUser, 'pending') && <p>PENDING</p> }
                  { !this.is(group, this.state.currentUser) && <button className="main-button" onClick={() => this.requestMembership(group) }>request</button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default GroupsIndex;
