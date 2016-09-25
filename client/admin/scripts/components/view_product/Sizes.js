import React, {Component} from 'react'
import _ from 'lodash';
import Loading from '../ButtonLoading';
import apis from '../../apis/main';
export default class Sizes extends Component {
    constructor(props) {
        super(props);

        // backup old sizes
        var product = _.cloneDeep(this.props.product);
        this.state = {
            product: product,
            newSizes: [],
            sizeRemove: [],
            saveUpdateStatus: false
        }
    }
    addSize(event) {
        event.preventDefault();
        var numberNew = this.state.newSizes.length;
        if (numberNew !== 0) {
            numberNew = this.state.newSizes[numberNew-1].number;
        }
        this.state.newSizes.push({
            id: numberNew,
            quantity: 0,
            name: ""
        });
        this.setState({
            newSizes: this.state.newSizes
        })
    }
    removeSizeHasExit(id, event) {
        event.preventDefault();
        var self = this;
        self.state.sizeRemove.push(id);
        _.remove(self.state.product.sizes, (size) => {
            return size.id === id;
        });
        self.setState({
            sizes: self.state.product.sizes,
            sizeRemove: self.state.sizeRemove
        });
    }
    removeSizeNew(id, event) {
        event.preventDefault();
        var self = this;
        _.remove(self.state.newSizes, (size) => {
            return size.id === id;
        });
        self.setState({
            newSizes: self.state.newSizes
        });
    }
    saveUpdate(event) {
        event.preventDefault();
        var self = this;
        var id = self.state.product.id;
        var updatesize = self.state.product.sizes;
        var newsize = self.state.newSizes;
        var remove = self.state.sizeRemove;
        var data = {
            new: newsize,
            update: updatesize,
            remove: remove
        };
        self.setState({
            saveUpdateStatus: true
        })
        apis.updateProduct(id, "size", data, function(err, res) {
            if (err) {
                toastr.error("Cập Nhật Size Không Thành Công")
            } else {
                apis.getProduct(self.state.product.id, function(err, res) {
                    if (err) {
                    } else {
                        self.props.getProduct(res.body.data);
                    }
                })
                toastr.success("Cập Nhật Size Thành Công")
                $(self.refs["cancelUpdateSize"]).click();
                self.setState({
                    product: _.cloneDeep(self.props.product),
                    saveUpdateStatus: false,
                    newSizes: [],
                    sizeRemove: []
                })
            }
            self.setState({
                saveUpdateStatus: false
            })
        })
    }
    oldSizeNameChange(sizeid, event) {
        event.preventDefault();
        var self = this;
        var sizeUpdate = _.find(self.state.product.sizes, (size) => {
            return size.id === sizeid
        })
        sizeUpdate.name = event.currentTarget.value;
    }
    oldSizeQuantityChange(sizeid, event) {
        event.preventDefault();
        var self = this;
        var sizeUpdate = _.find(self.state.product.sizes, (size) => {
            return size.id === sizeid
        })
        sizeUpdate.quantity_temp = (event.currentTarget.value - sizeUpdate.quantity) + sizeUpdate.quantity_temp ;
        sizeUpdate.quantity = event.currentTarget.value;
    }

    newSizeNameChange(sizeid, event) {
        event.preventDefault();
        var self = this;
        var sizeUpdate = _.find(self.state.newSizes, (size) => {
            return size.id === sizeid
        })
        sizeUpdate.name = event.currentTarget.value;
    }
    newSizeQuantityChange(sizeid, event) {
        event.preventDefault();
        var self = this;
        var sizeUpdate = _.find(self.state.newSizes, (size) => {
            return size.id === sizeid
        })
        sizeUpdate.quantity = event.currentTarget.value;
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            product: _.cloneDeep(nextProps.product)
        })
    }
    cancelUpdateSize(event) {
        event.preventDefault();
        this.setState({
            product: _.cloneDeep(this.props.product),
            newSizes: [],
            sizeRemove: []
        })
    }
    render() {
        var totalProduct = 0;
        var totalProductOrder = 0;
        var product = this.state.product;
        var viewSize = [];
        if (this.props.product) {
            _.forEach(this.props.product.sizes, size => {
                totalProduct += size.quantity;
                totalProductOrder += size.quantity_temp;
            })
        }

        if (product) {
            if (product.sizes) {
                if (product.sizes.length) {
                    viewSize = _.map(product.sizes, (size)=> {
                        return (
                            <div key={size.id} className="form-group">
                                <label className="col-sm-2 control-label">
                                    Tên Size
                                </label>
                                <div className="col-sm-3">
                                    <input onChange={this.oldSizeNameChange.bind(this, size.id)} defaultValue={size.name} ref={"size-name-" + size.id} className="form-control" placeholder="Tên Size" type="text">
                                    </input>
                                </div>
                                <label className="col-sm-2 control-label">
                                    Số Lượng
                                </label>
                                <div className="col-sm-3">
                                    <input onChange={this.oldSizeQuantityChange.bind(this, size.id)} defaultValue={size.quantity} className="form-control" ref={"size-quantity-" + size.id} placeholder="Số Lượng Size" type="number">
                                    </input>
                                </div>
                                <div className="col-sm-1">
                                    <button onClick={this.removeSizeHasExit.bind(this, size.id)} type="button" className="btn btn-default">
                                        <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                        )
                    });
                } else {
                    viewSize = (
                        <p>
                            Chưa Có Bất Kì Size!
                        </p>
                    )
                }
            }
        }
        var sizeNewViews = _.map(this.state.newSizes, (size)=> {
            return (
                <div key={size.id} className="form-group">
                    <label className="col-sm-2 control-label">
                        Tên Size
                    </label>
                    <div className="col-sm-3">
                        <input onChange={this.newSizeNameChange.bind(this, size.id)} defaultValue={size.name} ref={"size-name-" + size.id} className="form-control" placeholder="Tên Size" type="text">
                        </input>
                    </div>
                    <label className="col-sm-2 control-label">
                        Số Lượng
                    </label>
                    <div className="col-sm-3">
                        <input onChange={this.newSizeQuantityChange.bind(this, size.id)} defaultValue={size.quantity} className="form-control" ref={"size-quantity-" + size.id} placeholder="Số Lượng Size" type="number">
                        </input>
                    </div>
                    <div className="col-sm-1">
                        <button onClick = {this.removeSizeNew.bind(this, size.id)} type="button" className="btn btn-default">
                            <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
            )
        });
        return (
            <tr>
                <td>
                    Số Lượng
                </td>
                <td>
                    <span className="label label-info">Tổng {totalProduct}</span>{" "}
                    <span className="label label-warning">Đặt Hàng {totalProduct - totalProductOrder}</span>{" "}
                    <span className="label label-success">Còn Lại {totalProductOrder}</span>
                    <button data-target="#sizesModal" data-toggle="modal" type="button" className="btn btn-default btn-xs pull-right">
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </button>
                    <div className="modal fade" id="sizesModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
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
                                        {sizeNewViews}
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={this.addSize.bind(this)} type="button" className="btn btn-default pull-left">
                                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>Thêm Size
                                    </button>
                                    <button onClick={this.cancelUpdateSize.bind(this)} ref="cancelUpdateSize" className="btn btn-default" data-dismiss="modal" type="button">
                                        Hủy
                                    </button>
                                    {
                                        this.state.saveUpdateStatus ? (
                                            <Loading />
                                        ) : (
                                            <button onClick={this.saveUpdate.bind(this)} className="btn btn-primary" type="button">
                                                Lưu
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}