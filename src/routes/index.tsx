import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';

import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import Orphanage from '../pages/Orphanage';
import CreateOrphanage from '../pages/CreateOrphanage';
import OrphanageCreated from '../pages/OrphanageCreated';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import OrphanagesCreated from '../pages/OrphanagesCreated';
import OrphanageDeleted from '../pages/OrphanageDeleted';
import OrphanagesPending from '../pages/OrphanagesPending';
import EditOrphanageCreated from '../pages/EditOrphanageCreated';
import EditOrphanagePending from '../pages/EditOrphanagePending';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />

        <Route path="/app" component={OrphanagesMap} />

        <Route path="/login" component={Login} />

        <Route path="/forgot_password" component={ForgotPassword} />

        <Route path="/orphanages_created" isPrivate component={OrphanagesCreated} />

        <Route path="/orphanages_pending" isPrivate component={OrphanagesPending} />

        <Route path="/orphanages/create" component={CreateOrphanage} />

        <Route path="/orphanages/created" component={OrphanageCreated}/>

        <Route path="/orphanages/edit/pending/:id" isPrivate component={EditOrphanagePending}/>

        <Route path="/orphanages/edit/created/:id" isPrivate component={EditOrphanageCreated} />

        <Route path="/orphanages/delete/:name/:id" isPrivate component={OrphanageDeleted} />

        <Route path="/orphanages/view/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
