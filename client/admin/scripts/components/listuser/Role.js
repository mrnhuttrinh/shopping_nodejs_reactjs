import React, {Component} from 'react'
import _ from 'lodash';
import apis from '../../apis/main';

export default class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editRole: false
        }
    }
    editRoleClick(event) {
        event.preventDefault();
        this.setState({
            editRole: !this.state.editRole
        });
    }
    updateRole(event) {
        var self = this;
        event.preventDefault();
        var data = {
            id: self.props.user.id,
            level: self.refs["employerRole"].value
        };
        apis.updateRoleEmployer(data, function(err, res) {
            if (err) {
                toastr.error("Cập Nhật Không Thành Công!");
            } else {
                toastr.success("Cập Nhật Thành Công!");
                var userUpdate = _.find(self.props.users.listUsers, (_user) => {
                    return _user.id === self.props.user.id;
                });
                userUpdate.level = +data.level;
                self.setState({
                    editRole: !self.state.editRole
                });
                self.props.getAllUser(self.props.users.listUsers, "list");
            }
        });
    }
    render() {
        var user = this.props.user;
        if (this.state.editRole) {
            return (
                <div>
                    <select defaultValue={user.level} className="form-control" ref="employerRole" id="employerRole">
                        <option value="2">Quản Lý</option>
                        <option value="3">Nhân Viên</option>
                    </select>
                    <button onClick={this.editRoleClick.bind(this)} type="button" className="btn btn-warning btn-xs pull-right">
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                    <button onClick={this.updateRole.bind(this)} type="button" className="btn btn-primary btn-xs pull-right">
                        <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                    </button>
                </div>
            );
        } else {
            var level_text = user.level === 2 ? "Quản Lý" : "Nhân Viên";
            return (
                <div>
                    {level_text}
                    <button onClick={this.editRoleClick.bind(this)} type="button" className="btn btn-default btn-xs pull-right">
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </button>
                </div>
            );
        }
    }
}
