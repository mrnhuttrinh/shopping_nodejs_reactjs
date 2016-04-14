import React, {Component} from 'react'
import _ from 'lodash'
import localItem from '../utils/localItem';
import { connect } from 'react-redux'
import Group from '../components/detailMains/Group';
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import MasterPage from './MasterPage'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if(_.isEmpty(localItem.getItem("token"))) {
            window.location = "/admin/#/login";
        }
    }

    render() {
        return (
            <MasterPage pathname={this.props.location.pathname}>
                <div id="ribbon">
                    <span className="ribbon-button-alignment"> 
                        <span id="refresh" className="btn btn-ribbon" data-action="resetWidgets" data-title="refresh"  rel="tooltip" data-placement="bottom" data-original-title="<i className='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings." data-html="true">
                            <i className="fa fa-refresh"></i>
                        </span> 
                    </span>
                    <ol className="breadcrumb">
                        <li>Home</li><li>Dashboard</li>
                    </ol>
                </div>
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
    mapStateToProps
)(Dashboard)