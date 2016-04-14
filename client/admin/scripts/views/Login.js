import React, {Component} from 'react'
import {connect} from 'react-redux';
import actions from '../actions/main'
import apis from '../apis/main';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: ''
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        var self = this;
        if (self.setState.loading === "loading") {
            return;
        }
        var username = self.refs["username"].value;
        var password = self.refs["password"].value;
        if (!username) {
            return ;
        }
        if (!password) {
            return ;
        }
        if (username.indexOf(" ") !== -1) {
            return;
        }
        self.setState({
            loading: 'loading'
        });
        apis.signIn(username, password, function(err, res) {
            if (err) {
                self.setState({
                    loading: ''
                });
            } else {
                if (res.status === 200) {
                    self.props.signIn(res.body.data);
                    window.location = "/admin/#/dashboard";
                } else {
                    self.setState({
                        loading: ''
                    });
                }
            }
        })
        
    }
    render() {
        var title = this.state.loading === '' ? 'Log in' : 'Authenticating';
        // http://codepen.io/boudra/pen/YXzLBN
        return (
            <div className="wrapper">
                <form className={"login " + this.state.loading} onSubmit={this.handleSubmit.bind(this)}>
                    <p className="title">
                        Log in
                    </p>
                    <input ref="username" autofocus="" placeholder="Username" type="text"/>
                    <i className="fa fa-user"></i>
                    <input ref="password" placeholder="Password" type="password"/>
                    <i className="fa fa-key"></i>
                    <a href="#">
                        Forgot your password?
                    </a>
                    <button ref="submit_button">
                        <i className="spinner"></i>
                        <span className="state">
                            {title}
                        </span>
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.default
    }
}

export default connect(
    mapStateToProps,
    actions
)(Login)