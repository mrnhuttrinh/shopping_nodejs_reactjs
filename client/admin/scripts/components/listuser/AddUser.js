import React, {Component} from 'react'
import Modal from '../Modal';
import _ from 'lodash'
import apis from '../../apis/main';

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                fullname: "",
                username: "",
                password: "",
                email: "",
                phone: "",
                address: "",
                level: 3
            }
        }
    }
    modalExcuteAdd(event) {
        event.preventDefault();
        var self = this;
        var fullname = self.refs["employerName"].value;
        var username = self.refs["employerUsername"].value;
        var password = self.refs["employerPassword"].value;
        var email = self.refs["employerEmail"].value;
        var phone = self.refs["employerPhone"].value;
        var address = self.refs["employerAddress"].value;
        var role = self.refs["employerRole"].value;
        if (!_.isEmpty(username) && !_.isEmpty(password)) {
            apis.createEmployer({
                fullname,
                username,
                password,
                email,
                phone,
                address,
                role
            }, function(err, res) {
                if (err) {
                    toastr.error(err.response.body.error.message);
                } else {
                    toastr.success("Tạo Thành Công!");
                    self.props.users.listUsers.push(res.body.data)
                    self.props.getAllUser(self.props.users.listUsers, "list");
                    self.refs["modalNameAdd"].closeModal();
                    self.setState({
                        newUser: {
                            fullname: "",
                            username: "",
                            password: "",
                            email: "",
                            phone: "",
                            address: "",
                            level: 3
                        }
                    });
                    self.refs["employerName"].value = "";
                    self.refs["employerUsername"].value = "";
                    self.refs["employerPassword"].value = "";
                    self.refs["employerEmail"].value = "";
                    self.refs["employerPhone"].value = "";
                    self.refs["employerAddress"].value = "";
                    self.refs["employerRole"].value = "3";
                }
            })
        } else {
            // TODO notify for user
            toastr.warning(
                'Tên Đăng Nhập Không Được Trống',
                'Mật Khẩu Không Được Trống'
            )
        }
    }

    render() {
        var modalNameAdd = "modalNameAdd";
        var modalTitleAdd = "Thêm Mới Nhân Viên";
        var modalExcuteAdd = this.modalExcuteAdd;

        var newUser = this.state.newUser;
        return (
            <div>
                <button type="button" className="btn btn-success pull-right" data-target={"#" + modalNameAdd} data-toggle="modal">Thêm Mới</button>
                <Modal ref={modalNameAdd}
                    modalName={modalNameAdd}
                    modalExcute={modalExcuteAdd.bind(this)}
                    modalTitle={modalTitleAdd}>
                    <div className="row">
                        <div className="col-sm-12">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" for="employerName">
                                        Tên Nhân Viên
                                    </label>
                                    <div className="col-sm-10">
                                        <input defaultValue={newUser.fullname} className="form-control" ref="employerName" id="employerName" placeholder="Tên Nhân Viên" type="text">
                                        </input>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" for="employerUsername">
                                        Tên Đăng Nhập
                                    </label>
                                    <div className="col-sm-10">
                                        <input defaultValue={newUser.username} className="form-control" ref="employerUsername" id="employerUsername" placeholder="Tên Đăng Nhập" type="text">
                                        </input>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" for="employerPassword">
                                        Mật Khẩu
                                    </label>
                                    <div className="col-sm-10">
                                        <input defaultValue={newUser.password} className="form-control" ref="employerPassword" id="employerPassword" placeholder="Mật Khẩu" type="text">
                                        </input>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" for="employerEmail">
                                        Email
                                    </label>
                                    <div className="col-sm-10">
                                        <input defaultValue={newUser.email} className="form-control" ref="employerEmail" id="employerEmail" placeholder="Email" type="email">
                                        </input>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" for="employerPhone">
                                        Số Điện Thoại
                                    </label>
                                    <div className="col-sm-10">
                                        <input defaultValue={newUser.phone} className="form-control" ref="employerPhone" id="employerPhone" placeholder="Số Điện Thoại" type="text">
                                        </input>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" for="employerAddress">
                                        Địa Chỉ
                                    </label>
                                    <div className="col-sm-10">
                                        <input defaultValue={newUser.address} className="form-control" ref="employerAddress" id="employerAddress" placeholder="Địa Chỉ" type="text">
                                        </input>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" for="employerRole">
                                        Địa Chỉ
                                    </label>
                                    <div className="col-sm-10">
                                        <select defaultValue={newUser.level} className="form-control" ref="employerRole" id="employerRole">
                                            <option value="2">Quản Lý</option>
                                            <option value="3">Nhân Viên</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
