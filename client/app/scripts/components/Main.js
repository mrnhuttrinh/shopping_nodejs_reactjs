import React, {Component} from 'react'
import Header from './headers'
import Menu from './menus'
import ScrollTop from './ScrollTop'
import Contents from './contents'
import Footer from './footers'
import MainMenu from './MainMenu'
import Chat from './Chat'

import { connect, bindActionCreators } from 'react-redux'
import {getMenu} from '../actions/main'

export default class Main extends Component {
    componentDidMount() {
        this.props.getMenu();
    }
    render() {
        return (
            <div className="index">
                <MainMenu />
                <Header menus={this.props.menus}/>
                <Menu menus={this.props.menus}/>
                <Contents />
                <ScrollTop />
                <Footer />
                <Chat />
            </div>
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