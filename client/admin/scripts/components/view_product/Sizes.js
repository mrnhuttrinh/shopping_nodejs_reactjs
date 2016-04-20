import React, {Component} from 'react'
import _ from 'lodash';
export default class Sizes extends Component {
    render() {
        var totalProduct = 0;
        var product = this.props.product;
        var viewSize = "";
        if (product) {
            viewSize = _.map(product.sizes, (size)=> {
                totalProduct += size.quantity;
                return (
                    <div className="form-group">
                        <label className="col-sm-2 control-label">
                            Tên Size
                        </label>
                        <div className="col-sm-3">
                            <input ref={"size-name-"} className="form-control" placeholder="Tên Size" type="text">
                            </input>
                        </div>
                        <label className="col-sm-2 control-label">
                            Số Lượng
                        </label>
                        <div className="col-sm-3">
                            <input  className="form-control" ref={"size-quantity-"} placeholder="Số Lượng Size" type="number">
                            </input>
                        </div>
                        <div className="col-sm-1">
                            <button  type="button" className="btn btn-default">
                                <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                )
            });
        }
        return (
            <tr>
                <td>
                    Tổng Số Lượng
                </td>
                <td>
                    <span className="label label-info">{totalProduct}</span>
                    <button data-target="#sizesModal" data-toggle="modal" type="button" className="btn btn-default btn-xs pull-right">
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </button>
                    <div className="modal fade" id="sizesModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                        <span aria-hidden="true">
                                            ×
                                        </span>
                                    </button>
                                    <h4 className="modal-title">
                                        Thay Đổi Size
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <form className="form-horizontal scroll-customize inline-modal">
                                        {viewSize}
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default pull-left">
                                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>Thêm Size
                                    </button>
                                    <button ref="cancelDeleteProduct" className="btn btn-default" data-dismiss="modal" type="button">
                                        Hủy
                                    </button>
                                    <button className="btn btn-primary" type="button">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}