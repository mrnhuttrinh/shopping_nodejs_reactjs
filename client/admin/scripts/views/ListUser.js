import React, {Component} from 'react'
import {connect} from 'react-redux';
import _ from 'lodash';
import MasterPage from './MasterPage'
import actions from '../actions/main'
import apis from '../apis/main';
import Table from '../components/Table';

class ListUser extends Component{
    editClick(user, event) {
        event.preventDefault();
    }
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
    render() {
        var self = this;
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
            indexNo++;
            var level = user.level === 0 ? "Admin" : "User";
            return [
                indexNo,
                user.username,
                level,
                user.phone,
                user.email,
                (<a onClick={self.editClick.bind(self, user)} className="btn btn-primary btn-xs">Edit</a>)
            ]
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
                </div>
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