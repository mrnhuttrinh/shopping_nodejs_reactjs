import React, {Component} from 'react';
import _ from 'lodash';

export default class Years extends Component {
    initRangeValue() {
        var current= new Date();
        var currentYear = current.getFullYear();
        var endYear = currentYear - 10;
        var startYear = currentYear - 100;
        var options = [];
        for (var i = endYear; i >= startYear; i--) {
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
            <select className={"date_chose fr_end " + this.props.classCss} defaultValue="0" data-val="true" data-val-number="The field BirthDate_Year must be a number." data-val-required="The BirthDate_Year field is required." data-val-requiredifferent=" " data-val-requiredifferent-param="0" id="BirthDate_Year" ref="BirthDate_Year" name="BirthDate_Year">
                <option defaultChecked="selected" value="0">
                    Năm
                </option>
                {this.initRangeValue()}
            </select>
        );
    }
}
