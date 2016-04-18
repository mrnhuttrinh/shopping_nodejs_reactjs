import React, {Component} from 'react'
import _ from 'lodash';
import Pagination from './Pagination';

export default class GridProduct extends Component {
    render() {
        var rows = _.map(this.props.listProduct, function(product) {
            return (
                <div className="col-lg-3 col-md-3 col-xs-3 thumb">
                    <a className="thumbnail" href="#">
                        <img style={{"width": "400px", "height": "300px"}} className="img-responsive" src={product.thumbnail} alt="" />
                    </a>
                </div>
            );
        })
        var title = rows.length ? "Danh Sách Sản Phẩm" : "Không Có Sản Phẩm Nào";
        return (
            <div className="tab-pane active" id={this.props.tabChoose} role="tabpanel">
                <div className="col-lg-12">
                    <h1 className="page-header">{title}</h1>
                </div>
                <div className="row">
                    {rows}
                </div>
                <Pagination {...this.props}/>
            </div>
        )
    }
}