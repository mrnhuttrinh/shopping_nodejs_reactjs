import React, {Component} from 'react';

export default class AccountInfo extends Component {
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
                                    {" "} {user.fullname}
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
                                    {" "} {user.phone}
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
