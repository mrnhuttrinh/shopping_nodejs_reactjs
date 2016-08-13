import React, {Component} from 'react';
import AccountInfo from './AccountInfo';
import ListAddress from './ListAddress';
import ListYourOrder from './ListYourOrder';

export default class RightInfo extends Component {
    render() {
        var user = this.props.user;
        var listAddress = this.props.listAddress;
        var listOrder = this.props.listOrder;
        return (
            <div className="col-lg-9 col-md-10">
                <table className="table table-hover">
                    <thead> 
                        <tr>
                            <th>
                                Bảng Thông tin của tôi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="info">
                                Thông tin tài khoản
                            </td> 
                        </tr>
                        <AccountInfo user={user} />
                        <tr> 
                            <td className="info">
                                Sổ địa chỉ
                            </td> 
                        </tr>
                        <ListAddress listAddress={listAddress}/>
                        <tr> 
                            <td className="info">Đơn Hàng Của Bạn</td> 
                        </tr>
                        <ListYourOrder listOrder={listOrder} />
                    </tbody>
                </table>
            </div>
        );
    }
}
