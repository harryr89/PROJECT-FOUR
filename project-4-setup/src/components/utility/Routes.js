import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';

import GroupsIndex from '../groups/GroupsIndex';
import GroupsShow  from  '../groups/GroupsShow';
import GroupsNew   from '../groups/GroupsNew';
import GroupsEdit  from '../groups/GroupsEdit';
import GroupsRegister from '../groups/GroupsRegister';

import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/" component={GroupsIndex} />
      <Route path="/groups/register" component={GroupsRegister} />
      <ProtectedRoute path="/groups/new" component={GroupsNew} />
      <ProtectedRoute path="/groups/:id/edit" component={GroupsEdit} />
      <Route path="/groups/:id" component={GroupsShow} />
    </Switch>
  );
};

export default Routes;
