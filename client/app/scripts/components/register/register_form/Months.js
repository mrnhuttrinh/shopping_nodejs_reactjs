import React, {Component} from 'react';
import _ from 'lodash';

export default class Months extends Component {
    initRangeValue() {
        var options = [];
        for (var i = 1; i <= 12; i++) {
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
            <select className={"date_chose " + this.props.classCss} defaultValue="0" data-val="true" data-val-number="The field BirthDate_Month must be a number." data-val-range="The field BirthDate_Month must be between 1 and 12." data-val-range-max="12" data-val-range-min="1" data-val-required="The BirthDate_Month field is required." data-val-requiredifferent=" " data-val-requiredifferent-param="0" id="BirthDate_Month" ref="BirthDate_Month" name="BirthDate_Month">
                <option defaultChecked="selected" value="0">
                    Tháng
                </option>
                {this.initRangeValue()}
            </select>
        );
    }
}
