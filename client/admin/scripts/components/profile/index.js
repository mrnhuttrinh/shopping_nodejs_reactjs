import React, {Component} from 'react'
import checkfileimage from '../../utils/checkfileimage';
import apis from '../../apis/main';
import _ from 'lodash';

export default class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            changePassword: false,
            user: _.cloneDeep(this.props.user)
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            user: _.cloneDeep(this.props.user)
        })
    }
    onEditUpdateButton(event) {
        event.preventDefault();
        var self = this;
        var updateInfo = {
            fullname: self.refs["fullname"].value,
            email: self.refs["email"].value,
            phone: self.refs["phone"].value,
            address: self.refs["address"].value,
        }
        apis.updateProfile(updateInfo, function(err, res) {
            if (err) {
                toastr.error("Cập Nhật Thông Tin Không Thành Công!")
            } else {
                self.state.user = Object.assign({}, 
                    self.state.user,
                    updateInfo
                )
                self.props.signIn(self.state.user);
                self.setState({
                    edit: !self.state.edit
                });
                toastr.success("Cập Nhật Thông Tin Thành Công!")
            }
        })
    }
    onEditButton(event) {
        event.preventDefault();
        this.setState({
            edit: !this.state.edit
        });
    }
    onChangePasswordButton(event) {
        event.preventDefault();
        this.setState({
            changePassword: !this.state.changePassword
        });
    }
    onChangeUpdatePasswordButton(event) {
        event.preventDefault();
        var self = this;
        var data = {
            currentPassword: self.refs["currentPassword"].value,
            newPassword: self.refs["newPassword"].value,
            confirmPassword: self.refs["confirmPassword"].value
        }
        if (_.isEmpty(data.currentPassword)
            || _.isEmpty(data.newPassword)
            || _.isEmpty(data.confirmPassword)) {
            toastr.warning("Không Được Để Trống Mật Khẩu")
            return;
        }
        if (data.newPassword !== data.confirmPassword) {
            toastr.warning("Xác Nhận Mật Khẩu Không Giống!")
            return;
        }
        apis.updatePassword(data, function(err, res) {
            if (err) {
                if (err.status === 300) {
                    toastr.error("Mật Khẩu Hiện Tại Không Đúng")
                } else {
                    toastr.error("Đổi Mật Khẩu Không Thành Công!")
                }
            } else {
                self.setState({
                    changePassword: !self.state.changePassword
                });
                toastr.success("Đổi Mật Khẩu Thành Công!")
            }
        })
    }
    changePhoto(event) {
        event.preventDefault();
        var self = this;
        var inputPhoto = self.refs["exampleInputFile"];
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            console.log('The File APIs are not fully supported in this browser.');
            return;
        } 
        var file = $(inputPhoto)[0].files[0];
        if (checkfileimage(file)) {
            var fr = new FileReader();
            fr.onload = function() {
                // fr.result is base-64
                // console.log(fr.result);
                apis.updateEmployerPhoto(fr.result, function(err, res) {
                    if (err) {
                        toastr.error("Cập Nhật Hình Không Thành Công")
                    } else {
                        var user = self.state.user;
                        user.image = fr.result;
                        $(inputPhoto).val("");
                        // self.setState({
                        //     user: self.state.user
                        // })
                        self.props.signIn(user);
                    }
                })
            }
            fr.readAsDataURL(file);
        } else {
            $(inputPhoto).val("");
        }
    }

    render() {
        var edit = this.state.edit;
        var user = this.state.user;
        if (user) {
            return (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="carousel profile-carousel" id="myCarousel">
                            <div className="carousel-inner">
                                <div className="item active">
                                    <img style={{"width": "100%"}} alt="demo user" src="img/demo/s1.jpg">
                                    </img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-4 profile-pic">
                                <div className="col-sm-3 profile-pic" style={{"width": "100%"}}>
                                    <img src={this.props.user.image} alt="Ảnh Đại Diện" style={{"maxWidth": "100%","width": "250px", "height": "250px", "top": "-100px"}}/>
                                    <div style={{"marginTop": "-60px", "marginLeft": "70px"}} className="padding-10">
                                        <input type="file" onChange={this.changePhoto.bind(this)} id="exampleInputFile" ref="exampleInputFile" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <h1>
                                    Thông Tin
                                </h1>
                                <table className="table table-bordered table-striped" id="user">
                                    <tbody>
                                        <tr>
                                            <td style={{"width": "50%"}}>
                                                Tên Đầy Đủ
                                            </td>
                                            <td style={{"width": "50%"}}>
                                                {
                                                    edit ? (
                                                            <form>
                                                                <div className="form-group">
                                                                    <input ref="fullname" type="text" className="form-control" placeholder="Tên Đầy Đủ" defaultValue={user.fullname} />
                                                                </div>
                                                            </form>
                                                        ) : user.fullname
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Tên Đăng Nhập
                                            </td>
                                            <td>
                                                {user.username}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Email
                                            </td>
                                            <td>
                                                {
                                                    edit ? (
                                                            <form>
                                                                <div className="form-group">
                                                                    <input ref="email" type="email" className="form-control" placeholder="Email" defaultValue={user.email} />
                                                                </div>
                                                            </form>
                                                        ) : user.email
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Số Điện Thoại
                                            </td>
                                            <td>
                                                {
                                                    edit ? (
                                                            <form>
                                                                <div className="form-group">
                                                                    <input ref="phone" type="text" className="form-control" placeholder="Số Điện Thoại" defaultValue={user.phone} />
                                                                </div>
                                                            </form>
                                                        ) : user.phone
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Địa Chỉ
                                            </td>
                                            <td>
                                                {
                                                    edit ? (
                                                            <form>
                                                                <div className="form-group">
                                                                    <input ref="address" type="text" className="form-control" placeholder="Địa Chỉ" defaultValue={user.address} />
                                                                </div>
                                                            </form>
                                                        ) : user.address
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Cấp Bật
                                            </td>
                                            <td>
                                                {
                                                    user.level === 1 ? "Admin" : (user.level === 2 ? "Mod" : "User") 
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            </td>
                                            <td>
                                            { 
                                                edit ? (<div>
                                                        <button type="button" onClick={this.onEditButton.bind(this)} className="btn btn-warning">Hủy</button>
                                                        <button type="button" onClick={this.onEditUpdateButton.bind(this)} className="btn btn-primary">Lưu</button>
                                                    </div>) :
                                                    (<button type="button" onClick={this.onEditButton.bind(this)} className="btn btn-primary">Thay Đổi</button>)
                                            }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {
                                    this.state.changePassword ? 
                                        (<div>
                                            <form>
                                                <div className="form-group">
                                                    <input ref="currentPassword" type="password" className="form-control" placeholder="Mật Khẩu Hiện Tại" />
                                                </div>
                                                <div className="form-group">
                                                    <input ref="newPassword" type="password" className="form-control" placeholder="Mật Khẩu Mới" />
                                                </div>
                                                <div className="form-group">
                                                    <input ref="confirmPassword" type="password" className="form-control" placeholder="Xác Nhận Lại Mật Khẩu Mới" />
                                                </div>
                                            </form>
                                            <br />
                                            <button type="button" onClick={this.onChangePasswordButton.bind(this)} className="btn btn-warning">Hủy</button>
                                            <button type="button" onClick={this.onChangeUpdatePasswordButton.bind(this)} className="btn btn-primary">Lưu</button>
                                        </div>) :
                                        (<button type="button" onClick={this.onChangePasswordButton.bind(this)} className="btn btn-primary">Đổi Mật Khẩu</button>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}