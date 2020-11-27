import React, { Component } from 'react';


export class UserItem extends Component {

    constructor() {
        super();
        this.state = {
            id: "id",
            login: "mojombo",
            avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
            html_url: "https://api.github.com/users/mojombo"
        }
    }
    render() {
        return (
            <div>
                <h1>Hello from UserItem.js</h1>
            </div>
        )
    }
}

export default UserItem;
