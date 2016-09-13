import React, {Component} from 'react';
import _ from 'lodash';

export default class RightInfo extends Component {
    renderEmpty() {
        return (
            <tr>
                <td>
                    Bạn Chưa Có Địa Chỉ Nào! Vui Lòng Thêm Địa Chỉ Mới
                </td>
            </tr>
        );
    }
    renderListAddress() {
        var listAddress = this.props.listAddress;
        return _.map(listAddress, (address, index) => {
            return (
                <tr key={"address_" + index}>
                    <td>
                        {address.fullname} - {address.phone}
                    </td>
                    <td>
                        {address.homeno} Đường {address.street}, Phường {address.ward}, {address.district}, {address.province}
                    </td>
                </tr>
            );
        });
    }
    render() {
        var content = null;
        if (this.props.listAddress.length) {
            content = this.renderListAddress();
        } else {
            content = this.renderEmpty();
        }
        return (
            <tr>
                <td className="padding-0px">
                    <table className="table table-hover margin-0px">
                        <tbody>
                            {content}
                        </tbody>
                    </table>
                </td> 
            </tr> 
        );
    }
}
