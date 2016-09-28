import React, {Component} from 'react';
import { Router, Link, Navigation } from 'react-router';

export default class Login extends Component {
    redirectLogin(event) {
        event.preventDefault();
        this.context.router.push("/login");
        // window.location = "/login";
    }
    behaviorSuccess(user) {
        window.userLogin(user);
        // this.context.router.push("/");
        window.location = "/";
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
            <li>
                <Link to="login">
                    Đăng nhập
                    <span className="ic_cm icon-arrow-d">
                        k
                    </span>
                </Link>
                <div className="hover_menu">
                    <ul className="list_hotline">
                        <li className="btn">
                            <a className="btn_google" onClick={this.openURLGoogle.bind(this)}>
                            </a>
                        </li>
                        <li className="btn">
                            <a className="btn_face" onClick={this.openURLFacebook.bind(this)}>
                            </a>
                        </li>
                        <li className="btn full_width">
                            <button onClick={this.redirectLogin.bind(this)} className="btn_brand1 full_width_button">
                                ĐĂNG NHẬP
                            </button>
                        </li>
                        <li className="note">
                            Khách hàng mới?
                            <Link to="/register">
                                {" "}Tạo tài khoản
                            </Link>
                        </li>
                    </ul>
                </div>
            </li>
        );
    }
}
Login.contextTypes = {
    router: function() { return React.PropTypes.func.isRequired; }
};