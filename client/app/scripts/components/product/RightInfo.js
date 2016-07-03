import React, {Component} from 'react';
import RightTop from './RightTop';
import RightBottom from './RightBottom';

export default class RightInfo extends Component {
    render() {
        return (
            <div className="col-md-6 col-sm-12">
                <RightTop product={this.props.product}/>
                <RightBottom product={this.props.product}/>
            </div>
        );
    }
};