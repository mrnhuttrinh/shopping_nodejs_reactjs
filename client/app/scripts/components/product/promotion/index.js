import React, {Component} from 'react';
import LeftRelative from './LeftRelative';

export default class Promotion extends Component {
    render() {
        var product = this.props.product;
        return (
            <div className="index_middle">
                <div className="container content_detail">
                    <div className="row">
                        <div className="col-md-9 col-sm-12">
                            <h4 className="title">Chi tiết khuyến mãi</h4>
                            <div id="description" className="deal_content">
                                <div className="deal_detail_Hi">
                                    <div dangerouslySetInnerHTML={{__html: product.tech_information}}></div>
                                </div>
                            </div>
                        </div>
                        <LeftRelative />
                    </div>
                </div>
            </div>
        );
    }
}
