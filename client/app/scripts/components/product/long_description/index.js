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
            <div className="index_middle index_middle_grey dad">
                <div className="container">
                    <div className="row content_deal_hi">
                        <div className="col-md-12 col-sm-12">
                            <div className="deal_detail_Hi">
                                <h4>Điểm nổi bật</h4>
                                <div dangerouslySetInnerHTML={{__html: product.description_detail}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
