import React, {Component} from 'react'
import { connect } from 'react-redux'
import MasterPage from './MasterPage'
import actions from '../actions/main'
import NewsContent from '../components/news'

class News extends Component{
    render() {
        return (
            <MasterPage 
                {...this.props}
                pathname={this.props.location.pathname}
                title={"Dashboard"}>
                <div id="content">
                    <NewsContent {...this.props} />
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
)(News)