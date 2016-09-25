import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router';

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
        if (listAddress.length) {
            var addressContent = _.map(listAddress, (address, index) => {
                return (
                    <tr key={"order_" + index}>
                        <td>{index + 1}</td>
                        <td><Link to={"/address/" + address.id}>{address.fullname}</Link></td>
                        <td>{address.phone}</td>
                        <td>{address.homeno} Đường {address.street}, Phường {address.ward}, {address.district}, {address.province}</td>
                    </tr>
                );
            });
            return (
                <table className="table">
                    <thead>
                        <tr>
                            <th width="50px"></th>
                            <th>Tên</th>
                            <th width="130px">Số Điện Thoại</th>
                            <th>Địa Chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addressContent}
                    </tbody>
                </table>
            );
        } else {
            return (
                <div className="row">
                    <article className="col-sm-12">
                        <div className="alert alert-warning fade in">
                            <i className="fa-fw fa fa-warning"></i>
                            <strong>Không</strong> có địa chỉ nào.
                        </div>
                    </article>
                </div>
            );
        }
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
