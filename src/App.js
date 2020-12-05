import React, { Fragment, /*useEffect*/ } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertSate';

import './App.css';



const App = () => {
  
  //The default users onload
//   useEffect(() => { 
//       loadDefault();
//     // eslint-disable-next-line
// }, []);

//   const loadDefault = async (res) => {
//     setLoading(true);
//     res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
//     //setUsers(res.data);
//       setLoading(false);
//   }

  
    return (
      <GithubState>
      <AlertState>
      <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" render={props => (
              <Fragment>
                <Alert />
                <Search />
                <Users />
              </Fragment>
            )} />
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" component={User} />
          </Switch>
        </div>
      </div>
      </Router>
      </AlertState>
      </GithubState>
    );
}

export default App;
