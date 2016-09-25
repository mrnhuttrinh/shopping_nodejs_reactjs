import React, {Component} from 'react';
import moment from 'moment';

export default class AccountInfo extends Component {
    render() {
        var user = this.props.user;
        var sub_segment = this.props.params ? this.props.params["sub_segment"] : "";
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
                                    Ảnh Đại Diện: 
                                </td>
                                <td>
                                    {" "} <img style={{width: "140px", height: "140px"}} src={user.image} alt="Ảnh Đại Diện" className="img-rounded" />
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
                                    {" "} {moment(user.birthdate).format("DD/MM/YYYY")}
                                </td>
                            </tr>
                            {
                                user.type === "Local" ? (
                                    sub_segment === "user_info" ? (
                                        <tr>
                                            <td>
                                                Đổi Mật Khẩu
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-primary btn-sm">Đổi Mật Khẩu</button>
                                            </td>
                                        </tr>
                                        ) : null
                                ) : (
                                    <tr>
                                        <td>
                                            Liên Kết: 
                                        </td>
                                        <td>
                                            {" "} {user.type}
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </td> 
            </tr> 
        );
    }
}
