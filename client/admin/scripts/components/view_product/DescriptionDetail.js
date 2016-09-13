import React, {Component} from 'react'
import _ from 'lodash'
import Loading from '../ButtonLoading';
import apis from '../../apis/main'
export default class DescriptionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveUpdateStatus: false,
            product:  _.cloneDeep(this.props.product)
        }
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            product: _.cloneDeep(nextProps.product)
        })
    }
    componentDidMount() {
        $(function() {
            $("#summernoteDetail").summernote({
                height: 300,
                placeholder: 'Mô Tả Chi Tiết...'
            });
        })
    }
    openDialog(event) {
        event.preventDefault();
        $("#summernoteDetail").summernote("code", this.state.product.description_detail);
    }
    cancelUpdate(event) {
        event.preventDefault();
        $("#summernoteDetail").summernote("code", "");
    }
    updateDescriptionDetail(event) {
        event.preventDefault();
        var self = this;
        var data = $("#summernoteDetail").summernote("code");
        self.setState({
            saveUpdateStatus: true
        })
        self.state.product.description_detail = data;
        apis.updateProduct(self.props.product.id, "description_detail", data, 
            function(err, res) {
                if (err) {
                    toastr.error("Cập Nhật Không Thành Công")
                } else {
                    toastr.success("Cập Nhật Thành Công")
                    self.forceUpdate();
                }
                self.props.getProduct(self.state.product);
                $(self.refs["cancelUpdate"]).click();
                self.setState({
                    saveUpdateStatus: false
                }
            )
        })
    }
    render() {
        var product = this.props.product;
        return (
            <tr>
                <td>
                    Mô Tả Chi Tiết
                </td>
                <td>
                    <button onClick={this.openDialog.bind(this)} data-target="#descriptionDetailModal" data-toggle="modal" type="button" className="btn btn-default btn-xs pull-right">
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </button>
                    <div dangerouslySetInnerHTML={{__html: product.description_detail}}></div>
                    <div className="modal fade" id="descriptionDetailModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                        <span aria-hidden="true">
                                            ×
                                        </span>
                                    </button>
                                    <h4 className="modal-title">
                                        Thay Đổi Mô Tả Chi Tiết
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <div className="row scroll-customize inline-modal">
                                        <div className="col-md-12">
                                            <div id="summernoteDetail"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={this.cancelUpdate.bind(this)} ref="cancelUpdate" className="btn btn-default" data-dismiss="modal" type="button">
                                        Hủy
                                    </button>
                                    {
                                        this.state.saveUpdateStatus ? (
                                            <Loading />
                                        ) : (
                                            <button onClick={this.updateDescriptionDetail.bind(this)} className="btn btn-primary" type="button">
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