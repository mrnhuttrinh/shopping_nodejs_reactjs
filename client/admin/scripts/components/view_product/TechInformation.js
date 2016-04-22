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
            $("#summernoteInformation").summernote();
        })
    }
    openDialog(event) {
        event.preventDefault();
        $("#summernoteInformation").summernote("code", this.state.product.tech_information);
    }
    cancelUpdate(event) {
        event.preventDefault();
        $("#summernoteInformation").summernote("code", "");
    }
    updateDescriptionDetail(event) {
        event.preventDefault();
        var self = this;
        var data = $("#summernoteInformation").summernote("code");
        self.setState({
            saveUpdateStatus: true
        })
        self.state.product.tech_information = data;
        apis.updateProduct(self.props.product.id, "tech_information", data, 
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
                    Thông Tin Chi Tiết
                </td>
                <td>
                    <button onClick={this.openDialog.bind(this)} data-target="#techInformationModal" data-toggle="modal" type="button" className="btn btn-default btn-xs pull-right">
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </button>
                    <div dangerouslySetInnerHTML={{__html: product.tech_information}}></div>
                    <div className="modal fade" id="techInformationModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                        <span aria-hidden="true">
                                            ×
                                        </span>
                                    </button>
                                    <h4 className="modal-title">
                                        Thay Đổi Thông Tin Chi Tiết
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <div className="row scroll-customize inline-modal">
                                        <div className="col-md-12">
                                            <div id="summernoteInformation"></div>
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