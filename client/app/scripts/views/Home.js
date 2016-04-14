import React, {Component}   from 'react'
import { connect }          from 'react-redux'
import {getMenu}            from '../actions/main'
import MasterPage           from './MasterPage'
import Contents             from '../components/contents'

export default class Main extends Component {
    componentDidMount() {
        this.props.getMenu();
    }
    render() {
        return (
            <MasterPage menus={this.props.menus}>
                <Contents />
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
    {
        getMenu
    }
)(Main)