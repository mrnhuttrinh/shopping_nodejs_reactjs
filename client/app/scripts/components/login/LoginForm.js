import React, {Component} from 'react';
import OpenLogin from './OpenLogin';

export default class LoginForm extends Component {
    componentDidMount() {
        $(function() {
            $(function () {
                $("#Email").focus();
            });
        });
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        return (
            <div className="col-md-8 col-sm-7">
                <p className="title_login1">
                    Đăng nhập bằng tài khoản Áo Thun Phong Cách
                </p>
                <form onSubmit={this.handleSubmit.bind(this)} action="/dang-nhap" method="post" novalidate="novalidate">
                    <input id="ReturnUrl" name="ReturnUrl" type="hidden" value="~/" />
                    <div className="form login">
                        <span className="field-validation-valid" data-valmsg-for="IsValidUser" data-valmsg-replace="true">
                        </span>
                        <div className="field">
                            <label className="field_L">
                                Email
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input className="text GINGER_SOFTWARE_control" data-val="true" data-val-required="Vui lòng nhập email" ginger_software_editor="true" id="Email" name="Email" placeholder="Địa chỉ email" spellcheck="false" type="text" value="">
                            </input>
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="Email" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field">
                            <label className="field_L">
                                Mật khẩu
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input className="text" data-val="true" data-val-required="Vui lòng nhập mật khẩu" id="Password" name="Password" placeholder="Mật khẩu" type="password">
                            </input>
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="Password" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field_link">
                            <a href="/quen-mat-khau">
                                Bạn quên mật khẩu
                            </a>
                        </div>
                        <div className="field_btn">
                            <button className="btn_brand" type="submit">
                                ĐĂNG NHẬP
                                <span className="arrow_W">
                                </span>
                            </button>
                            <a className="link_register" href="/#/register">
                                Bạn chưa có tài khoản?
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
