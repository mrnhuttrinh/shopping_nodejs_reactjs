import React, {Component} from 'react'
import {Link} from 'react-router'

export default class LeftMenu extends Component{
    render() {
        var pathName = this.props.pathName;
        return (
            <aside id="left-panel" style={{"position": "fixed"}}>
                <div className="login-info">
                    <span>
                        <a href="javascript:void(0);" id="show-shortcut" data-action="toggleShortcut">
                            <img src="img/avatars/sunny.png" alt="me" className="online" /> 
                            <span>
                                john.doe 
                            </span>
                            <i className="fa fa-angle-down"></i>
                        </a> 
                    </span>
                </div>
                <nav>
                    <ul>
                        <li className={pathName == "/" ? "active" : ""}>
                            <Link to="/"><i className="fa fa-lg fa-fw fa-home"></i> <span className="menu-item-parent">Dashboard</span></Link>
                        </li>
                        <li className={pathName == "/products" ? "active" : ""}>
                            <Link to="/products"><i className="fa fa-lg fa-fw fa-inbox"></i> <span className="menu-item-parent">Products</span><span className="badge pull-right inbox-badge">14</span></Link>
                        </li>
                        <li className={pathName == "/inbox" ? "active" : ""}>
                            <Link to="/inbox"><i className="fa fa-lg fa-fw fa-inbox"></i> <span className="menu-item-parent">Inbox</span><span className="badge pull-right inbox-badge">14</span></Link>
                        </li>
                        <li className={pathName == "/about" ? "active" : ""}>
                            <Link to="/about"><i className="fa fa-lg fa-fw fa-desktop"></i> <span className="menu-item-parent">About</span></Link>
                        </li>
                    </ul>
                </nav>
                <span className="minifyme" data-action="minifyMenu"> 
                    <i className="fa fa-arrow-circle-left hit"></i> 
                </span>
            </aside>
        );
    }
}

