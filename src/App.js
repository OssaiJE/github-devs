import React, { Component } from "react"
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import './App.css';



class App extends Component {
  
  state = {
    users:[],
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
    const { users, loading } = this.state;
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} 
          showClear={users.length > 0 ? true : false} setAlert={this.setAlert} />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
