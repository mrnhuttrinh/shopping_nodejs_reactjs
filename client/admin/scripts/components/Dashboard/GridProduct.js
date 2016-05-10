import React, {Component} from 'react'
import {Link} from 'react-router'
import _ from 'lodash';
import Pagination from '../Pagination';
import localItem from '../../utils/localItem';

export default class GridProduct extends Component {
    constructor(props) {
        super(props);
        var gridView = localItem.getItem("gridView");
        if (_.isEmpty(gridView)) {
            gridView = true;
            localItem.setItem("gridView", true)
        } else {
            gridView = gridView === "true" ? true : false;
        }
        this.state = {
            gridView: gridView
        }
    }
    updateView(event) {
        event.preventDefault();
        localItem.setItem("gridView", !this.state.gridView)
        this.setState({
            gridView: !this.state.gridView
        })
    }
    render() {
        var rows = [];
        if (this.state.gridView) {
            rows = _.map(this.props.dashboard.listProduct, function(product) {
                var totalSize = 0;
                var showSize = _.map(product.sizes, (size) => {
                    totalSize += size.quantity;
                    return (
                        <p className="text-left">Size: {size.name} <p className="pull-right">{size.quantity}</p></p>
                    )
                })
                if (showSize.length === 0) {
                    showSize.push(<p className="text-nowrap">Nhập Size cho sản phẩm</p>)
                }
                return (
                    <div key={product.id} key={product.id} className="col-md-3 col-sm-6 col-xs-12 thumb">
                        <Link to={"/product/" + product.id} className="thumbnail">
                            <div className="product_view">
                                <div className="div-img-responsive">
                                    <img className="img-responsive" src={product.thumbnail} alt="" />
                                    <div className="inside-img-responsive">
                                        {showSize}
                                    </div>
                                </div>
                                <div className="product-name">
                                    <p>{product.name}</p>
                                </div>
                                <h5 className="border-bottom-dotted">Mã <span className="label label-info pull-right">{product.code}</span></h5>
                                <h5 className="border-bottom-dotted">Số Lượng <span className="label label-info pull-right">{totalSize}</span></h5>
                            </div>
                        </Link>
                    </div>
                );
            })
        } else {
            rows = _.map(this.props.dashboard.listProduct, function(product) {
                var totalSize = 0;
                var sizeView = _.map(product.sizes, (size) => {
                    totalSize += size.quantity;
                    return (
                        <button key={size.id} className="btn btn-default btn-xs" type="button">
                            Size {size.name} <span className="badge">{size.quantity}</span>
                        </button>
                    )
                })
                return (
                    <div key={product.id} className="col-md-12">
                        <div className="list-group">
                            <Link to={"/product/" + product.id} className="list-group-item">
                                <div className="row">
                                    <div className="col-md-3">
                                        <img style={{"maxWidth": "200px"}} src={product.thumbnail} className="img-responsive" alt="" />
                                    </div>
                                    <div className="col-md-9">
                                        <h5 className="border-bottom-dotted">Tên <span className="label label-info pull-right">{product.name}</span></h5>
                                        <h5 className="border-bottom-dotted">Mã <span className="label label-info pull-right">{product.code}</span></h5>
                                        <h5 className="border-bottom-dotted">Số Lượng: {sizeView} <span className="label label-info pull-right">{totalSize}</span></h5>
                                        <h5 className="border-bottom-dotted">Giá Sỉ <span className="label label-info pull-right">{product.price_wholesale} VNĐ</span></h5>
                                        <h5 className="border-bottom-dotted">Giá Lẻ <span className="label label-info pull-right">{product.price_retail} VNĐ</span></h5>
                                        <h5 className="border-bottom-dotted">Màu Sắc <span className="label label-info pull-right">{product.color}</span></h5>
                                        <h5 className="border-bottom-dotted">Thương Hiệu <span className="label label-info pull-right">{product.trademark}</span></h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            })
        }
        
        var title = rows.length ? "Số Sản Phẩm Hiện Có " : "Không Có Sản Phẩm Nào";
        return (
            <div className="tab-pane active" id={this.props.category} role="`panel">
                <div className="col-lg-12">
                    <h1 className="page-header">{title}<span className="label label-info">{this.props.dashboard.totalProduct}</span>
                        {
                            this.state.gridView ? (
                                <div className="pull-right">
                                    <button onClick={this.updateView.bind(this)} type="button" className="btn btn-default pull-right" aria-label="Left Align">
                                        <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                                    </button>
                                    <button type="button" className="btn btn-primary pull-right" aria-label="Left Align">
                                        <span className="glyphicon glyphicon-th" aria-hidden="true"></span>
                                    </button>
                                </div>
                            ) : (
                                <div className="pull-right">
                                    <button type="button" className="btn btn-primary pull-right" aria-label="Left Align">
                                        <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                                    </button>
                                    <button onClick={this.updateView.bind(this)} type="button" className="btn btn-default pull-right" aria-label="Left Align">
                                        <span className="glyphicon glyphicon-th" aria-hidden="true"></span>
                                    </button>
                                </div>
                            )
                        }
                    </h1>
                </div>
                <div className="container-fluid row-eq-height">
                    <div className="row">
                        {rows}
                    </div>
                </div>
                <Pagination 
                    page={this.props.page}
                    href={"/dashboard/" + this.props.category}
                    totalRow={this.props.dashboard.totalProduct} 
                    rows={16} />
            </div>
        )
    }
}
