import React, {Component} from 'react'
import {connect} from 'react-redux';
import _ from 'lodash';
import MasterPage from './MasterPage'
import actions from '../actions/main'
import apis from '../apis/main';
import Table from '../components/Table';
import Modal from '../components/Modal';

class AddUser extends Component {
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
                    toastr.error(err.message);
                } else {
                    toastr.success("Tạo Thành Công!");
                    self.props.allUser.push(res.body.data)
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
                    self.props.getAllUser(self.props.allUser);
                    self.refs[self.props.modalNameAdd].closeModal();
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
        var modalNameAdd = this.props.modalNameAdd;
        var modalTitleAdd = "Thêm Mới Nhân Viên";
        var modalExcuteAdd = this.modalExcuteAdd;

        var newUser = this.state.newUser;
        return (
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
        );
    }
}

class ListUser extends Component{
    componentDidMount() {
        var self = this;
        if (_.isEmpty(this.props.allUser)) {
            apis.getAllUser(function(err, res) {
                if (err) {
    
                } else {
                    if (res.status === 200) {
                        self.props.getAllUser(res.body.data);
                    } else {

                    }
                }
            });
        }
    }

    modalExcute(event) {
        event.preventDefault();
    }

    render() {
        var self = this;
        var modalName = "myModal";
        var modalTitle = "Chỉnh Sửa Nhân Viên";
        var modalExcute = this.modalExcute;
        var modalNameAdd = "addNewEmployer";
        // var listUser;
        var head= [
            "No.", 
            "Username", 
            "Level", 
            "Phone",
            "Email",
            "Edit"
        ];
        var indexNo = 0;
        var rows = _.map(this.props.allUser, (user) => {
            if (user.level !== 1) {
                indexNo++;
                var level = user.level === 2 ? "Quản Lý" : "Nhân Viên";
                return [
                    indexNo,
                    user.username,
                    level,
                    user.phone,
                    user.email,
                    (
                        user.status ? (
                            <button className="btn btn-primary btn-xs" data-target={"#" + modalName} data-toggle="modal" type="button">
                                Edit
                            </button>
                        ) : (
                            <button className="btn btn-danger btn-xs" data-target={"#aaaa"} data-toggle="modal" type="button">
                                Không Sử Dụng
                            </button>
                        )
                    )
                ]
            }
        });
        return (
            <MasterPage 
                pathname={this.props.location.pathname}
                {...this.props}
                title={"Nhân Viên"}>
                <div id="content">
                    <Table 
                        head={head}
                        rows={rows}/>
                    <button type="button" className="btn btn-success" data-target={"#" + modalNameAdd} data-toggle="modal">Thêm Mới</button>
                </div>
                <Modal modalName={modalName}
                    modalExcute={modalExcute}
                    modalTitle={modalTitle}>
                </Modal>
                <AddUser {...this.props} modalNameAdd={modalNameAdd}/>
            </MasterPage>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.default
    }
}

export default connect(
    mapStateToProps,
    actions
)(ListUser)