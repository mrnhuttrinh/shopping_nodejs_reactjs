import React, {Component} from 'react'

export default class Login extends Component{
    handleSubmit(event) {
        event.preventDefault()
        var username = this.refs["username"].value;
        var password = this.refs["password"].value;
        if (!username || !password) {
            return ;
        } 
        // check on server
        localStorage.token = "haslogin";
    }
    render() {
        return (
            <div className="login">
                <div className="login-triangle">
                </div>
                <h2 className="login-header">
                    Log in
                </h2>
                <form onSubmit={this.handleSubmit.bind(this)} className="login-container">
                    <p>
                        <input ref="username" placeholder="Username" type="email"/>
                    </p>
                    <p>
                        <input ref="password" placeholder="Password" type="password"/>
                    </p>
                    <p>
                        <input type="submit" value="Log in"/>
                    </p>
                </form>
            </div>
        )
    }
}
