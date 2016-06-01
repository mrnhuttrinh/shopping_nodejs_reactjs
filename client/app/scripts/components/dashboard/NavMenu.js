import React, {Component} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

class Item extends Component {
    constructor(props) {
        super(props);
        var menu = this.props.menu;
        var textShow = (menu.name.slice(0, 2)).toUpperCase() + ".";
        this.state = {
            textShow: textShow
        };
    }
    _onMouseOver(event) {
        event.preventDefault();
        this.setState({
            textShow: this.props.menu.name
        });
    }
    _onMouseOut(event) {
        event.preventDefault();
        var menu = this.props.menu;
        var textShow = (menu.name.slice(0, 2)).toUpperCase() + ".";
        this.setState({
            textShow: textShow
        });
    }
    render() {
        var menu = this.props.menu;

        return (
            <li 
                onMouseOver={this._onMouseOver.bind(this)}
                onMouseOut={this._onMouseOut.bind(this)}>
                <Link to={"/category/" + menu.link}>
                    <span aria-hidden="true">{this.state.textShow}</span>
                </Link>
            </li>
        );
    }
}

export default class NavMenu extends Component {
    render() {
        var self = this;
        var props = this.props;
        var menu = props.menu;
        var menus = props.menus;
        var listContent =  _.map(menus, (_menu) => {
            if (_menu.parent === menu.id) {
                return (
                    <Item key={"child_menu_" + _menu.id} menu={_menu}/>
                );
            }
        });
        return (
            <nav className="pull-right">
                <ul className="pagination" style={{margin: "0px"}}>
                    {listContent}
                </ul>
            </nav>
        );
    }
}