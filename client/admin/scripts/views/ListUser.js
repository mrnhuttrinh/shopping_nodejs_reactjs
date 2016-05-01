import React, {Component} from 'react'
import {connect} from 'react-redux';
import MasterPage from './MasterPage'
import actions from '../actions/main'
import ListUserContent from '../components/listuser';

class ListUser extends Component{
    render() {
        return (
            <MasterPage 
                pathname={this.props.location.pathname}
                {...this.props}
                title={"Nhân Viên"}>
                <div id="content">
                    <ListUserContent {...this.props}/>
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