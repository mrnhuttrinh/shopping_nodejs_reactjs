import React, {Component} from 'react';

export default class Validate extends Component {
    render() {
        return (
            <div className="err">
                <span className="field-validation-error"><span id="Mobile-error" className="">{this.props.textError}</span></span>
            </div>
        );
    }
}


