import React, {Component} from 'react'
import ButtonLoading from '../ButtonLoading';
import apis from '../../apis/trademark';
import _ from 'lodash'

export default class AddTM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addingNewTM: false
        }
    }
    componentDidMount() {
        $(function() {
            $("#inputDetail").summernote({
                height: 200,
                placeholder: 'Chi Tiết...'
            });
        })
    }
    cancelAddNewTM(event) {
        event.preventDefault();
        this.props.cancelAddNewTM();
        $("#inputDetail").summernote("code", "");
    }
    addNewTMProcess(event) {
        event.preventDefault();
        var self = this;
        var name = self.refs["inputName"].value;
        var address = self.refs["inputAddress"].value;
        var phone = self.refs["inputPhone"].value;
        var email = self.refs["inputEmail"].value;
        var detail = $("#inputDetail").summernote("code");
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
            name: name,
            address: address,
            phone: phone,
            email: email,
            detail: detail
        }
        self.setState({
            addingNewTM: !self.state.addingNewTM
        });
        apis.createTrademark(data, function(err, res) {
            if (err) {
                toastr.error(err.response.body.error.message);
            } else {
                toastr.success("Thêm Nhà Cung Cấp Thành Công!");
                self.props.cancelAddNewTM();
            }
            self.setState({
                addingNewTM: !self.state.addingNewTM
            });
        })
    }
    render() {
        return (
            <div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-2 control-label"></label>
                        <label className="col-sm-10"><h2>Thêm Nhà Cung Cấp</h2></label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputName" className="col-sm-2 control-label">Tên Nhà Cung Cấp</label>
                        <div className="col-sm-10">
                            <input ref="inputName" id="inputName" type="text" className="form-control" placeholder="Tên Nhà Cung Cấp" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress" className="col-sm-2 control-label">Địa Chỉ</label>
                        <div className="col-sm-10">
                            <input ref="inputAddress" id="inputAddress" type="text" className="form-control" placeholder="Địa Chỉ" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPhone" className="col-sm-2 control-label">Điện Thoại</label>
                        <div className="col-sm-10">
                            <input ref="inputPhone" id="inputPhone" type="text" className="form-control" placeholder="Điện Thoại" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail" className="col-sm-2 control-label">Email</label>
                        <div className="col-sm-10">
                            <input ref="inputEmail" id="inputEmail" type="email" className="form-control" placeholder="Email" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDetail" className="col-sm-2 control-label">Chi Tiết</label>
                        <div className="col-sm-10">
                            <div ref="inputDetail" id="inputDetail" ></div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            {
                                this.state.addingNewTM ? (
                                    <ButtonLoading />
                                ) : (
                                    <button onClick={this.addNewTMProcess.bind(this)} type="button" className="btn btn-primary">Lưu</button>
                                )
                            }
                            <button onClick={this.cancelAddNewTM.bind(this)} type="button" className="btn btn-warning">Hủy</button>
                        </div>
                    </div>
                </form>
                <hr />
                <br />
            </div>
        )
    }
}