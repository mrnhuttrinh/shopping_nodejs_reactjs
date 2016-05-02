import React, {Component} from 'react'
import _ from 'lodash'
import localItem from '../utils/localItem';
import { connect } from 'react-redux'
import Group from '../components/detailMains/Group';
import MasterPage from './MasterPage'
import actions from '../actions/main'
import Content from '../components/Dashboard'
import apis from '../apis/main';

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        var category = this.props.params.category || "home";
        var page = this.props.params.page || 1;
        return (
            <MasterPage 
                {...this.props}
                pathname={this.props.location.pathname}
                title={"Dashboard"}>
                <div id="content">
                    <Content {...this.props} category={category} page={page}/>
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