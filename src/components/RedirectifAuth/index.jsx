import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RedirectifAuth = ({ path, props, component: Component, isAuthenticated }) => {
    return <Route
        path={path}
        render={routerProps => {
            if (!isAuthenticated) {
                return <Component {...props} {...routerProps} />;
            };
            return <Redirect to="/" />;
        }}
    />
};

export default RedirectifAuth;