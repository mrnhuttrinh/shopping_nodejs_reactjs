import React, {Component} from 'react'
import MasterPage from './MasterPage'
import { connect } from 'react-redux'
import actions from '../actions/main'

class About extends Component{
    render() {
        return (
            <MasterPage 
                pathname={this.props.location.pathname}
                {...this.props}
                title={"About"}>
                <div id="content">
                    <h2>About</h2>
                    {this.props.children || "Welcome to your About"}
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
)(About)