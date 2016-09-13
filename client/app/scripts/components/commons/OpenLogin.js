import React, {Component} from 'react';

export default class OpenLogin extends Component {
    behaviorSuccess(user) {
        window.userLogin(user);
        window.location = "/#/";
    }
    openURLFacebook(event) {
        event.preventDefault();
        window.behaviorSuccess = this.behaviorSuccess;
        window.userLogin = this.props.userLogin;
        window.open("/auth/facebook", "MsgWindow", "width=800, height=600");
    }
    openURLGoogle(event) {
        event.preventDefault();
        window.behaviorSuccess = this.behaviorSuccess;
        window.open("/auth/google", "MsgWindow", "width=800, height=600");
    }
    render() {
        return (
            <div className="col-md-4 col-sm-5 bg_login">
                <p className="title_login">
                    Đăng nhập bằng
                </p>
                <div className="login_other">
                    <a className="btn_face" onClick={this.openURLFacebook.bind(this)}>
                    </a>
                    <a className="btn_google" onClick={this.openURLGoogle.bind(this)}>
                    </a>
                </div>
            </div>
        );
    }
}
