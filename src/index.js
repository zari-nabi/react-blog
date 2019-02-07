import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, withRouter } from 'react-router-dom';

import App from './components/App';

import AuthService from './services/auth';
import ArticlesService from './services/articles';
import NotificationService from './services/notification';

import registerServiceWorker from './registerServiceWorker';

const Main = withRouter(props => ((
  <App
    authService={new AuthService()}
    articlesService={new ArticlesService()}
    notyService = {new NotificationService()}
    {...props} />
)));

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>
  , document.getElementById('root'),
);
registerServiceWorker();
