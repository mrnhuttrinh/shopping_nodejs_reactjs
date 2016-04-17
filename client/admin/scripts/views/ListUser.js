import React, {Component} from 'react'
import {connect} from 'react-redux';
import _ from 'lodash';
import MasterPage from './MasterPage'
import actions from '../actions/main'
import apis from '../apis/main';
import Table from '../components/Table';
import Modal from '../components/Modal';

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

    modalExcuteAdd(event) {
        event.preventDefault();
    }
    render() {
        var self = this;
        var modalName = "myModal";
        var modalTitle = "Chỉnh Sửa Nhân Viên";
        var modalContent = "";
        var modalExcute = this.modalExcute;

        var modalNameAdd = "addNewEmployer";
        var modalTitleAdd = "Thêm Mới Nhân Viên";
        var modalContentAdd = "";
        var modalExcuteAdd = this.modalExcuteAdd;

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
                (
                    <button className="btn btn-primary btn-xs" data-target={"#" + modalName} data-toggle="modal" type="button">
                        Edit
                    </button>
                )
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
                    <button type="button" className="btn btn-success" data-target={"#" + modalNameAdd} data-toggle="modal">Thêm Mới</button>
                </div>
                <Modal modalName={modalName}
                    modalExcute={modalExcute}
                    modalContent={modalContent}
                    modalTitle={modalTitle}/>
                <Modal modalName={modalNameAdd}
                    modalExcute={modalExcuteAdd}
                    modalContent={modalContentAdd}
                    modalTitle={modalTitleAdd}/>
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