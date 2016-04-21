import React, {Component}   from 'react'
import { connect }          from 'react-redux'
import {getMenu}            from '../actions/main'

import Header           from '../components/headers'
import Menu             from '../components/menus'
import ScrollTop        from '../components/ScrollTop'
import Footer           from '../components/footers'
import MainMenu         from '../components/MainMenu'
import Chat             from '../components/Chat'

import apis from '../apis/main';
import _ from 'lodash'
import localItem from '../utils/localItem';

class MasterPage extends Component{
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