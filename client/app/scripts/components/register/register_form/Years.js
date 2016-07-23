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
                <option key={i} defaultValue={i}>
                    {i}
                </option>
            );
        }
        return options;
    }
    render() {
        return (
            <select className="date_chose fr_end" data-val="true" data-val-number="The field BirthDate_Year must be a number." data-val-required="The BirthDate_Year field is required." data-val-requiredifferent=" " data-val-requiredifferent-param="0" id="BirthDate_Year" name="BirthDate_Year">
                <option defaultChecked="selected" defaultValue="0">
                    Năm
                </option>
                {this.initRangeValue()}
            </select>
        );
    }
}
