import React, {Component} from 'react';

export default class Login extends Component {
    render() {
        return (
            <li>
                <a href="/dang-nhap">
                    Đăng nhập
                    <span className="ic_cm icon-arrow-d">
                        k
                    </span>
                </a>
                <div className="hover_menu">
                    <ul className="list_hotline">
                        <li className="btn">
                            <a className="btn_google">
                            </a>
                        </li>
                        <li className="btn">
                            <a className="btn_face">
                            </a>
                        </li>
                        <li className="btn full_width">
                            <button className="btn_brand1 full_width_button">
                                ĐĂNG NHẬP
                            </button>
                        </li>
                        <li className="note">
                            Khách hàng mới?
                            <a href="/dang-ky-tai-khoan">
                                {" "}Tạo tài khoản
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
        );
    }
}