import React, {Component} from 'react';
import _ from 'lodash';

export default class Province extends Component {
    initRangeValue() {
        var locations = this.props.locations;
        return _.map(locations, (province, index) => {
            <option key={index} value={province.name}>
                {province.name}
            </option>
        });
    }
    render() {
        return (
            <select ref="Province" defaultValue="0" className={"date_chose " + this.props.classCss} data-val="true" data-val-number="The field Province must be a number." data-val-range="The field BirthDate_Day must be between 1 and 31." data-val-range-max="31" data-val-range-min="1" data-val-required="The Province field is required." data-val-requiredifferent=" " data-val-requiredifferent-param="0" id="Province" name="Province">
                <option defaultChecked="selected" value="0">
                    Chọn Tỉnh/TP
                </option>
                {this.initRangeValue()}
            </select>
        );
    }
}
