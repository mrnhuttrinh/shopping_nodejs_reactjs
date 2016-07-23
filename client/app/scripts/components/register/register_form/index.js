import React, {Component} from 'react';
import Title from './Title';
import Years from './Years';
import Months from './Months';
import Days from './Days';
import Gender from './Gender';
import Validate from './Validate';

export default class FormElement extends Component {
    componentDidMount() {
        $(function() {
            $(function () {
                $("#RegisterEmail").focus();
            });
        });
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        return (
            <div className="col-md-8 col-sm-7">
                <Title />
                <form onSubmit={this.handleSubmit.bind(this)} novalidate="novalidate">
                    <input id="ReturnUrl" name="ReturnUrl" type="hidden" value=""/>
                    <div className="form register">
                        <div className="field">
                            <label className="field_L">
                                Email
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input className="form_item input-validation-error" data-val="true" data-val-regex="Email không hợp lệ" data-val-regex-pattern="^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$" data-val-required="Vui lòng nhập email" id="RegisterEmail" maxlength="100" name="RegisterEmail" placeholder="Địa chỉ email" type="text" defaultValue="" />
                        </div>
                        <Validate textError={"Vui lòng nhập số ĐTDĐ"} />
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="RegisterEmail" data-valmsg-replace="true" id="emailValidationMessage">
                            </span>
                        </div>
                        <div className="field">
                            <label className="field_L">
                                Mật khẩu
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input className="form_item" data-val="true" data-val-length="Mật khẩu phải có ít nhất 6 ký tự" data-val-length-max="50" data-val-length-min="6" data-val-required="Vui lòng nhập mật khẩu" id="RegisterPassword" maxlength="20" name="RegisterPassword" placeholder="Mật khẩu" type="password"/>
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="RegisterPassword" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field">
                            <label className="field_L1">
                                Nhập lại
                                <br />
                                mật khẩu
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input className="form_item" data-val="true" data-val-equalto="Mật khẩu bạn nhập không khớp" data-val-equalto-other="*.RegisterPassword" id="RetypePassword" maxlength="20" name="RetypePassword" placeholder="Nhập lại mật khẩu" type="password"/>
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="RetypePassword" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field">
                            <label className="field_L">
                                Họ tên
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <Gender />
                            <input className="register_name fr_end" data-val="true" data-val-required="Vui lòng nhập họ tên" id="Name" maxlength="100" name="Name" placeholder="Họ tên" type="text" defaultValue=""/>
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="Name" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field">
                            <label className="field_L1">
                                Điện thoại
                                <br/>
                                liên lạc
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input className="form_item" data-val="true" data-val-regex="Không hợp lệ, vui lòng nhập đủ số di động" data-val-regex-pattern="09\d{8}|01\d{9}|0868\d{6}|088\d{7}|089\d{7}" data-val-required="Vui lòng nhập số ĐTDĐ" id="Mobile" name="Mobile" placeholder="Điện thoại di động" type="text" defaultValue=""/>
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="Mobile" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field">
                            <label className="field_L">
                                Ngày sinh
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <Days />
                            <Months />
                            <Years />
                            <input data-val="true" data-val-date="The field Birthday must be a date." data-val-required="Vui lòng chọn ngày sinh" id="Birthday" name="Birthday" type="hidden" defaultValue="01/01/1984 12:00:00 SA"/>
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="Birthday" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field_link">
                            <label className="field_R">
                                <input className="L" data-val="true" data-val-requirechecked="Xin vui lòng đồng ý với điều khoản trước khi đăng ký" data-val-requirechecked-param="True" data-val-required="The AcceptTerms field is required." id="AcceptTerms" name="AcceptTerms" type="checkbox" value="true"/>
                                <input name="AcceptTerms" type="hidden" value="false"/>
                                <span className="checkbox_note">
                                    Tôi đã xem và đồng ý với
                                    <a href="/quy-che-san-giao-dich" target="_blank">
                                        {" "}quy chế của sàn giao dịch
                                    </a>
                                </span>
                            </label>
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="AcceptTerms" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field_link">
                            <label className="field_R">
                                <input defaultChecked="checked" className="L" data-val="true" data-val-required="The ReceiveNewletters field is required." id="ReceiveNewletters" name="ReceiveNewletters" type="checkbox" defaultValue="true"/>
                                <input name="ReceiveNewletters" type="hidden" defaultValue="false"/>
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
                    </div>
                </form>
            </div>
        );
    }
}
