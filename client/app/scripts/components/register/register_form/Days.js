import React, {Component} from 'react';
import _ from 'lodash';

export default class Days extends Component {
    initRangeValue() {
        var options = [];
        for (var i = 1; i <= 31; i++) {
            options.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        return options;
    }
    render() {
        return (
            <select ref="BirthDate_Day" defaultValue="0" className={"date_chose " + this.props.classCss} data-val="true" data-val-number="The field BirthDate_Day must be a number." data-val-range="The field BirthDate_Day must be between 1 and 31." data-val-range-max="31" data-val-range-min="1" data-val-required="The BirthDate_Day field is required." data-val-requiredifferent=" " data-val-requiredifferent-param="0" id="BirthDate_Day" name="BirthDate_Day">
                <option defaultChecked="selected" value="0">
                    Ngày
                </option>
                {this.initRangeValue()}
            </select>
        );
    }
}
