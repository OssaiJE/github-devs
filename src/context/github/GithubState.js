import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { DEFAULT_USERS, SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from "../types";


const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //The default users onload
    useEffect(() => { 
        loadDefault();
     // eslint-disable-next-line
        }, []);

    // Default Users
    const loadDefault = async () => {
      setLoading();
      try {
        const res = await axios.get(
          `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        console.log("GitHub API Response:", res.data); // Debugging

        dispatch({
          type: DEFAULT_USERS,
          payload: res.data,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };


// Search Github users || note that parsing res as a parameter to async works too just like in express
  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    dispatch({
        type: SEARCH_USERS,
        payload: res.data.items
    });
  }


    // Get User
    const getUser = async (login) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    }

    // Get Repos
    const getUserRepos = async (login) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=6&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    }

    // Clear Users
    const clearUsers = () => {
        dispatch({ type: CLEAR_USERS });
      }

    // Set Loading
    const setLoading = () => {
        dispatch({ type: SET_LOADING });
    }


    return (
    <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            loadDefault,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
        >
            {props.children}
    </GithubContext.Provider>
    )
}

export default GithubState;