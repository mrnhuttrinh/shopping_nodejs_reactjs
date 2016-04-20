import React, {Component} from 'react'
import {Link} from 'react-router'
import _ from 'lodash';
import Pagination from './Pagination';

export default class GridProduct extends Component {
    render() {
        var rows = _.map(this.props.listProduct, function(product) {
            var totalSize = 0;
            _.forEach(product.sizes, (size) => {
                totalSize += size.quantity;
            })
            return (
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 thumb">
                    <Link to={"/product/" + product.id} className="thumbnail">
                        <div className="product_view">
                            <img className="img-responsive" src={product.thumbnail} alt="" />
                            <h5 className="border-bottom-dotted">Tên <span className="label label-info pull-right">{product.name}</span></h5>
                            <h5 className="border-bottom-dotted">Mã <span className="label label-info pull-right">{product.code}</span></h5>
                            <h5 className="border-bottom-dotted">Số Lượng <span className="label label-info pull-right">{totalSize}</span></h5>
                        </div>
                    </Link>
                </div>
            );
        })
        var title = rows.length ? "Số Sản Phẩm Hiện Có " : "Không Có Sản Phẩm Nào";
        return (
            <div className="tab-pane active" id={this.props.tabChoose} role="tabpanel">
                <div className="col-lg-12">
                    <h1 className="page-header">{title}<span className="label label-info">{this.props.totalProduct}</span></h1>
                </div>
                <div className="row">
                    {rows}
                </div>
                <Pagination {...this.props}/>
            </div>
        )
    }
}