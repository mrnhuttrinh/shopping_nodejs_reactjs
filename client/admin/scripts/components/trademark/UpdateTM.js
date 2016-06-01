import React, {Component} from 'react';
import apis from '../../apis/trademark';
import ButtonLoading from '../ButtonLoading';
import _ from 'lodash';

export default class UpdateTM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatingNewTM: false,
            selectedTM: {
                id: "",
                name: "",
                address: "",
                phone: "",
                email: "",
                detail: ""
            }
        }
    }
    componentDidMount() {
        $(function() {
            $("#inputUpdateDetail").summernote({
                height: 200,
                placeholder: 'Chi Tiết...'
            });
        })
    }
    componentWillReceiveProps(nextProps) {
        $("#inputUpdateDetail").summernote("code", nextProps.selectedTM.detail);
        this.setState({
            selectedTM: _.cloneDeep(nextProps.selectedTM)
        })
    }
    updateTM(event) {
        event.preventDefault();
        var self = this;
        var name = self.refs["inputUpdateName"].value;
        var address = self.refs["inputUpdateAddress"].value;
        var phone = self.refs["inputUpdatePhone"].value;
        var email = self.refs["inputUpdateEmail"].value;
        var detail = $("#inputUpdateDetail").summernote("code");
        if (_.isEmpty(name)) {
            toastr.waring("Tên Không Được Trống!");
            return;
        }
        if (_.isEmpty(address)) {
            toastr.waring("Địa Chỉ Không Được Trống!");
            return;
        }
        if (_.isEmpty(phone)) {
            toastr.waring("Số Điện Thoại Không Được Trống!");
            return;
        }
        var data = {
            id: self.props.selectedTM.id,
            name: name,
            address: address,
            phone: phone,
            email: email,
            detail: detail
        }
        self.setState({
            updatingNewTM: !self.state.updatingNewTM
        });
        apis.updateTrademark(data, function(err, res) {
            if (err) {
                toastr.error(err.response.body.error.message);
            } else {
                var _updateTM = _.find(self.props.trademark.listTrademark, function(_tm) {
                    return _tm.id === self.props.selectedTM.id;
                });
                _updateTM.name = data.name;
                _updateTM.address = data.address;
                _updateTM.phone = data.phone;
                _updateTM.email = data.email;
                _updateTM.detail = data.detail;
                self.props.getListTradeMark(self.props.trademark.listTrademark);
                toastr.success("Cập Nhật Cung Cấp Thành Công!");
                $(self.refs["closeModalButton"]).click();
                $("#inputUpdateDetail").summernote("code", "");
            }
            self.setState({
                updatingNewTM: !self.state.updatingNewTM
            });
        })
    }
    handleChange(inputName, event) {
        switch(inputName) {
            case "name":
                this.state.selectedTM.name = event.target.value;
                break;
            case "address":
                this.state.selectedTM.address = event.target.value;
                break;
            case "phone":
                this.state.selectedTM.phone = event.target.value;
                break;
            case "email":
                this.state.selectedTM.email = event.target.value;
                break;
        }
        this.setState({
            selectedTM: this.state.selectedTM
        })
    }
    render() {
        return (
            <div className="modal fade" id="updateTMModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                <span aria-hidden="true">
                                    ×
                                </span>
                            </button>
                            <h4 className="modal-title">
                                Cập Nhật: {this.props.selectedTM.name}
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="row inline-modal scroll-customize">
                                <div className="col-md-12">
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label htmlFor="inputUpdateName" className="col-sm-2 control-label">Tên Nhà Cung Cấp</label>
                                            <div className="col-sm-10">
                                                <input onChange={this.handleChange.bind(this, "name")} ref="inputUpdateName" id="inputUpdateName" type="text" className="form-control" placeholder="Tên Nhà Cung Cấp" value={this.state.selectedTM.name} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputUpdateAddress" className="col-sm-2 control-label">Địa Chỉ</label>
                                            <div className="col-sm-10">
                                                <input onChange={this.handleChange.bind(this, "address")} ref="inputUpdateAddress" id="inputUpdateAddress" type="text" className="form-control" placeholder="Địa Chỉ" value={this.state.selectedTM.address}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputUpdatePhone" className="col-sm-2 control-label">Điện Thoại</label>
                                            <div className="col-sm-10">
                                                <input onChange={this.handleChange.bind(this, "phone")} ref="inputUpdatePhone" id="inputUpdatePhone" type="text" className="form-control" placeholder="Điện Thoại" value={this.state.selectedTM.phone}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputUpdateEmail" className="col-sm-2 control-label">Email</label>
                                            <div className="col-sm-10">
                                                <input onChange={this.handleChange.bind(this, "email")} ref="inputUpdateEmail" id="inputUpdateEmail" type="email" className="form-control" placeholder="Email" value={this.state.selectedTM.email}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputUpdateDetail" className="col-sm-2 control-label">Chi Tiết</label>
                                            <div className="col-sm-10">
                                                <div ref="inputUpdateDetail" id="inputUpdateDetail" ></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref="closeModalButton" className="btn btn-default" data-dismiss="modal" type="button">
                                Hủy
                            </button>
                            {
                                this.state.updatingNewTM ? (
                                    <ButtonLoading />
                                ) : (
                                    <button onClick={this.updateTM.bind(this)} className="btn btn-primary" type="button">
                                        Lưu
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
