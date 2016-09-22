import React, {Component} from 'react';

export default class AccountInfoEdit extends Component {
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
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Ảnh Đại Diện: 
                                </td>
                                <td>
                                    {" "} <img style={{width: "140px", height: "140px;"}} src={user.image} alt="Ảnh Đại Diện" className="img-rounded" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Tên Đăng Nhập: 
                                </td>
                                <td>
                                    {" "} {user.username}
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
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Giới Tính: 
                                </td>
                                <td>
                                    {" "} {user.gender === 0 ? "Nữ" : "Nam"}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Ngày Sinh: 
                                </td>
                                <td>
                                    {" "} {user.birthdate}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Liên Kết: 
                                </td>
                                <td>
                                    {" "} {user.type}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td> 
            </tr> 
        );
    }
}
