import React, { useState, Fragment, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';
import axios from 'axios';

import GithubState from './context/github/GithubState';

import './App.css';



const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null)
  
  //The default users onload
  useEffect(() => { 
      loadDefault();
    // eslint-disable-next-line
}, []);

  const loadDefault = async (res) => {
    setLoading(true);
    res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data);
      setLoading(false);
  }

  //Get single user
  const getUser = async (login) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
}
//getUserRepos method
    const getUserRepos = async (login) => {
      setLoading(true);
      const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=6&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      setRepos(res.data);
      setLoading(false);
  }
  //clearUsers method || Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }
  //setAlert method || fires off when you submit an empty search box
  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });
    setTimeout(() => {
      setAlert(null)
    }, 5000);
  }
    return (
      <GithubState>
      <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" render={props => (
              <Fragment>
                <Alert alert={alert} />
                <Search clearUsers={clearUsers} 
                  showClear={users.length > 0 ? true : false} setAlert={showAlert} />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" render={props => (
              <User {...props} getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading} />
            )} />
          </Switch>
        </div>
      </div>
      </Router>
      </GithubState>
    );
}

export default App;
