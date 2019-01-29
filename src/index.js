import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import CreateArticle from "./components/CreateArticle";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SingleArticle from "./components/SingleArticle";

import * as serviceWorker from './serviceWorker';

class App extends React.Component {

    constructor() {
      super();
  
      this.state = {
        authUser: null
      };
    }
  
    componentDidMount() {
      const user = localStorage.getItem('user')
  
      if (user) {
        this.setState({
          authUser: JSON.parse(user)
        })
      } 
    }

    setAuthUser = (authUser) => {
        this.setState({
          authUser
        })
    }
  
    render() {
      const { location } = this.props;
      return (
        <div>
          {
            location.pathname !== '/login' && location.pathname !== '/signup' &&
            <Navbar authUser={this.state.authUser} />
          }
          <Route exact path="/" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/signup" render = {(props) => <SignUp {...props} setAuthUser = {this.setAuthUser}/>} />
          <Route path="/article/:slug" component={SingleArticle} />
          <Route path="/articles/create" component={CreateArticle} />
          {
            location.pathname !== '/login' && location.pathname !== '/signup' &&
            <Footer />
          }
        </div>
      );
    }
  }
  
  
  const Main = withRouter((props) => {
    return (
      <App {...props} />
    );
  });
  
  ReactDOM.render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
