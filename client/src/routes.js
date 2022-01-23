import React from 'react';
import { Switch,Route,Redirect } from 'react-router-dom';

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import DetailsPage from "./pages/DetailsPage";
import ProfilePage from "./pages/ProfilePage";

export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path='/' exact component={HomePage} />
                <Route path='/create' exact component={CreatePage} />
                <Route path='/details' exact component={DetailsPage} />
                <Route path='/profile' exact component={ProfilePage} />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path='/auth' component={AuthPage} />
            <Redirect to='/auth' />
        </Switch>
    );
}