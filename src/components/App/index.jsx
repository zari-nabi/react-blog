import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Auth from '../Auth';
import Login from '../Login';
import Navbar from '../Navbar';
import Signup from '../Signup';
import Footer from '../Footer';
import Welcome from '../Welcome';
import CreateArticle from '../CreateArticle';
import SingleArticle from '../SingleArticle';
import RedirectifAuth from '../RedirectifAuth';
import UserArticle from '../UserArticles';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      authUser: null,
      articles: [],
      categories: [],
    };
  }

  componentWillMount() {
    const user = localStorage.getItem('user');

    if (user) {
      this.setState({
        authUser: JSON.parse(user),
      });
    }
  }

  setAuthUser = (authUser) => {
    this.setState({
      authUser,
    }, () => {
      localStorage.setItem('user', JSON.stringify(authUser))
      this.props.history.push('/');
    });
  }

  setArticles = (articles) => {
    this.setState({
      articles,
    })
  }

  removeAuthUser =() =>{
    localStorage.removeItem('user');
    this.setState({authUser:null});
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        {
          location.pathname !== '/login' && location.pathname !== '/signup' &&
          <Navbar authUser={this.state.authUser} removeAuthUser={this.removeAuthUser} />
        }
        <Route exact path="/"
          render={props => (<Welcome
            {...props}
            getArticles={this.props.articlesService.getArticles}
            setArticles={this.setArticles}
          />
          )} />
        <RedirectifAuth
          path="/login"
          component={Login}
          props={{
            loginUser: this.props.authService.loginUser,
            setAuthUser: this.setAuthUser,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        <RedirectifAuth
          path="/signup"
          component={Signup}
          props={{
            registerUser: this.props.authService.registerUser,
            setAuthUser: this.setAuthUser,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        <Route path="/article/:slug"
        exact
          render={
            props => (<SingleArticle
              {...props}
              getArticle={this.props.articlesService.getArticle}
              articles={this.state.articles}
            />)
          } />
        <Auth
          path="/articles/create"
          componenet={CreateArticle}
          props={{
            getArticleCategories: this.props.articlesService.getArticleCategories,
            createArticle: this.props.articlesService.createArticle,
            token: this.state.authUser ? this.state.authUser.token : null,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        <Auth
          path="/user/articles"
          componenet={UserArticle}
          props={{
            getUserArticles:this.props.articlesService.getUserArticles,
            setArticles:this.setArticles,
            token: this.state.authUser ? this.state.authUser.token : null,
            deleteArticle: this.props.articlesService.deleteArticle,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        <Auth
          path="/article/edit/:slug"
          componenet={CreateArticle}
          props={{
            getArticleCategories: this.props.articlesService.getArticleCategories,
            createArticle: this.props.articlesService.createArticle,
            token: this.state.authUser ? this.state.authUser.token : null,
            articles:this.state.articles,
            updateArticle:this.props.articlesService.updateArticle,
          }}
          isAuthenticated={this.state.authUser !== null}
          
        />
        {
          location.pathname !== '/login' && location.pathname !== '/signup' &&
          <Footer />
        }
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  authService: PropTypes.objectOf(PropTypes.func).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  articlesService: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default App;
