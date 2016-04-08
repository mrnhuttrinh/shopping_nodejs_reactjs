import React, {Component} from 'react'
export default class Header extends Component{
    render() {
        return (
            <header id="header" style={{"position": "fixed", "width": "100%"}}>
                <div id="logo-group">
                    <span id="logo"> <img src="img/logo.png" alt="SmartAdmin" /> </span>
                </div>
                <div className="pull-right">
                    <div id="hide-menu" className="btn-header pull-right">
                        <span> <a href="javascript:void(0);" data-action="toggleMenu" title="Collapse Menu"><i className="fa fa-reorder"></i></a> </span>
                    </div>
                </div>
            </header>
        );
    }
}