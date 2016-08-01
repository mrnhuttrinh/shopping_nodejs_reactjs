import React, {Component} from 'react';

export default class ChooseAddress extends Component {
    render() {
        return (
            <div className="chose_add">
                <p>
                    <a className="other_add" href="javascript:;">Chọn địa chỉ khác</a>
                    <a className="change">Thay đổi</a>
                </p>
                <p>
                    <select autocomplete="off" name="CustomerAddress">
                        <option selected="selected" value="2013704">8/4 Đường 21, Khác, Quận Thủ Đức, TP Hồ Chí Minh</option>
                    </select>
                </p>
                <p>
                    <a href="javascript:;" className="chose_ad">Tạo địa chỉ mới</a>
                </p>
            </div>
        )
    }
}