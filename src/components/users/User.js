import React, { Fragment, useEffect, useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';


const User = () => {
    const { login } = useParams();
    const githubContext = useContext(GithubContext);
    const {getUser, loading, user, repos, getUserRepos} = githubContext;

    //useEffect || without the empty array[] as second parameter, it runs infinitly
    useEffect(() => {
        getUser(login);
        getUserRepos(login);
        // eslint-disable-next-line
    }, [login]);
    
        const {
            name, 
            avatar_url, 
            location, 
            bio, 
            blog, 
            company,
            // login, 
            html_url, 
            followers, 
            following, 
            public_repos, 
            public_gists, 
            hireable
        } = user;

        if (loading) {
            return (<Spinner />);
        } else {
            return (
                <Fragment>
                    <Link to="/" className="btn btn-light">Back to Search</Link>
                    Hireable: {""}
                    {hireable ? (
                    <i className="fas fa-check text-success" />
                     ) : (
                     <i className="fas fa-times-circle text-danger" /> 
                     )}
                     <div className="card grid-2">
                        <div className="all-center">
                            <img src={avatar_url} className="round-img" alt="Avatar" style={{width: "150px"}} />
                            <h1>{name}</h1>
                            <p><b>Location:</b> {location}</p>
                        </div>
                        <div>
                            {bio && (
                                <Fragment>
                                    <h3>Biography</h3>
                                    <p>{bio}</p>
                                </Fragment>
                            )}
                            <a href={html_url} target='_blank' rel="noopener noreferrer" className="btn btn-dark my-1">Visit Github Profile</a>
                            <ul>
                                <li>
                                    {login && <Fragment>
                                            <b>Username:</b> {login}
                                        </Fragment>}
                                </li>
                                <li>
                                    {company && <Fragment>
                                            <b>Company:</b> {company}
                                        </Fragment>}
                                </li>
                                <li>
                                    {blog && <Fragment>
                                            <b>Blog:</b> {blog}
                                        </Fragment>}
                                </li>
                            </ul>
                        </div>
                     </div>
                     <div className="card text-center">
                        <div className="badge badge-primary">Followers: {followers}</div>
                        <div className="badge badge-success">Following: {following}</div>
                        <div className="badge badge-light">Public Repos: {public_repos}</div>
                        <div className="badge badge-dark">Public Gists: {public_gists}</div>
                     </div>
                     <div className="card text-center"><h2>Public Repositories</h2></div>
                     <Repos repos={repos} />
                </Fragment>
            );
        }
}

export default User;
