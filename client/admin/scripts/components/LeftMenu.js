import React, {Component} from 'react'
import {Link} from 'react-router'

export default class LeftMenu extends Component{
    render() {
        var pathName = this.props.pathName;
        var user = this.props.user || {};
        return (
            <aside id="left-panel">
                <div className="login-info">
                    <Link to="/myprofile">
                        <img src={user.image} alt="me" className="online" /> 
                        <span>
                            {user.fullname || user.username}
                        </span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li className={pathName == "/" ? "active" : ""}>
                            <Link to="/"><i className="fa fa-lg fa-fw fa-home"></i> <span className="menu-item-parent">Dashboard</span></Link>
                        </li>
                        {
                            this.props.user.level === 1 || this.props.user.level === 2 ? (
                                <li className={pathName == "/listuser" ? "active" : ""}>
                                    <Link to="/listuser"><i className="fa fa-lg fa-fw fa-home"></i> <span className="menu-item-parent">Nhân Viên</span></Link>
                                </li>
                            ) : ("")
                        }
                        <li className={pathName == "/myprofile" ? "active" : ""}>
                            <Link to="/myprofile"><i className="fa fa-lg fa-fw fa-desktop"></i> <span className="menu-item-parent">My Profile</span></Link>
                        </li>
                        <li className={pathName == "/menu" ? "active" : ""}>
                            <Link to="/menu"><i className="fa fa-lg fa-fw fa-desktop"></i> <span className="menu-item-parent">Quản Lý Menu</span></Link>
                        </li>
                        <li className={pathName == "/news" ? "active" : ""}>
                            <Link to="/news"><i className="fa fa-lg fa-fw fa-inbox"></i> <span className="menu-item-parent">Tin Tức</span><span className="badge pull-right inbox-badge">14</span></Link>
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

