import React, {Component} from 'react'
import MasterPage from './MasterPage'
import Profile from '../components/Profile'
import { connect } from 'react-redux'
import actions from '../actions/main'

class MyProfile extends Component{
    render() {
        return (
            <MasterPage 
                pathname={this.props.location.pathname}
                {...this.props}
                title={"My Profile"}>
                <div id="content">
                    <Profile />
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
)(MyProfile)