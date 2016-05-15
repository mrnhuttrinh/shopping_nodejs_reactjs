import React, {Component} from 'react'
import apis from '../../apis/main';
import _ from 'lodash';
import moment from 'moment';

export default class ViewUserContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }
    componentDidMount() {
        var self = this;
        apis.getUserById(this.props.params.id, function(err, res) {
            if (err) {
                toastr.error("Tải Không Thành Công!");
            } else {
                self.setState({
                    user: res.body.data
                });
            }
        });
    }
    render() {
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
                                    <img src={user.image} alt="Ảnh Đại Diện" style={{"maxWidth": "100%","width": "250px", "height": "250px", "top": "-100px"}}/>
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
                                                {user.fullname}
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
                                                {user.email}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Số Điện Thoại
                                            </td>
                                            <td>
                                                {user.phone}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Địa Chỉ
                                            </td>
                                            <td>
                                                {user.address}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Ngày Sinh
                                            </td>
                                            <td>
                                                {
                                                    _.isEmpty(user.birthdate) ? "" :
                                                    moment(user.birthdate).format("DD/MM/YYYY")
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Ngày Làm Việc
                                            </td>
                                            <td>
                                                {
                                                    _.isEmpty(user.hiredate) ? "" :
                                                        moment(user.hiredate).format("DD/MM/YYYY")
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Cấp Bật
                                            </td>
                                            <td>
                                                {
                                                    user.level === 1 ? "Admin" : (user.level === 2 ? "Quản Lý" : "Nhân Viên") 
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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