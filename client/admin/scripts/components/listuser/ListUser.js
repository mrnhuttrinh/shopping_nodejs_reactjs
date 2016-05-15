import React, {Component} from 'react';
import _ from "lodash";
import Table from '../Table';
import apis from '../../apis/main';
import ResetPassword from './ResetPassword';
import Role from './Role';
import {Link} from 'react-router';
import DivLoading from '../DivLoading';

export default class ListUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userChangePassword: {},
            loadingData: true
        }
    }
    getData(data) {
        var self = this;
        apis.getAllUser(data, function(err, res) {
            if (err) {
                toastr.error("Tải Không Thành Công!");
            } else {
                self.props.getAllUser(res.body.data, "list");
            }
            self.setState({
                loadingData: !self.state.loadingData
            });
        });

        apis.getTotalUsers(data, function(err, result) {
            if (err) {
                toastr.error("Tải Không Thành Công!")
            } else {
                self.props.getAllUser(result.body.data.total, "total");
            }
        });
    }
    componentWillReceiveProps (nextProps) {
        var self = this;
        var page = nextProps.params.page;
        var data = {};
        if (page === undefined || Number.isInteger(parseInt(page))) {
            var oldPage = self.props.params.page;
            if (page !== oldPage) {
                self.setState({
                    loadingData: !self.state.loadingData
                });
                data.page = nextProps.params.page || 1;
                self.getData(data);
            }
        } else {
            var oldPage = self.props.params.search_page || 1;
            var nextPage = nextProps.params.search_page || 1;

            var oldSearch = self.props.params.search;
            var nextSearch = nextProps.params.search;
            if (oldPage !== nextPage ||
                oldSearch !== nextSearch) {
                self.setState({
                    loadingData: !self.state.loadingData
                });
                data.page = nextPage;
                data.search = nextSearch;
                self.getData(data);
            }
        }
    }
    componentDidMount() {
        var self = this;
        var page = this.props.params.page;
        var data = {};
        if (page === undefined || Number.isInteger(parseInt(page))) {
            data.page = page || 1;
        } else if (page === "search"){
            data.search = this.props.params.search;
            data.page = this.props.params.search_page || 1;
        }
        self.getData(data);
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
        });
    }
    render() {
        var self = this;
        var head= [
            {
                name: "number",
                text: "No."
            }, {
                name: "username_a",
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
            user.level_text = (<Role {...this.props} user={user} />);
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
                        <i data-swchon-text="ON" data-swchoff-text="OFF"></i>
                    </label>
                </form>
            );
            user.username_a = (<Link to={"/viewuser/" + user.id}>{user.username}</Link>);
            rows.push(user);
        });
        if (this.state.loadingData) {
            return (
                <DivLoading />
            );
        } else {
            return (
                <div>
                    <Table head={head} rows={rows}/>
                    <ResetPassword user={this.state.userChangePassword}/>
                </div>
            );
        }
    }
}