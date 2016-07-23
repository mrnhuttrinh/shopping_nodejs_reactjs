import React, {Component} from 'react';
import _ from 'lodash';

export default class Gender extends Component {
    render() {
        return (
            <select ref="Gender" className={"date_chose " + this.props.classCss} defaultValue="" data-val="true" data-val-required="Vui lòng chọn giới tính" id="Gender" name="Gender">
                <option defaultChecked="selected" value="">
                    Giới tính
                </option>
                <option value="0">
                    Nam
                </option>
                <option value="1">
                    Nữ
                </option>
            </select>
        );
    }
}
