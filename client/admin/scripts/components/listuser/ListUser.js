import React, {Component} from 'react';
import _ from "lodash";
import Table from '../Table';
import apis from '../../apis/main';
import ResetPassword from './ResetPassword'

export default class ListUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userChangePassword: {}
        }
    }
    componentDidMount() {
        var self = this;
        var page = this.props.params.page || 1;
        if (_.isEmpty(this.props.users.listUsers)) {
            apis.getAllUser(page, function(err, res) {
                if (err) {
                } else {
                    if (res.status === 200) {
                        self.props.getAllUser(res.body.data, "list");
                    } else {
                    }
                }
            });
        }
    }
    onChangeStatus(_user, event) {
        event.preventDefault();
        var self = this;
        var inputElement = event.currentTarget;
        //event.currentTarget.checked = !event.currentTarget.checked;
        apis.changeStatusUser({
            id: _user.id,
            status: !_user.status
        }, function(err, res) {
            if (err) {
                toastr.error("Đổi Trạng Thái Không Thành Công!")
            } else {
                var userChangeStatus = _.find(self.props.users.listUsers, function(user) {
                    return user.id === _user.id;
                })
                inputElement.checked = !inputElement.checked;
                userChangeStatus.status = !userChangeStatus.status;
                self.props.getAllUser(self.props.users.listUsers, "list")
                toastr.success("Đổi Trạng Thái Thành Công!")
            }
        })
    }
    resetPasswordClick(user, event) {
        event.preventDefault();
        this.setState({
            userChangePassword: user
        })
    }
    render() {
        var self = this;
        var head= [
            {
                name: "number",
                text: "No."
            }, {
                name: "username",
                text: "Username"
            }, {
                name: "level_text",
                text: "Level"
            }, {
                name: "phone",
                text: "Phone"
            }, {
                name: "email",
                text: "Email"
            }, {
                name: "edit",
                text: ""
            }, {
                name: "status_button",
                text: "Trạng Thái"
            }
        ];
        var indexNo = 0;
        var rows = [];
        _.forEach(this.props.users.listUsers, (user) => {
            user.level_text = user.level === 2 ? "Quản Lý" : "Nhân Viên";
            user.number = ++indexNo;
            user.edit = (
                user.status ? (
                    <button onClick={self.resetPasswordClick.bind(self, user)} className="btn btn-primary btn-xs" data-target="#resetPasswordModal" data-toggle="modal" type="button">
                        Reset Password
                    </button>
                ) : (
                    <button className="btn btn-danger btn-xs" type="button">
                        Không Sử Dụng
                    </button>
                )
            )
            user.status_button = (
                <form className="smart-form">
                    <label className="toggle">
                        <input ref="inputStatus" onChange={self.onChangeStatus.bind(self, user)} type="checkbox" name="checkbox-toggle" defaultChecked={user.status ? "checked" : "" } />
                        <i data-swchon-text="ON" data-swchoff-text="OFF"></i>{user.status ? "Sử Dụng" : "Không Sử Dụng"}
                    </label>
                </form>
            )
            rows.push(user)
        });
        return (
            <div>
                <Table head={head} rows={rows}/>
                <ResetPassword user={this.state.userChangePassword}/>
            </div>
        )
    }
}