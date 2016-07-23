import React, {Component} from 'react';

export default class OpenLogin extends Component {
    render() {
        return (
            <div className="col-md-4 col-sm-5 bg_login">
                <p className="title_login">
                    Đăng nhập bằng
                </p>
                <div className="login_other">
                    <a className="btn_face" href="javascript:void(0)" onclick="login.FacebookLogin();">
                    </a>
                    <a className="btn_google" href="javascript:void(0)" onclick="login.GoogleLogin();">
                    </a>
                </div>
            </div>
        );
    }
}
