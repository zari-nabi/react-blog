import React from 'react';
import {Route , Redirect} from 'react-router-dom';

const Auth = ({path , props , componenet:Component,isAuthenticated}) =>{
    return <Route
        path={path}
        render={
            routerProps =>{
            if(isAuthenticated){
                return <Component {...props} {...routerProps}/>;
            };
            return <Redirect to="/login"/>;
        }
        }
    />
};

export default Auth;

