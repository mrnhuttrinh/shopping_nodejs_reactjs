import React, {Component} from 'react'
import apis from '../../apis/main'

export default class DeleteProduct extends Component {
    deleteProduct(event) {
        event.preventDefault();
        var self = this;
        if (this.props.product.id) {
            apis.deleteProduct(this.props.product.id, function(err, res) {
                if (err) {
                    toastr.error("Xóa Không Thành Công");
                } else {
                    $(self.refs["cancelDeleteProduct"]).click();
                    toastr.success("Xóa Thành Công");
                    self.props.getListProduct([]);
                    self.props.getTotalProduct(0);
                    window.location = "/admin/#/dashboard";
                }
            })
        }
    }
    render() {
        return (
            <div className="pull-right">
                <button type="button" data-target="#deleteModal" data-toggle="modal" className="btn btn-danger pull-right">
                    Xóa Sản Phẩm
                </button>
                <div className="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                    <span aria-hidden="true">
                                        ×
                                    </span>
                                </button>
                                <h4 className="modal-title">
                                    Xóa Sản Phẩm
                                </h4>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Bạn Có Chắc Chắn Muốn Xóa Sản Phẩm Này
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button ref="cancelDeleteProduct" className="btn btn-default" data-dismiss="modal" type="button">
                                    Hủy
                                </button>
                                <button onClick={this.deleteProduct.bind(this)} className="btn btn-primary" type="button">
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}