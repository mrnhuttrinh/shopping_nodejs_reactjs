import React, {Component} from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import checkfileimage from '../../utils/checkfileimage';
import _ from 'lodash';
import Validate from '../Validate';
import userAPIs from '../../apis/user';

export default class AccountInfoEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            birthDate: moment(this.props.user.birthdate),
            avatar: this.props.user.image,
            validateReceiverName: {
                classCss: "",
                tagError: null
            },
            validateMobile: {
                classCss: "",
                tagError: null
            },
        }
    }
    changePhoto(event) {
        event.preventDefault();
        var self = this;
        var inputPhoto = self.refs["exampleInputFile"];
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            console.log('The File APIs are not fully supported in this browser.');
            return;
        } 
        var file = $(inputPhoto)[0].files[0];
        if (checkfileimage(file)) {
            var fr = new FileReader();
            fr.onload = function() {
                self.setState({
                    avatar: fr.result
                });
            }
            fr.readAsDataURL(file);
        } else {
            $(inputPhoto).val("");
        }
    }
    handleChangeBirthDate(date) {
        this.setState({
            birthDate: date
        });
    }
    updateAccountInfo(event) {
        event.preventDefault();
        this.setState({
            validateReceiverName: {
                classCss: "",
                tagError: null
            },
            validateMobile: {
                classCss: "",
                tagError: null
            }
        });
        var ReceiverName = this.refs["ReceiverName"];
        if (_.isEmpty(ReceiverName.value)) {
            this.setState({
                validateReceiverName: {
                    classCss: "input-validation-error",
                    tagError: <Validate textError={ReceiverName.getAttribute("data-val-required")} />
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
        var Gender = this.refs["Gender"];
        var data = {
            image_data: this.state.avatar,
            data: {
                id: this.props.user.id,
                gender: Gender.value,
                fullname: ReceiverName.value,
                phone: Mobile.value,
                birthdate: this.state.birthDate
            }
        };

        userAPIs.updateUserInfo(data, (err, res) => {
            if (err) {

            } else {
                this.props.user.fullname = data.fullname;
                this.props.user.gender = data.gender;
                this.props.user.phone = data.phone;
                this.props.user.birthdate = data.birthdate;
                this.props.user.image = this.state.avatar;
                this.state.avatar = null;
                this.props.userLogin(this.props.user);
                this.context.router.push("/profile");
                // window.location = "/profile";
            }
        });
    }
    render() {
        var user = this.props.user;
        return (
            <tr>
                <td className="padding-0px">
                    <table className="table table-hover margin-0px">
                        <tbody>
                            <tr>
                                <td>
                                    Họ và Tên: 
                                </td>
                                <td>
                                    <input placeholder="Họ & Tên" className="form-control text_form_control" data-val="true" data-val-required="Vui lòng nhập họ và tên" ref="ReceiverName" id="ReceiverName" maxlength="100" name="ReceiverName" type="text" defaultValue={user.fullname} />
                                    {this.state.validateReceiverName.tagError}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Ảnh Đại Diện:
                                </td>
                                <td>
                                    {" "} 
                                    <img style={{width: "140px", height: "140px"}} src={this.state.avatar} alt="Ảnh Đại Diện" className="img-rounded" />
                                    <input ref="exampleInputFile" onChange={this.changePhoto.bind(this)} title="Chọn Ảnh Đại Diện" type="file" accept="image/*" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Email: 
                                </td>
                                <td>
                                    {" "} {user.email}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Phone: 
                                </td>
                                <td>
                                    <input placeholder="Số Điện Thoại" className="form-control text_form_control" data-val="true" data-val-regex="Không hợp lệ, vui lòng nhập đủ số di động" data-val-regex-pattern="09\d{8}|01\d{9}|0868\d{6}|088\d{7}|089\d{7}" data-val-required="Vui lòng nhập số điện thoại" ref="Mobile" id="Mobile" name="Mobile" type="text" defaultValue={user.phone} />
                                    {this.state.validateMobile.tagError}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Giới Tính: 
                                </td>
                                <td>
                                    {" "}
                                    <select defaultValue={user.gender} ref="Gender" className="form-control text_form_control">
                                        <option value="1">Nam</option>
                                        <option value="0">Nữ</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Ngày Sinh: 
                                </td>
                                <td>
                                    {" "} 
                                    <DatePicker
                                        showYearDropdown 
                                        dateFormatCalendar="MMMM" 
                                        dateFormat="DD/MM/YYYY"
                                        className="form-control"
                                        placeholderText="Ngày Sinh"
                                        selected={this.state.birthDate}
                                        onChange={this.handleChangeBirthDate.bind(this)} />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button onClick={this.updateAccountInfo.bind(this)} type="button" className="btn btn-success btn-sm">Lưu</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td> 
            </tr> 
        );
    }
}

AccountInfoEdit.contextTypes = {
    router: function() { return React.PropTypes.func.isRequired; }
};