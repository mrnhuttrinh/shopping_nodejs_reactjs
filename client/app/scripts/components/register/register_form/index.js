import React, {Component} from 'react';
import Title from './Title';
import Years from './Years';
import Months from './Months';
import Days from './Days';
import Gender from './Gender';
import Validate from './Validate';
import _ from 'lodash';
import userAPIs from '../../../apis/user';
import PopUp from './PopUp';

export default class FormElement extends Component {
    constructor(props) {
        super(props);
        this.state = this.initStateValidate();
    }
    initStateValidate() {
        return {
            validateRegisterEmail: {
                classCss: "",
                tagError: null
            },
            validateRegisterPassword: {
                classCss: "",
                tagError: null
            },
            validateRetypePassword: {
                classCss: "",
                tagError: null
            },
            validateGender: {
                classCss: "",
                tagError: null
            },
            validateBirthdate: {
                classCss: "",
                tagError: null
            },
            validateMobile: {
                classCss: "",
                tagError: null
            },
            validateAcceptTerms: {
                classCss: "",
                tagError: null
            },
            validateReceiveNewletters: {
                classCss: "",
                tagError: null
            },
            registerSubmit: {
                classCss: "",
                tagError: null
            },
            dialogPopup: null
        };
    }
    componentDidMount() {
        $(function() {
            $(function () {
                $("#RegisterEmail").focus();
            });
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        // reset all state
        this.setState(this.initStateValidate());

        var RegisterEmail = this.refs["RegisterEmail"];
        if (_.isEmpty(RegisterEmail.value)) {
            this.setState({
                validateRegisterEmail: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={RegisterEmail.getAttribute("data-val-required")} />
                }
            });
            return;
        }
        var re = new RegExp(RegisterEmail.getAttribute("data-val-regex-pattern"));
        var myArray = RegisterEmail.value.match(re);
        if (_.isNull(myArray)) {
            this.setState({
                validateRegisterEmail: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={RegisterEmail.getAttribute("data-val-regex")} />
                }
            });
            return;
        }

        var RegisterPassword = this.refs["RegisterPassword"];
        if (_.isEmpty(RegisterPassword.value)) {
            this.setState({
                validateRegisterPassword: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={RegisterPassword.getAttribute("data-val-required")} />
                }
            });
            return;
        }
        if (RegisterPassword.value.length < 6) {
            this.setState({
                validateRegisterPassword: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={RegisterPassword.getAttribute("data-val-length")} />
                }
            });
            return;
        }

        var RetypePassword = this.refs["RetypePassword"];
        if (RetypePassword.value !== RegisterPassword.value) {
            this.setState({
                validateRetypePassword: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={RetypePassword.getAttribute("data-val-equalto")} />
                }
            });
            return;
        }

        var Gender = this.refs["Gender"].refs["Gender"];
        if (isNaN(parseInt(Gender.value))) {
            this.setState({
                validateGender: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={Gender.getAttribute("data-val-required")} />
                }
            });
            return;
        }
        var Name = this.refs["Name"];
        if (_.isEmpty(Name.value)) {
            this.setState({
                validateGender: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={Name.getAttribute("data-val-required")} />
                }
            });
            return;
        }


        var Mobile = this.refs["Mobile"];
        if (_.isEmpty(Mobile.value)) {
            this.setState({
                validateMobile: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={Mobile.getAttribute("data-val-required")} />
                }
            });
            return;
        }
        var re = new RegExp(Mobile.getAttribute("data-val-regex-pattern"));
        var myArray = Mobile.value.match(re);
        if (_.isNull(myArray)) {
            this.setState({
                validateMobile: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={Mobile.getAttribute("data-val-regex")} />
                }
            });
            return;
        }

        var Days = this.refs["Days"].refs["BirthDate_Day"];
        var Months = this.refs["Months"].refs["BirthDate_Month"];
        var Years = this.refs["Years"].refs["BirthDate_Year"];

        if (parseInt(Days.value) ===0) {
            this.setState({
                validateBirthdate: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={Days.getAttribute("data-val-required")} />
                }
            });
            return;
        }

        if (parseInt(Months.value) ===0) {
            this.setState({
                validateBirthdate: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={Months.getAttribute("data-val-required")} />
                }
            });
            return;
        }

        if (parseInt(Years.value) ===0) {
            this.setState({
                validateBirthdate: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={Years.getAttribute("data-val-required")} />
                }
            });
            return;
        }

        var AcceptTerms = this.refs["AcceptTerms"];
        if (!AcceptTerms.checked) {
            this.setState({
                validateAcceptTerms: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={AcceptTerms.getAttribute("data-val-required")} />
                }
            });
            return;
        }

        // var ReceiveNewletters = this.refs["ReceiveNewletters"];
        // if (!ReceiveNewletters.checked) {
        //     this.setState({
        //         validateReceiveNewletters: {
        //             classCss: "input-validation-error",
        //             tagError: <Validate textError={ReceiveNewletters.getAttribute("data-val-required")} />
        //         }
        //     });
        //     return;
        // }
        // 
        var data = {
            newuser: {
                email: RegisterEmail.value,
                password: RegisterPassword.value,
                gender: Gender.value,
                fullname: Name.value,
                phone: Mobile.value,
                birthdate: new Date(parseInt(Years.value), parseInt(Months.value) - 1, parseInt(Days.value) )
            }
        };
        this.registerUser(data);
    }
    registerUser(data) {
        userAPIs.registerUser(data, (err, res) => {
            if (err) {
                var textError = "Đăng ký không thành công! " + err.response.body.error.message;
                this.setState({
                    dialogPopup: <PopUp  turnOffShowOnTop={this.turnOffShowOnTop.bind(this)} status={false} textShow="Đăng Ký Không Thành Công." show={true}/>,
                    registerSubmit: {
                        tagError: <Validate textError={textError} />
                    }
                });
            } else {
                this.initStateValidate();
                this.setState({
                    dialogPopup: <PopUp turnOffShowOnTop={this.turnOffShowOnTop.bind(this)} status={true} textShow="Đăng Ký Thành Công." show={true}/>
                });
            }
        });
    }
    turnOffShowOnTop(status) {
        this.setState({
            dialogPopup: null
        });
        if (status) {
            window.location = "/#/login";
        }
    }
    render() {
        return (
            <div className="col-md-8 col-sm-7">
                {this.state.dialogPopup}
                <Title />
                {this.state.registerSubmit.tagError}
                <form onSubmit={this.handleSubmit.bind(this)} novalidate="novalidate">
                    <div className="form register">
                        <div className="field">
                            <label className="field_L">
                                Email
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input className= {"form_item " + this.state.validateRegisterEmail.classCss} data-val="true" data-val-regex="Email không hợp lệ" data-val-regex-pattern="^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$" data-val-required="Vui lòng nhập email" ref="RegisterEmail" id="RegisterEmail" maxlength="100" name="RegisterEmail" placeholder="Địa chỉ email" type="text" defaultValue="" />
                        </div>
                        {this.state.validateRegisterEmail.tagError}
                        <div className="field">
                            <label className="field_L">
                                Mật khẩu
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input className= {"form_item " + this.state.validateRegisterPassword.classCss} data-val="true" data-val-length="Mật khẩu phải có ít nhất 6 ký tự" data-val-length-max="50" data-val-length-min="6" data-val-required="Vui lòng nhập mật khẩu" id="RegisterPassword" ref="RegisterPassword" maxlength="20" name="RegisterPassword" placeholder="Mật khẩu" type="password"/>
                        </div>
                        {this.state.validateRegisterPassword.tagError}
                        <div className="field">
                            <label className="field_L1">
                                Nhập lại
                                <br />
                                mật khẩu
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input className= {"form_item " + this.state.validateRetypePassword.classCss} data-val="true" data-val-equalto="Mật khẩu bạn nhập không khớp" data-val-equalto-other="*.RegisterPassword" id="RetypePassword" ref="RetypePassword" maxlength="20" name="RetypePassword" placeholder="Nhập lại mật khẩu" type="password"/>
                        </div>
                        {this.state.validateRetypePassword.tagError}
                        <div className="field">
                            <label className="field_L">
                                Họ tên
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <Gender ref="Gender" classCss={this.state.validateGender.classCss}/>
                            <input className={"register_name fr_end " + this.state.validateGender.classCss} data-val="true" data-val-required="Vui lòng nhập họ tên" id="Name" ref="Name" maxlength="100" name="Name" placeholder="Họ tên" type="text" defaultValue=""/>
                        </div>
                        {this.state.validateGender.tagError}
                        <div className="field">
                            <label className="field_L1">
                                Điện thoại
                                <br/>
                                liên lạc
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input className={"form_item " + this.state.validateMobile.classCss} data-val="true" data-val-regex="Không hợp lệ, vui lòng nhập đủ số di động" data-val-regex-pattern="09\d{8}|01\d{9}|0868\d{6}|088\d{7}|089\d{7}" data-val-required="Vui lòng nhập số ĐTDĐ" id="Mobile" ref="Mobile" name="Mobile" placeholder="Điện thoại di động" type="text" defaultValue=""/>
                        </div>
                        {this.state.validateMobile.tagError}
                        <div className="field">
                            <label className="field_L">
                                Ngày sinh
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <Days ref="Days" classCss={this.state.validateBirthdate.classCss}/>
                            <Months ref="Months" classCss={this.state.validateBirthdate.classCss}/>
                            <Years ref="Years" classCss={this.state.validateBirthdate.classCss}/>
                        </div>
                        {this.state.validateBirthdate.tagError}
                        <div className="field_link">
                            <label className="field_R">
                                <input className="L" data-val="true" data-val-required="Xin vui lòng đồng ý với điều khoản trước khi đăng ký" data-val-requirechecked-param="True" data-val-required="The AcceptTerms field is required." id="AcceptTerms" name="AcceptTerms" type="checkbox" ref="AcceptTerms" value="true"/>
                                <span className="checkbox_note">
                                    Tôi đã xem và đồng ý với
                                    <a href="/quy-che-san-giao-dich" target="_blank">
                                        {" "}quy chế của sàn giao dịch
                                    </a>
                                </span>
                            </label>
                        </div>
                        {this.state.validateAcceptTerms.tagError}
                        <div className="field_link">
                            <label className="field_R">
                                <input defaultChecked="checked" className="L" data-val="true" data-val-required="The ReceiveNewletters field is required." id="ReceiveNewletters" name="ReceiveNewletters" ref="ReceiveNewletters" type="checkbox" defaultValue="true"/>
                                <span className="checkbox_note">
                                    Đăng ký nhận mail ưu đãi cực hot tại Áo Thun Phong Cách
                                </span>
                            </label>
                        </div>
                        <br />
                        <div className="field_btn">
                            <button className="btn_primary" id="btnRegister" type="submit">
                                HOÀN THÀNH
                            </button>
                            <a className="link_register" href="/#/login">
                                Đã đăng ký?
                            </a>
                        </div>
                        {this.state.registerSubmit.tagError}
                    </div>
                </form>
            </div>
        );
    }
}
