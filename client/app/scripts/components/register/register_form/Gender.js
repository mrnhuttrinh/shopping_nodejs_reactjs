import React, {Component} from 'react';
import _ from 'lodash';

export default class Gender extends Component {
    render() {
        return (
            <select className="date_chose" data-val="true" data-val-required="Vui lòng chọn giới tính" id="Gender" name="Gender">
                <option defaultChecked="selected" defaultValue="">
                    Giới tính
                </option>
                <option defaultValue="0">
                    Nam
                </option>
                <option defaultValue="1">
                    Nữ
                </option>
            </select>
        );
    }
}
