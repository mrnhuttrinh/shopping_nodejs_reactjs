import React, {Component} from 'react';
import OpenLogin from './OpenLogin';
import LoginForm from './LoginForm';

export default class Title extends Component {
    render() {
        return (
            <p className="title_inside">
                Đăng nhập
                <span>
                    {" "}hoặc{" "}
                </span>
                <a className="hi" href="/dang-ky-tai-khoan?returnUrl=~%2F">
                    Đăng ký
                </a>
            </p>
        );
    }
}
