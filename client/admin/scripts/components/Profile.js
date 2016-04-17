import React, {Component} from 'react'
import checkfileimage from '../utils/checkfileimage';
import apis from '../apis/main';
import _ from 'lodash';

export default class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            changePassword: false
        }
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
            fr.onload = function receivedText() {
                // fr.result is base-64
                // console.log(fr.result);
                apis.updateEmployerPhoto(fr.result, function(err, res) {
                    if (err) {

                    } else {
                        var user = _.cloneDeep(self.props.user);
                        user.image = fr.result;
                        $(inputPhoto).val("");
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
        var user = this.props.user;
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
                                    <img src={user.image} alt="Ảnh Đại Diện" style={{"maxWidth": "100%","width": "250px", "height": "250px", "top": "-100px"}}/>
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
                                                                    <input type="text" className="form-control" placeholder="Tên Đầy Đủ" value={user.fullname} />
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
                                                                    <input type="email" className="form-control" placeholder="Email" value={user.email} />
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
                                                                    <input type="text" className="form-control" placeholder="Số Điện Thoại" value={user.phone} />
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
                                                                    <input type="text" className="form-control" placeholder="Địa Chỉ" value={user.address} />
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
                                                        <button type="button" className="btn btn-primary">Lưu</button>
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
                                                    <input type="password" className="form-control" placeholder="Mật Khẩu" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control" placeholder="Xác Nhận Lại Mật Khẩu" />
                                                </div>
                                            </form>
                                            <br />
                                            <button type="button" onClick={this.onChangePasswordButton.bind(this)} className="btn btn-warning">Hủy</button>
                                            <button type="button" className="btn btn-primary">Lưu</button>
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