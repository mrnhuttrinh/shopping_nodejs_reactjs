import React, {Component} from 'react';

export default class Promotion extends Component {
    render() {
        var product = this.props.product;
        return (
            <div id="description" className="deal_content">
                <div className="deal_detail_Hi">
                    <div dangerouslySetInnerHTML={{__html: product.tech_information}}></div>
                </div>
            </div>
        );
    }
}
