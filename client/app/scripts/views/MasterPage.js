import React, {Component}   from 'react'
import { connect }          from 'react-redux'
import {getMenu}            from '../actions/main'

import Header           from '../components/headers'
import Menu             from '../components/menus'
import ScrollTop        from '../components/ScrollTop'
import Footer           from '../components/footers'
import MainMenu         from '../components/MainMenu'
import Chat             from '../components/Chat'

class MasterPage extends Component{
    componentDidMount() {
        this.props.getMenu();
    }
    render() {
        return (
            <div className="index">
                <MainMenu />
                <Header menus={this.props.menus}/>
                <Menu menus={this.props.menus}/>
                <div>
                    {this.props.children}
                </div>
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
)(MasterPage)