import React, {Component} from 'react';
import {Link} from 'react-router';

export default class LeftControl extends Component {
    render() {
        var menuName = this.props.menuName;
        return (
            <div className="col-lg-3 col-md-2">
                <table className="table table-hover table_profile">
                    <thead> 
                        <tr>
                            <th scope="row">
                                <div className="profiles">
                                    <p className="image"><img src="https://graph.facebook.com/100002529142517/picture" alt="" /></p>
                                    <p className="name">Tài khoản của</p>
                                    <h6>Trình Nguyễn Nhựt</h6>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={menuName===undefined? "info" : ""}>
                                <Link to="/profile">
                                    Thông Tin Chung
                                </Link>
                            </td> 
                        </tr>
                        <tr>
                            <td className={menuName==="user_info" ? "info" : ""}>
                                <Link to="/profile/user_info">
                                    Thông Tin Tài Khoản
                                </Link>
                            </td> 
                        </tr> 
                        <tr> 
                            <td className={menuName==="addresses" ? "info" : ""}>
                                <Link to="/profile/addresses">
                                    Danh Sách Địa Chỉ
                                </Link>
                            </td> 
                        </tr>
                        <tr> 
                            <td className={menuName==="notifications" ? "info" : ""}>
                                <Link to="/profile/notifications">
                                    Thông Báo Của Bạn
                                </Link>
                            </td>
                        </tr> 
                        <tr> 
                            <td className={menuName==="myorders" ? "info" : ""}>
                                <Link to="/profile/myorders">
                                    Đơn Hàng Của Bạn
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
