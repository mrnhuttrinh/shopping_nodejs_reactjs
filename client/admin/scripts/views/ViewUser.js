import React, {Component} from 'react'
import {connect} from 'react-redux';
import MasterPage from './MasterPage'
import actions from '../actions/main'
import ViewUserContent from '../components/viewuser';

class ViewUser extends Component{
    render() {
        return (
            <MasterPage 
                pathname={this.props.location.pathname}
                {...this.props}
                title={"Nhân Viên"}>
                <div id="content">
                    <ViewUserContent {...this.props}/>
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
)(ViewUser)