import React from 'react';
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props => {
                return ( localStorage.getItem('userData') ? <Component {...props} /> : <Redirect to='/auth'/>)
            }
            }
        />
    );
};

export default PrivateRoute;