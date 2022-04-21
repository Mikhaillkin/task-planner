import React from 'react';
import { Switch,Route,Redirect } from 'react-router-dom';

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import DetailsPage from "./pages/DetailsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import PrivateRoute from "./components/PrivateRoute";
import {NotificationContainer} from 'react-notifications';

// import 'materialize-css/sass/materialize.scss';
import 'react-notifications/lib/notifications.css';
import './App.scss';

const App = () => {

  return (
      <>
        <Switch>
          <PrivateRoute path='/' exact component={HomePage}/>
          <PrivateRoute path='/create' component={CreatePage}/>
          <PrivateRoute path='/task-details/:id' component={DetailsPage} />
          <Route path='/profile' component={ProfilePage}/>
          <Route path='/settings' component={SettingsPage}/>
          <Route path='/auth' component={AuthPage}/>
          <Redirect to='/404'/>
        </Switch>
        <NotificationContainer />
      </>
  )
}

export default App;
