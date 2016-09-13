import React, {Component} from 'react'
import apis from '../../apis/main'
import Loading from '../ButtonLoading';
import _ from 'lodash'

export default class DeleteProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteState: false,
            product: _.cloneDeep(this.props.product)
        }
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            product: _.cloneDeep(nextProps.product)
        })
    }
    deleteProduct(event) {
        event.preventDefault();
        var self = this;
        if (self.state.product.id) {
            self.setState({
                deleteState: true
            })
            apis.deleteProduct({
                id: self.state.product.id,
                status: !self.state.product.status
            }, function(err, res) {
                if (err) {
                    if (self.state.product.status) {
                        toastr.error("Xóa Không Thành Công");
                    } else {
                        toastr.error("Hồi Phục Không Thành Công");
                    }
                } else {
                    $(self.refs["cancelDeleteProduct"]).click();
                    self.state.product.status = !self.state.product.status;
                    if (self.state.product.status) {
                        toastr.success("Hồi Phục Thành Công");
                        self.props.getProduct(self.state.product);
                        self.props.getListProduct([]);
                        self.props.getTotalProduct(0);
                    } else {
                        toastr.success("Xóa Thành Công");
                        self.props.getProduct(self.state.product);
                        self.props.getListProduct([]);
                        self.props.getTotalProduct(0);
                    }
                    
                }
                self.setState({
                    deleteState: false
                })
            })
        }
    }
    render() {
        var product = this.props.product;
        var title = product.status ? "" : "Sản Phẩm Không Buôn Bán ";
        var buttonText = product.status ? "Xóa" : "Phục Hồi Sản Phẩm";
        return (
            <div className="pull-right">
                {
                    product.status ? (
                        <button type="button" data-target="#deleteModal" data-toggle="modal" className="btn btn-danger pull-right">
                            Xóa Sản Phẩm
                        </button>
                    ) : (
                        <button type="button" data-target="#deleteModal" data-toggle="modal" className="btn btn-default pull-right">
                            Phục Hồi Sản Phẩm
                        </button>
                    )
                }
                {title}
                <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
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
                                {
                                    this.state.deleteState ? (
                                        <Loading />
                                    ) : (
                                        <button onClick={this.deleteProduct.bind(this)} className="btn btn-primary" type="button">
                                            {buttonText}
                                        </button>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}