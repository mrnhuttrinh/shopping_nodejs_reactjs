import React, {Component} from 'react'
import _ from 'lodash'
import localItem from '../utils/localItem';
import { connect } from 'react-redux'
import Group from '../components/detailMains/Group';
import MasterPage from './MasterPage'
import actions from '../actions/main'
import Widget from '../components/Widget'
import apis from '../apis/main';

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        var self = this;

        if (_.isNull(self.props.menus) 
                || _.isEmpty(self.props.menus) ) {
            apis.getMenu(function(err, res) {
                if (err) {
                } else {
                    if (res.status === 200) {
                        self.props.getMenu(res.body.data);
                    }
                }
            })
        }
    }

    render() {
        return (
            <MasterPage 
                {...this.props}
                pathname={this.props.location.pathname}
                title={"Dashboard"}>
                <div id="content">
                    <Widget {...this.props} />
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