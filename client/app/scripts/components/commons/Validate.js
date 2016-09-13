import React, {Component} from 'react';

export default class Validate extends Component {
    render() {
        return (
            <div className={this.props.classCss + " err"}>
                <span className="field-validation-error"><span>{this.props.textError}</span></span>
            </div>
        );
    }
}


