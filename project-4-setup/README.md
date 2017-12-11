# WDI Project 4: MERN Stack

## Deployment

When deploying the app for the first time ensure you have run the following steps in order:

1. `heroku create`
1. `heroku addons:create mongolab`
1. `heroku config:set NPM_CONFIG_PRODUCTION=false`
1. `git push heroku master`
1. `heroku open`

After that simply `git commit` and `git push heroku master`.

## Important

Ensure that you add any relevant environment variables to heroku with `heroku config:set`, eg:

`heroku config:set AWS_BUCKET_NAME=wdi-project-4`

<img src={group.name} className="img-responsive" />
<img src={this.state.group.image} className="img-responsive" />
className="image-tile col-md-6"

{this.state.groups.map(group => {
<div key={group.id} className="row">
  <link to={`/groups/${group.id}`}>
    <h3>{ group.name }</h3>
  </link>
}

// <div>
  // <div className="col-md-6">
    // <h3>{this.state.group.name}</h3>
    // <h4>{this.state.group.category}</h4>
    // <BackButton />
    // { Auth.isAuthenticated() && <Link to={`/groups/${this.state.group.id}/edit`} className="standard-button">
    //   <i className="fa fa-pencil" aria-hidden="true"></i>Edit
    // </Link>}
    // {' '}
    // { Auth.isAuthenticated() && <button className="main-button" onClick={this.deleteGroup}>
    //   <i className="fa fa-trash" aria-hidden="true"></i>Delete
    // </button>}
  // </div>
// </div>

<div className="form-group">
  <label htmlFor="image">Image</label>
  <input
    type="text"
    className="form-control"
    id="image"
    name="image"

    onChange={handleChange}
  />
</div>

members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
