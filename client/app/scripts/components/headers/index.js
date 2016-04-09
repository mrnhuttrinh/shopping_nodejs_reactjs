import React, {Component} from 'react'
import HeaderMain from './HeaderMain'
import HeaderMenu from './HeaderMenu'


export default class Header extends Component{
    render() {
        return (
            <header id="mainHeader" className="index_header">
                <HeaderMenu />
                <HeaderMain />
            </header>
        );
    }
}
