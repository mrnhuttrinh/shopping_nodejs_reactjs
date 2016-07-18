import React, {Component} from 'react'

export default class TableTitle extends Component {
    render() {
        return (
            <tr>
                <th align="left" scope="col" width="53%">
                    Sản phẩm
                </th>
                <th align="center" scope="col" width="12%">
                    Đơn giá
                </th>
                <th align="center" scope="col" width="20%">
                    Số lượng
                </th>
                <th align="center" scope="col" width="15%">
                    Thành tiền
                </th>
            </tr>
        );
    }
}
