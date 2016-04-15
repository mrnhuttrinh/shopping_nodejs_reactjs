import React, {Component} from 'react'
import MasterPage from './MasterPage'
import { connect } from 'react-redux'
import actions from '../actions/main'

class Inbox extends Component{
    render() {
        return (
            <MasterPage 
                pathname={this.props.location.pathname}
                {...this.props}
                title={"Inbox"}>
                <div id="content">
                    <h2>Inbox</h2>
                    {this.props.children || "Welcome to your Inbox"}
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
)(Inbox)