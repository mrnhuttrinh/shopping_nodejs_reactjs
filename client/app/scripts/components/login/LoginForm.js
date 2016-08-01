import React, {Component} from 'react';
import Validate from './Validate';
import _ from 'lodash';
import userAPIs from '../../apis/user';
import PopUp from './PopUp';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.setInitState();
    }
    setInitState() {
        return {
            validateEmail: {
                classCss: "",
                tagError: null
            },
            validatePassword: {
                classCss: "",
                tagError: null
            },
            dialogPopup: null
        };
    }
    componentDidMount() {
        $(function() {
            $(function () {
                $("#Email").focus();
            });
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState(this.setInitState());
        var Email = this.refs["Email"];
        if (_.isEmpty(Email.value)) {
            this.setState({
                validateEmail: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={Email.getAttribute("data-val-required")} />
                }
            });
            return;
        }
        var PasswordLogin = this.refs["Password"];
        if (_.isEmpty(PasswordLogin.value)) {
            this.setState({
                validatePassword: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={PasswordLogin.getAttribute("data-val-required")} />
                }
            });
            return;
        }

        var data = {
            email: Email.value,
            password: PasswordLogin.value
        };
        this.loginUser(data);
    }
    loginUser(data) {
        userAPIs.loginUser(data, (err, res) => {
            if (err) {
                this.setState({
                    dialogPopup: <PopUp turnOffShowOnTop={this.turnOffShowOnTop.bind(this)} status={false} textShow="Đăng Nhập Không Thành Công." show={true}/>
                });
            } else {
                this.setState({
                    dialogPopup: <PopUp turnOffShowOnTop={this.turnOffShowOnTop.bind(this)} status={true} textShow="Đăng Nhập Thành Công." show={true}/>
                });
                this.props.userLogin(res.body.data);
            }
        });
    }
    turnOffShowOnTop(status) {
        this.setState({
            dialogPopup: null
        });
        if (status) {
            window.location = "/#/";
        }
    }
    render() {
        return (
            <div className="col-md-8 col-sm-7">
                {this.state.dialogPopup}
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
                            <input className={"text GINGER_SOFTWARE_control " + this.state.validateEmail.classCss} ref="Email" data-val="true" data-val-required="Vui lòng nhập email" ginger_software_editor="true" id="Email" name="Email" placeholder="Địa chỉ email" spellcheck="false" type="text" defaultValue="">
                            </input>
                        </div>
                        {this.state.validateEmail.tagError}
                        <div className="field">
                            <label className="field_L">
                                Mật khẩu
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input className={"text " + this.state.validatePassword.classCss} ref="Password" data-val="true" data-val-required="Vui lòng nhập mật khẩu" id="Password" name="Password" placeholder="Mật khẩu" type="password" defaultValue="">
                            </input>
                        </div>
                        {this.state.validatePassword.tagError}
                        <div className="field_link">
                            <a href="/#/forgot_password">
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
