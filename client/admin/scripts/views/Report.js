import React, {Component} from 'react'
import { connect } from 'react-redux'
import MasterPage from './MasterPage'
import actions from '../actions/main'
import Content from '../components/report'

class Report extends Component{
    render() {
        return (
            <MasterPage 
                {...this.props}
                pathname={this.props.location.pathname}
                title={"Thống Kê"}>
                <div id="content">
                    <Content {...this.props} />
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
)(Report)