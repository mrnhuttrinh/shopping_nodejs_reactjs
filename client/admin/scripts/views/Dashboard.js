import React, {Component} from 'react'
import _ from 'lodash'
import localItem from '../utils/localItem';
import { connect } from 'react-redux'
import Group from '../components/detailMains/Group';
import MasterPage from './MasterPage'
import actions from '../actions/main'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <MasterPage 
                {...this.props}
                pathname={this.props.location.pathname}
                title={"Dashboard"}>
                <div id="content">
                    <Group data_group={this.props.data_group} />
                </div>
            </MasterPage>
        );
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
)(Dashboard)