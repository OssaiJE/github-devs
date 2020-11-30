import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';



class App extends Component {
  
  state = {
    users:[],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }
  //The default users onload
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data, loading: false });
  }
  //Search Github users || note that parsing res as a parameter to async works too just like in express
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data.items, loading: false });
  }
  //Get single user
  getUser = async (login) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ user: res.data, loading: false });
}
//getUserRepos method
    getUserRepos = async (login) => {
      this.setState({ loading: true });
      const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=6&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      this.setState({ repos: res.data, loading: false });
  }
  //clearUsers method || Clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  }
  //setAlert method || fires off when you submit an empty search box
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type }});
    setTimeout(() => {
      this.setState({ alert: null })
    }, 5000);
  }

  render() {
    const { users, user, repos, loading } = this.state;
    return (
      <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" render={props => (
              <Fragment>
                <Alert alert={this.state.alert} />
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} 
                  showClear={users.length > 0 ? true : false} setAlert={this.setAlert} />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" render={props => (
              <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading} />
            )} />
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
