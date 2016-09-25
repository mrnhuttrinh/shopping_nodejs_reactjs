import React, {Component} from 'react';

export default class ExpandMore extends Component {
    render() {
        var product = this.props.product;
        return (
            <div className="index_view_more">
                <div className="view_more" id="actionView">
                    <span>XEM THÊM</span>
                    <a id="viewMore" onclick="productdetail.viewMore()" className="ic_view_more_dow"></a>
                </div>
            </div>
        );
    }
}


export default class LongDescription extends Component {
    render() {
        var product = this.props.product;
        return (
            <div className="deal_detail_Hi">
                <div dangerouslySetInnerHTML={{__html: product.description_detail}}></div>
            </div>
        );
    }
}
