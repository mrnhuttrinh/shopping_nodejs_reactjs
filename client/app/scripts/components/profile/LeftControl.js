import React, {Component} from 'react';

export default class LeftControl extends Component {
    switchMenu(index, event) {
        event.preventDefault();
        this.props.selectMenu(index);
    }
    render() {
        var menuIndex = this.props.menuIndex;
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
                            <td className={menuIndex===0 ? "info" : ""} onClick={this.switchMenu.bind(this, 0)}>
                                Thông Tin Chung
                            </td> 
                        </tr>
                        <tr>
                            <td className={menuIndex===1 ? "info" : ""} onClick={this.switchMenu.bind(this, 1)}>
                                Thông Tin Tài Khoản
                            </td> 
                        </tr> 
                        <tr> 
                            <td className={menuIndex===2 ? "info" : ""} onClick={this.switchMenu.bind(this, 2)}>
                                Danh Sách Địa Chỉ
                            </td> 
                        </tr>
                        <tr> 
                            <td className={menuIndex===3 ? "info" : ""} onClick={this.switchMenu.bind(this, 3)}>
                                Thông Báo Của Bạn
                            </td> 
                        </tr> 
                        <tr> 
                            <td className={menuIndex===4 ? "info" : ""} onClick={this.switchMenu.bind(this, 4)}>
                                Đơn Hàng Của Bạn
                            </td> 
                        </tr> 
                    </tbody>
                </table>
            </div>
        );
    }
}
