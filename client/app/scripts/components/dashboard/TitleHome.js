import React, {Component} from 'react';
import NavMenu from './NavMenu';
import {Link} from 'react-router';

export default  class TitleHome extends Component {
    render() {
        var menu = this.props.menu;
        return (
            <div className="title_home">
                <p className="bg_ic ic_text">
                    T{this.props.index}
                </p>
                <Link className="title_home_text" to={"/category/" + menu.link}>
                    {menu.name}
                </Link>
                <NavMenu menu={menu} menus={this.props.menus}/>
                <div className="clearfix"></div>
            </div>
        );
    }
}